import { useState, useContext, useEffect } from "react";
import { EmpresaContext } from "@/features/configuracion/empresas/context/EmpresaContext";
import { NuevaCartaPorteContext } from "@/features/carta_porte/nueva/context/NuevaCartaPorteContext";
import { TercerosContext } from "@/features/registro/terceros/context/TercerosContext";
import { IcotermsContext } from "@/features/registro/iconterms/context/IcotermsContext";
import { NuevaCartaPorteForm } from "@/features/carta_porte/nueva/interfaces/nueva_carta_porte.interface";
import { MunicipiosContext } from "@/features/registro/municipios/context/MunicipiosContext";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { ClaseContext } from "@/features/registro/clase/context/ClaseContext";
import { useFieldArray } from "react-hook-form";
import Cookies from "universal-cookie";
import { DepartamentosContext } from "@/features/registro/departamentos/context/DepartamentosContext";

const cookies = new Cookies();

const useNuevaCartaPorte = () => {
  const {
    createCartaPorte,
    loading,
    methodsNuevaCartaPorte,
    currentCartaporte,
    updateCartaporte,
    copyCartaporte,
    copyCp,
  } = useContext(NuevaCartaPorteContext);
  const { terceros } = useContext(TercerosContext);
  const { icoterms } = useContext(IcotermsContext);
  const { paises } = useContext(PaisContext);
  const { municipios } = useContext(MunicipiosContext);
  const { departamentos } = useContext(DepartamentosContext);
  const { clase } = useContext(ClaseContext);
  const { empresaFind } = useContext(EmpresaContext);
  const empresa = cookies.get("empresa");
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (empresaFind.imagen_logo) {
      const dataUrl = `data:image/png;base64, ${empresaFind.imagen_logo}`;
      setImageDataUrl(dataUrl);
    }
  }, [empresaFind.imagen_logo]);

  const {
    fields: detalleCartaPorteFields,
    append: detalleCartaPorteAppend,
    remove: detalleCartaPorteRemove,
  } = useFieldArray({
    name: "detalleCartaPorte",
    control: methodsNuevaCartaPorte.control,
  });

  const newFields = [...detalleCartaPorteFields.slice(0, -1)];

  const fields = currentCartaporte.cartaporte?.id
    ? newFields
    : detalleCartaPorteFields;

  const [selectedActos, setSelectedActos] = useState(
    Array(detalleCartaPorteFields.length).fill(null)
  );

  const [selectedOption, setSelectedOption] = useState("1");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const formatNumber = (value: string) => {
    const cleanValue = value.replace(/[^0-9,]/g, "");
    const formatted = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formatted;
  };

  const sumFormattedNumbers = (...values: string[]) => {
    const sum = values.reduce((accumulator, currentValue) => {
      const cleanValue = currentValue.replace(/[.]/g, "").replace(",", ".");
      const numericValue = parseFloat(cleanValue);
      return accumulator + numericValue;
    }, 0);

    return sum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const totalRemitente = sumFormattedNumbers(
    methodsNuevaCartaPorte.watch("valorfleteremitente") || "0,00",
    methodsNuevaCartaPorte.watch("valorseguroremitente") || "0,00",
    methodsNuevaCartaPorte.watch("valorotrogastosremitente") || "0,00"
  );

  const totalDestinatario = sumFormattedNumbers(
    methodsNuevaCartaPorte.watch("valorfletedestinatario") || "0,00",
    methodsNuevaCartaPorte.watch("valorsegurodestinatario") || "0,00",
    methodsNuevaCartaPorte.watch("valorotrosgastosdestinatario") || "0,00"
  );

  const onSubmit = (data: NuevaCartaPorteForm) => {
    if (activeStep === 1) {
      const formatData = {
        cartaporte: {
          estadoRD: Number(selectedOption),
          fecha_recibido: data.fecharecibido,
          fecha_embarque: data.fechaembarque,
          fecha_de_entrega: data.fechadeentrega,
          condiciones_transporte_pago:
            data.condiciones_transporte_pago?.toUpperCase(),
          pesoneto: data.pesoneto,
          pesobruto: data.pesobruto,
          volumen: data.volumen?.toUpperCase() || "XXXXXX",
          otras_unidades: data.otras_unidades || "XXXXXX",
          preciomercancia: data.preciomercancia,
          moneda_mercancia: empresaFind.tipo_moneda,
          valorfleteremitente: data.valorfleteremitente || "0.0",
          valorseguroremitente: data.valorseguroremitente || "0.0",
          valorotrogastosremitente: data.valorotrogastosremitente || "0.0",
          valortotalremitente: totalRemitente,
          modendafleteremitente: empresaFind.tipo_moneda,
          monedaseguroremitente: empresaFind.tipo_moneda,
          monedaotrosgastosremitente: empresaFind.tipo_moneda,
          monedatotalremitete: empresaFind.tipo_moneda,
          valorfletedestinatario: data.valorfletedestinatario || "0.0",
          valorsegurodestinatario: data.valorsegurodestinatario || "0.0",
          valorotrosgastosdestinatario:
            data.valorotrosgastosdestinatario || "0.0",
          valortotaldestinatari: totalDestinatario,
          monedafletedestinatario: empresaFind.tipo_moneda,
          monedasegurodestinatario: empresaFind.tipo_moneda,
          monedaotrosgastosdestinatario: empresaFind.tipo_moneda,
          monedatotaldestinatario: empresaFind.tipo_moneda,
          documentosrecibidos: data.documentosrecibidos?.toUpperCase(),
          fecha_emision: data.fechaemision,
          instrucciones_transportista:
            data.instrucciones_transportista?.toUpperCase(),
          observacionestransportista:
            data.observacionestransportista?.toUpperCase(),
          remitente: data.remitente.value,
          destinatario: data.destinatario.value,
          consignatario: data.consignatario.value,
          notificara: data.notificara.value,
          agenciaAduana: data.agencia.value || 0,
          terminosincoterms: data.terminosincoterms.value,
          lugarembarque: data.lugarembarque.value,
          lugaremision: data.lugaremision.value,
          lugarentrega: data.lugarentrega.value,
          lugarrecibio: data.lugarrecibio.value,
          municipioIcoterm: data.municipioIcoterm.value,
        },
        detalleCartaporte: data.detalleCartaPorte?.map((item, index) => {
          return {
            marca: item.marca,
            cantidad: item.cantidad,
            descripcion: item.descripcion?.toUpperCase(),
            id_clase: selectedActos[index]?.value,
          };
        }),
        empresa: empresa,
      };
      if (currentCartaporte.cartaporte?.id && copyCp === false) {
        const recortedData = formatData.detalleCartaporte
          .slice(0, -1)
          .map((detalle: any, index: number) => ({
            ...detalle,
            id: currentCartaporte.detallecartaporte[index]?.id,
            id_clase: selectedActos[index]?.value,
          }));
        const newFormatData = {
          ...formatData,
          detalleCartaporte: recortedData,
        };
        updateCartaporte(
          currentCartaporte.cartaporte?.id,
          newFormatData as any
        );
      } else if (copyCp === true) {
        const recortedData = formatData.detalleCartaporte
          .slice(0, -1)
          .map((detalle: any, index: number) => ({
            ...detalle,
            id: currentCartaporte.detallecartaporte[index]?.id,
            id_clase: selectedActos[index]?.value,
          }));
        const newFormatData = {
          ...formatData,
          detalleCartaporte: recortedData,
        };
        createCartaPorte(newFormatData as any);
      } else {
        createCartaPorte(formatData as any);
      }
      setActiveStep(0);
    } else {
      handleNext();
    }
  };

  const findAgencia = (id: number) => {
    return terceros.find((item) => item.id === id);
  };

  const findIncoterm = (id: number) => {
    return icoterms.find((item) => item.id === id);
  };

  useEffect(() => {
    if (currentCartaporte.cartaporte?.id) {
      methodsNuevaCartaPorte.setValue("notificara", {
        value: currentCartaporte.cartaporte?.notificara.id,
        label: currentCartaporte.cartaporte?.notificara.razon_social,
      });
      const agenciaAduana = findAgencia(
        currentCartaporte.cartaporte?.agenteaduana
      );
      if (agenciaAduana) {
        methodsNuevaCartaPorte.setValue("agencia", {
          value: agenciaAduana.id,
          label: agenciaAduana.razon_social,
        });
      }
      methodsNuevaCartaPorte.setValue("pais_recibio", {
        value: currentCartaporte.cartaporte?.lugarrecibio.id_pais,
        label: currentCartaporte.cartaporte?.lugarrecibio.pais,
      });
      methodsNuevaCartaPorte.setValue("dpto_recibio", {
        value: currentCartaporte.cartaporte?.lugarrecibio.id_departamento,
        label: currentCartaporte.cartaporte?.lugarrecibio.departamento,
      });
      methodsNuevaCartaPorte.setValue("lugarrecibio", {
        value: currentCartaporte.cartaporte?.lugarrecibio.id,
        label: currentCartaporte.cartaporte?.lugarrecibio.nombre,
      });
      methodsNuevaCartaPorte.setValue(
        "fecharecibido",
        currentCartaporte.cartaporte?.fecha_recibido
      );
      methodsNuevaCartaPorte.setValue("remitente", {
        value: currentCartaporte.cartaporte?.remitente.id,
        label: currentCartaporte.cartaporte?.remitente.razon_social,
      });
      methodsNuevaCartaPorte.setValue("pais_embargue", {
        value: currentCartaporte.cartaporte?.lugarembarque.id_pais,
        label: currentCartaporte.cartaporte?.lugarembarque.pais,
      });
      methodsNuevaCartaPorte.setValue("dpto_embargue", {
        value: currentCartaporte.cartaporte?.lugarembarque.id_departamento,
        label: currentCartaporte.cartaporte?.lugarembarque.departamento,
      });
      methodsNuevaCartaPorte.setValue("lugarembarque", {
        value: currentCartaporte.cartaporte?.lugarembarque.id,
        label: currentCartaporte.cartaporte?.lugarembarque.nombre,
      });
      methodsNuevaCartaPorte.setValue(
        "fechaembarque",
        currentCartaporte.cartaporte?.fecha_embarque
      );
      methodsNuevaCartaPorte.setValue("destinatario", {
        value: currentCartaporte.cartaporte?.destinatario.id,
        label: currentCartaporte.cartaporte?.destinatario.razon_social,
      });
      methodsNuevaCartaPorte.setValue("pais_entrega", {
        value: currentCartaporte.cartaporte?.lugarentrega.id_pais,
        label: currentCartaporte.cartaporte?.lugarentrega.pais,
      });
      methodsNuevaCartaPorte.setValue("dpto_entrega", {
        value: currentCartaporte.cartaporte?.lugarentrega.id_departamento,
        label: currentCartaporte.cartaporte?.lugarentrega.departamento,
      });
      methodsNuevaCartaPorte.setValue("lugarentrega", {
        value: currentCartaporte.cartaporte?.lugarentrega.id,
        label: currentCartaporte.cartaporte?.lugarentrega.nombre,
      });
      methodsNuevaCartaPorte.setValue(
        "fechadeentrega",
        currentCartaporte.cartaporte?.fecha_de_entrega
      );
      methodsNuevaCartaPorte.setValue("consignatario", {
        value: currentCartaporte.cartaporte?.consignatario.id,
        label: currentCartaporte.cartaporte?.consignatario.razon_social,
      });
      methodsNuevaCartaPorte.setValue(
        "condiciones_transporte_pago",
        currentCartaporte.cartaporte?.condiciones_transporte_pago
      );
      methodsNuevaCartaPorte.setValue(
        "volumen",
        currentCartaporte.cartaporte?.volumen
      );
      methodsNuevaCartaPorte.setValue(
        "otras_unidades",
        currentCartaporte.cartaporte?.otras_unidades
      );
      const incoterm = findIncoterm(
        currentCartaporte.cartaporte?.terminosincoterms.id
      );
      if (incoterm) {
        methodsNuevaCartaPorte.setValue("terminosincoterms", {
          value: incoterm.id,
          label: incoterm.codigo,
        });
      }
      methodsNuevaCartaPorte.setValue(
        "preciomercancia",
        formatNumber(
          currentCartaporte.cartaporte?.precio_mercancia.replace(".", ",")
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valorfleteremitente",
        formatNumber(
          currentCartaporte.cartaporte?.valor_flete_remitente.replace(".", ",")
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valorfletedestinatario",
        formatNumber(
          currentCartaporte.cartaporte?.valorfletedestinatario.replace(".", ",")
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valorseguroremitente",
        formatNumber(
          currentCartaporte.cartaporte?.valor_seguro_remitente.replace(".", ",")
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valorsegurodestinatario",
        formatNumber(
          currentCartaporte.cartaporte?.valor_seguro_destinatario.replace(
            ".",
            ","
          )
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valorotrogastosremitente",
        formatNumber(
          currentCartaporte.cartaporte?.valor_otros_gastos_remitente.replace(
            ".",
            ","
          )
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valorotrosgastosdestinatario",
        formatNumber(
          currentCartaporte.cartaporte?.valor_otros_gastos_destinatario.replace(
            ".",
            ","
          )
        )
      );
      methodsNuevaCartaPorte.setValue(
        "valortotalremitente",
        currentCartaporte.cartaporte?.valor_total_remitente
      );
      methodsNuevaCartaPorte.setValue(
        "valortotaldestinatari",
        currentCartaporte.cartaporte?.valor_total_destinatario
      );
      methodsNuevaCartaPorte.setValue(
        "documentosrecibidos",
        currentCartaporte.cartaporte?.documentos_recibidos
      );
      methodsNuevaCartaPorte.setValue("pais_emision", {
        value: currentCartaporte.cartaporte?.lugaremision.id_pais,
        label: currentCartaporte.cartaporte?.lugaremision.pais,
      });
      methodsNuevaCartaPorte.setValue("dpto_emision", {
        value: currentCartaporte.cartaporte?.lugaremision.id_departamento,
        label: currentCartaporte.cartaporte?.lugaremision.departamento,
      });
      methodsNuevaCartaPorte.setValue("lugaremision", {
        value: currentCartaporte.cartaporte?.lugaremision.id,
        label: currentCartaporte.cartaporte?.lugaremision.nombre,
      });
      methodsNuevaCartaPorte.setValue(
        "fechaemision",
        currentCartaporte.cartaporte?.fecha_emision
      );
      methodsNuevaCartaPorte.setValue(
        "instrucciones_transportista",
        currentCartaporte.cartaporte?.instrucciones_transportista
      );
      methodsNuevaCartaPorte.setValue(
        "observacionestransportista",
        currentCartaporte.cartaporte?.observaciones_transportista
      );
      methodsNuevaCartaPorte.setValue(
        "pesoneto",
        formatNumber(currentCartaporte.cartaporte?.peso_neto.replace(".", ","))
      );
      methodsNuevaCartaPorte.setValue(
        "pesobruto",
        formatNumber(currentCartaporte.cartaporte?.peso_bruto.replace(".", ","))
      );
      methodsNuevaCartaPorte.setValue("pais_icoterm", {
        value: currentCartaporte.cartaporte?.municipioIcoterm.id_pais,
        label: currentCartaporte.cartaporte?.municipioIcoterm.name_pais,
      });
      methodsNuevaCartaPorte.setValue("dpto_icoterm", {
        value: currentCartaporte.cartaporte?.municipioIcoterm.id_departamento,
        label: currentCartaporte.cartaporte?.municipioIcoterm.name_departamento,
      });
      methodsNuevaCartaPorte.setValue("municipioIcoterm", {
        value: currentCartaporte.cartaporte?.municipioIcoterm.id,
        label: currentCartaporte.cartaporte?.municipioIcoterm.name,
      });
      currentCartaporte.detallecartaporte?.forEach((detalle, index) => {
        const matchingClase = clase.find(
          (c) => c.id === Number(detalle.id_clase)
        );
        detalleCartaPorteAppend({
          cantidad: methodsNuevaCartaPorte.setValue(
            `detalleCartaPorte.${index}.cantidad`,
            formatNumber(detalle.cantidad?.toString().replace(".", ","))
          ),
          marca: methodsNuevaCartaPorte.setValue(
            `detalleCartaPorte.${index}.marca`,
            detalle.marca
          ),
          descripcion: methodsNuevaCartaPorte.setValue(
            `detalleCartaPorte.${index}.descripcion`,
            detalle.descripcion
          ),
        });
        setSelectedActos((prevSelectedActos) => {
          const updatedSelectedActos = [...prevSelectedActos];
          const formatClases = {
            value: matchingClase?.id,
            label: matchingClase?.nombre,
          };
          updatedSelectedActos[index] = formatClases;
          return updatedSelectedActos;
        });
        setSelectedOption(currentCartaporte.cartaporte?.estadoRD.toString());
      });
    } else {
      methodsNuevaCartaPorte.setValue("notificara", "");
      methodsNuevaCartaPorte.setValue("pais_recibio", "");
      methodsNuevaCartaPorte.setValue("dpto_recibio", "");
      methodsNuevaCartaPorte.setValue("lugarrecibio", "");
      methodsNuevaCartaPorte.setValue("fecharecibido", "");
      methodsNuevaCartaPorte.setValue("remitente", "");
      methodsNuevaCartaPorte.setValue("pais_embargue", "");
      methodsNuevaCartaPorte.setValue("dpto_embargue", "");
      methodsNuevaCartaPorte.setValue("lugarembarque", "");
      methodsNuevaCartaPorte.setValue("fechaembarque", "");
      methodsNuevaCartaPorte.setValue("destinatario", "");
      methodsNuevaCartaPorte.setValue("pais_entrega", "");
      methodsNuevaCartaPorte.setValue("dpto_entrega", "");
      methodsNuevaCartaPorte.setValue("lugarentrega", "");
      methodsNuevaCartaPorte.setValue("fechadeentrega", "");
      methodsNuevaCartaPorte.setValue("consignatario", "");
      methodsNuevaCartaPorte.setValue("condiciones_transporte_pago", "");
      methodsNuevaCartaPorte.setValue("volumen", "");
      methodsNuevaCartaPorte.setValue("otras_unidades", "");
      methodsNuevaCartaPorte.setValue("terminosincoterms", "");
      methodsNuevaCartaPorte.setValue("preciomercancia", "");
      methodsNuevaCartaPorte.setValue("valorfleteremitente", "");
      methodsNuevaCartaPorte.setValue("valorfletedestinatario", "");
      methodsNuevaCartaPorte.setValue("valorseguroremitente", "");
      methodsNuevaCartaPorte.setValue("valorsegurodestinatario", "");
      methodsNuevaCartaPorte.setValue("valorotrogastosremitente", "");
      methodsNuevaCartaPorte.setValue("valorotrosgastosdestinatario", "");
      methodsNuevaCartaPorte.setValue("valortotalremitente", "");
      methodsNuevaCartaPorte.setValue("valortotaldestinatari", "");
      methodsNuevaCartaPorte.setValue("documentosrecibidos", "");
      methodsNuevaCartaPorte.setValue("pais_emision", "");
      methodsNuevaCartaPorte.setValue("dpto_emision", "");
      methodsNuevaCartaPorte.setValue("lugaremision", "");
      methodsNuevaCartaPorte.setValue("fechaemision", "");
      methodsNuevaCartaPorte.setValue("instrucciones_transportista", "");
      methodsNuevaCartaPorte.setValue("observacionestransportista", "");
      methodsNuevaCartaPorte.setValue("pesoneto", "");
      methodsNuevaCartaPorte.setValue("pesobruto", "");
      methodsNuevaCartaPorte.setValue("pais_icoterm", "");
      methodsNuevaCartaPorte.setValue("dpto_icoterm", "");
      methodsNuevaCartaPorte.setValue("municipioIcoterm", "");
      for (let i = detalleCartaPorteFields.length - 1; i >= 0; i--) {
        detalleCartaPorteRemove(i);
      }
    }
  }, [currentCartaporte]);

  return {
    activeStep,
    handleBack,
    onSubmit,
    loading,
    methodsNuevaCartaPorte,
    terceros,
    icoterms,
    paises,
    municipios,
    clase,
    detalleCartaPorteFields: fields,
    detalleCartaPorteAppend,
    detalleCartaPorteRemove,
    selectedActos,
    setSelectedActos,
    totalRemitente,
    totalDestinatario,
    imageDataUrl,
    empresaFind,
    selectedOption,
    handleOptionChange,
    currentCartaporte,
    formatNumber,
    copyCartaporte,
    departamentos,
  };
};

export default useNuevaCartaPorte;
