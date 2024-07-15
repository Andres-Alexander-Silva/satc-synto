import { useContext, useEffect } from "react";
import { TercerosContext } from "@/features/registro/terceros/context/TercerosContext";
import { TipoDocumentoContext } from "@/features/configuracion/tipo_documentos/context/TipoDocumentoContext";
import { MunicipiosContext } from "@/features/registro/municipios/context/MunicipiosContext";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { TercerosForm } from "@/features/registro/terceros/interface/terceros.interface";
import { convertStringToBoolean } from "@/utils/stringToBoolean";

const useModalTerceros = () => {
  const {
    loading,
    handleClose,
    createTerceros,
    updateTerceros,
    currentTerceros,
    methodsTerceros,
    findDocumentoTercero,
  } = useContext(TercerosContext);
  const { tipoDocumento } = useContext(TipoDocumentoContext);
  const { paises } = useContext(PaisContext);
  const { municipios } = useContext(MunicipiosContext);

  const filteredTipoDocumento = tipoDocumento.filter(
    (item) => item.id === 17 || item.id === 18
  );

  const calcular_rif = (data: string): number => {
    const base: Record<string, number> = { V: 4, E: 8, J: 12, G: 20 };
    const oper: number[] = [0, 3, 2, 7, 6, 5, 4, 3, 2];
    let val = 0;

    for (let i = 0; i < Math.min(data.length, 9); i++) {
      if (i === 0) {
        val += base[data[0]] || 0;
      } else {
        val += oper[i] * parseInt(data[i], 10);
      }
    }

    let digit = 11 - (val % 11);
    digit = digit < 10 ? digit : 0;

    return digit;
  };

  const calcularDv = (nit: string): number => {
    let vpri: number[];
    let x = 0;
    let y = 0;
    const z = nit.length;
    let dv1: number;

    const nit1 = nit;

    if (isNaN(parseInt(nit1, 10))) {
      return 0;
    } else {
      if (nit1.length > 6) {
        vpri = new Array(16);
        vpri[1] = 3;
        vpri[2] = 7;
        vpri[3] = 13;
        vpri[4] = 17;
        vpri[5] = 19;
        vpri[6] = 23;
        vpri[7] = 29;
        vpri[8] = 37;
        vpri[9] = 41;
        vpri[10] = 43;
        vpri[11] = 47;
        vpri[12] = 53;
        vpri[13] = 59;
        vpri[14] = 67;
        vpri[15] = 71;

        for (let i = 0; i < z; i++) {
          y = parseInt(nit1.charAt(i), 10);
          x += y * vpri[z - i];
        }
        y = x % 11;

        if (y > 1) {
          dv1 = 11 - y;
        } else {
          dv1 = y;
        }

        return dv1;
      }
    }
    return 0;
  };

  const calcularDigitoVerificacion = (numeroIdentificacion: string) => {
    if (methodsTerceros.watch("tipo_documento")?.value === 17) {
      const formatDigito = "J" + numeroIdentificacion;
      const digitoVerificacion = calcular_rif(formatDigito);
      methodsTerceros.setValue(
        "digito_verificacion",
        digitoVerificacion.toString()
      );
    } else if (methodsTerceros.watch("tipo_documento")?.value === 18) {
      const digitoVerificacion = calcularDv(numeroIdentificacion);
      methodsTerceros.setValue(
        "digito_verificacion",
        digitoVerificacion.toString()
      );
    }
  };

  const handleNumeroIdentificacionBlur = () => {
    const tipoDocumento = methodsTerceros.getValues("numero_identificacion");
    calcularDigitoVerificacion(tipoDocumento);
  };

  const onSubmit = (data: TercerosForm) => {
    if (data.tipo_documento.value === 17) {
      data.numero_identificacion = "J" + data.numero_identificacion;
    }
    const formatData = {
      ...data,
      consignatario: convertStringToBoolean(data.consignatario.value.toString()),
      remitente: convertStringToBoolean(data.remitente.value.toString()),
      destinatario: convertStringToBoolean(data.destinatario.value.toString()),
      notificara: convertStringToBoolean(data.notificara.value.toString()),
      agencia: convertStringToBoolean(data.agencia.value.toString()),
      municipio: data.municipio.value,
      tipo_documento: data.tipo_documento.value,
    };
    if (currentTerceros.id) {
      console.log("format data ->",formatData)
      updateTerceros(currentTerceros.id, formatData as any);
    } else {
      createTerceros(formatData as any);
    }
  };

  const findTipoDocumento = (id: number) => {
    return tipoDocumento.find((item) => item.id === id);
  };

  const findMunicipio = (id: number) => {
    return municipios.find((item) => item.id === id);
  };

  const findPais = (id: number) => {
    return paises.find((item) => item.id === id);
  };

  useEffect(() => {
    if (currentTerceros.id) {
      const documento = findTipoDocumento(currentTerceros.id_tipo_documento);
      if (documento) {
        methodsTerceros.setValue("tipo_documento", {
          value: documento.id,
          label: documento.descripcion,
        });
      }
      const numeroIdentificacionSinJ =
        currentTerceros.numero_identificacion.replace("J", "");
      methodsTerceros.setValue(
        "numero_identificacion",
        numeroIdentificacionSinJ
      );
      methodsTerceros.setValue(
        "digito_verificacion",
        currentTerceros.digito_verificacion
      );
      methodsTerceros.setValue("razon_social", currentTerceros.razon_social);
      methodsTerceros.setValue("direccion", currentTerceros.direccion);
      methodsTerceros.setValue("telefono", currentTerceros.telefono);
      const pais = findPais(currentTerceros.id_pais);
      if (pais) {
        methodsTerceros.setValue("pais", {
          value: pais.id,
          label: pais.nombre,
        });
      }
      const municipio = findMunicipio(currentTerceros.id_municipio);
      if (municipio) {
        methodsTerceros.setValue("municipio", {
          value: municipio.id,
          label: municipio.nombre,
        });
      }
      methodsTerceros.setValue("consignatario", {
        value: currentTerceros.consignatario ? true : false,
        label: currentTerceros.consignatario ? "Si" : "No",
      });
      methodsTerceros.setValue("remitente", {
        value: currentTerceros.remitente ? true : false,
        label: currentTerceros.remitente ? "Si" : "No",
      });
      methodsTerceros.setValue("destinatario", {
        value: currentTerceros.destinatario ? true : false,
        label: currentTerceros.destinatario ? "Si" : "No",
      });
      methodsTerceros.setValue("notificara", {
        value: currentTerceros.notificara ? true : false,
        label: currentTerceros.notificara ? "Si" : "No",
      });
      methodsTerceros.setValue("agencia", {
        value: currentTerceros.agencia ? true : false,
        label: currentTerceros.agencia ? "Si" : "No",
      });
    } else {
      methodsTerceros.setValue("tipo_documento", "");
      methodsTerceros.setValue("numero_identificacion", "");
      methodsTerceros.setValue("digito_verificacion", "");
      methodsTerceros.setValue("razon_social", "");
      methodsTerceros.setValue("direccion", "");
      methodsTerceros.setValue("telefono", "");
      methodsTerceros.setValue("municipio", "");
      methodsTerceros.setValue("consignatario", "");
      methodsTerceros.setValue("remitente", "");
      methodsTerceros.setValue("destinatario", "");
      methodsTerceros.setValue("notificara", "");
      methodsTerceros.setValue("agencia", "");
    }
  }, [currentTerceros]);

  return {
    loading,
    handleClose,
    onSubmit,
    methodsTerceros,
    currentTerceros,
    tipoDocumento: filteredTipoDocumento,
    municipios,
    handleNumeroIdentificacionBlur,
    calcular_rif,
    paises,
    findDocumentoTercero,
  };
};

export default useModalTerceros;
