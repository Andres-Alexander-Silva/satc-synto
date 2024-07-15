import { useContext, useEffect, useState } from "react";
import { EmpresaContext } from "@/features/configuracion/empresas/context/EmpresaContext";
import { NuevoManifiestoContext } from "@/features/manifiesto/nuevo/context/NuevoManifiestoContext";
import { NuevoManifiesto } from "@/features/manifiesto/nuevo/interface/nuevo_manifiesto.interface";
import { VehiculosContext } from "@/features/registro/vehiculos/context/VehiculosContext";
import { ConductoresContext } from "@/features/registro/conductores/context/ConductoresContext";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { TercerosContext } from "@/features/registro/terceros/context/TercerosContext";
import { MunicipiosContext } from "@/features/registro/municipios/context/MunicipiosContext";
import { PuntoSalidaContext } from "@/features/registro/punto_salida/context/PuntosSalidaContext";
import { DepartamentosContext } from "@/features/registro/departamentos/context/DepartamentosContext";

const useNuevoManifiesto = () => {
  const {
    methodsNuevoManifiesto,
    loading,
    createManifiesto,
    findCartaporte,
    currentCartaporte,
    setCurrentCartapore,
    handleClose,
    selectedDetails,
    setSelectedDetails,
    currentManifiesto,
    updateManifiesto,
    copyM,
    copyManifiesto,
    manifiestos,
  } = useContext(NuevoManifiestoContext);
  const { vehiculos } = useContext(VehiculosContext);
  const { conductores } = useContext(ConductoresContext);
  const { empresaFind } = useContext(EmpresaContext);
  const { paises } = useContext(PaisContext);
  const { terceros } = useContext(TercerosContext);
  const { municipios } = useContext(MunicipiosContext);
  const { departamentos } = useContext(DepartamentosContext);
  const { puntosSalida } = useContext(PuntoSalidaContext);
  const [activeStep, setActiveStep] = useState(0);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState("4");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const [cantidadModificada, setCantidadModificada] = useState<{
    [id: string]: string;
  }>({});
  const handleDetailSelection = (row: any, index: number) => {
    const modifiedQuantity = cantidadModificada[row.id];
    console.log("row ->", row);
    const selectedRow = {
      cartaporte: currentCartaporte.cartaporte?.id,
      descripcion: row.descripcion,
      cantidadTotal: row.cantidadTotal,
      cantidad: modifiedQuantity || row.cantidad.replace(".", ","),
      clase: row.id_clase,
      nombreClase: row.clase,
      marca: row.marca,
      detalleCP: row.id,
      peso_neto: calculatedPesoNeto(
        row.cantidad.toString(),
        currentCartaporte.cartaporte?.peso_neto || "0",
        row.cantidadTotal || "0",
        row.id
      ),
      peso_bruto: calculatedPesoBruto(
        row.cantidad.toString(),
        currentCartaporte.cartaporte?.peso_bruto || "0",
        row.cantidadTotal || "0",
        row.id
      ),
      terminos: currentCartaporte.cartaporte?.terminosincoterms.codigo,
      calcular_valor: calculatedValor(
        row.cantidad.toString(),
        currentCartaporte.cartaporte?.precio_mercancia || "0",
        row.cantidadTotal || "0",
        row.id
      ),
    };

    setSelectedDetails((prevSelectedDetails: any) => {
      const isRowSelected = prevSelectedDetails.some(
        (selectedRow: any) => selectedRow.index === index
      );

      if (isRowSelected) {
        return prevSelectedDetails.filter(
          (selectedRow: any) => selectedRow.index !== index
        );
      } else {
        return [...prevSelectedDetails, { ...selectedRow, index }];
      }
    });
  };

  const handleCantidadChange = (id: number, value: string) => {
    setCantidadModificada((prevCantidadModificada) => ({
      ...prevCantidadModificada,
      [id]: value,
    }));
  };

  const calculatedValor = (
    cantidad: string,
    totalMercancia: string,
    cantidadTotal: string,
    id: number
  ) => {
    const parsedCantidad =
      parseFloat(cantidadModificada[id]?.replace(".", "")) ||
      parseFloat(cantidad) ||
      0;
    const parsedTotalMercancia =
      parseFloat(totalMercancia.replace(",", ".")) || 1;
    const parsedCantidadTotal = parseFloat(cantidadTotal) || 1;

    return ((parsedCantidad * parsedTotalMercancia) / parsedCantidadTotal)
      .toFixed(2)
      .replace(".", ",");
  };

  const calculatedPesoBruto = (
    cantidad: string,
    pesoBruto: string,
    cantidadTotal: string,
    id: number
  ) => {
    const parsedCantidad =
      parseFloat(cantidadModificada[id]?.replace(".", "")) ||
      parseFloat(cantidad) ||
      0;
    const parsedPesoBruto = parseFloat(pesoBruto.replace(",", ".")) || 1;
    const parsedCantidadTotal = parseFloat(cantidadTotal) || 1;
    return ((parsedCantidad * parsedPesoBruto) / parsedCantidadTotal)
      .toFixed(2)
      .replace(".", ",");
  };

  const calculatedPesoNeto = (
    cantidad: string,
    pesoNeto: string,
    cantidadTotal: string,
    id: number
  ) => {
    const parsedCantidad =
      parseFloat(cantidadModificada[id]?.replace(".", "")) ||
      parseFloat(cantidad) ||
      0;
    const parsedPesoNeto = parseFloat(pesoNeto.replace(".", ",")) || 1;
    const parsedCantidadTotal = parseFloat(cantidadTotal) || 1;
    console.log(parsedCantidad, parsedPesoNeto, parsedCantidadTotal, id);
    return ((parsedCantidad * parsedPesoNeto) / parsedCantidadTotal)
      .toFixed(2)
      .replace(".", ",");
  };

  const sumarPesoBrutoTotal = () => {
    let totalBruto = 0;
    selectedDetails.forEach((det) => {
      const cantidadActual =
        methodsNuevoManifiesto
          .watch(`cantidad${det.index}`)
          ?.replace(",", ".") === det.cantidad;
      const pesoBrutoDetalle = cantidadActual
        ? det.peso_bruto
        : calculatedPesoBruto(
            det.cantidad.toString(),
            currentCartaporte.cartaporte?.peso_bruto || det.peso_bruto || "0",
            det.cantidadTotal || "0",
            det.index
          );
      totalBruto += parseFloat(pesoBrutoDetalle.replace(",", "."));
    });
    return totalBruto.toFixed(2).replace(".", ",");
  };

  const sumarPesoNetoTotal = () => {
    let totalNeto = 0;
    selectedDetails.forEach((det) => {
      const cantidadActual =
        methodsNuevoManifiesto
          .watch(`cantidad${det.index}`)
          ?.replace(",", ".") === det.cantidad;
      const pesoNetoDetalle = cantidadActual
        ? det.peso_neto
        : calculatedPesoNeto(
            det.cantidad.toString(),
            currentCartaporte.cartaporte?.peso_neto || det.peso_neto || "0",
            det.cantidadTotal || "0",
            det.index
          );
      totalNeto += parseFloat(pesoNetoDetalle.replace(",", "."));
    });
    return totalNeto.toFixed(2).replace(".", ",");
  };

  const sumarValorTotal = () => {
    let totalValor = 0;
    selectedDetails.forEach((det) => {
      const cantidadActual =
        methodsNuevoManifiesto
          .watch(`cantidad${det.index}`)
          ?.replace(",", ".") === det.cantidad;
      const valorDetalle = cantidadActual
        ? det.calcular_valor
        : calculatedValor(
            det.cantidad.toString(),
            currentCartaporte.cartaporte?.precio_mercancia ||
              det.calcular_valor ||
              "0",
            det.cantidadTotal || "0",
            det.index
          );
      totalValor += parseFloat(valorDetalle.replace(",", "."));
    });

    return totalValor.toFixed(2).replace(".", ",");
  };

  const sumCantidades = () => {
    return currentCartaporte.detallecartaporte
      ?.map((cu) => parseFloat(cu.cantidad.toString()))
      .reduce((a, b) => a + b, 0);
  };

  const sumCantidadesManifiesto = () => {
    return currentManifiesto.detalles
      ?.map((det) => parseFloat(det.cantidad))
      .reduce((a, b) => a + b, 0);
  };

  useEffect(() => {
    if (empresaFind.imagen_logo) {
      const dataUrl = `data:image/png;base64, ${empresaFind.imagen_logo}`;
      setImageDataUrl(dataUrl);
    }
  }, [empresaFind.imagen_logo]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    methodsNuevoManifiesto.setValue("fecha_emision", formattedDate);
  }, []);

  useEffect(() => {
    if (currentCartaporte.cartaporte?.id) {
      methodsNuevoManifiesto.setValue("remitente", {
        value: currentCartaporte.cartaporte?.remitente.id,
        label: currentCartaporte.cartaporte?.remitente.razon_social,
      });
      methodsNuevoManifiesto.setValue("destinatario", {
        value: currentCartaporte.cartaporte?.destinatario.id,
        label: currentCartaporte.cartaporte?.destinatario.razon_social,
      });
      const cpCantidad = currentCartaporte.detallecartaporte?.map(
        (cp) => cp.cantidadTotal
      );
      if (currentManifiesto.id) {
        setSelectedDetails([
          ...currentManifiesto.detalles?.map((detalle) => {
            return {
              cartaporte: detalle.cartaporte,
              descripcion: detalle.descripcion,
              cantidad: detalle.cantidad,
              cantidadTotal: cpCantidad?.toString() || "0",
              clase: detalle.id_clase,
              nombreClase: detalle.clase,
              marca: detalle.marca,
              peso_neto: detalle.pesoneto.replace(".", ","),
              peso_bruto: detalle.pesobruto.replace(".", ","),
              terminos: currentManifiesto.cartaporte?.codigo_incoterm,
              calcular_valor: detalle.precio,
              index: detalle.id,
              volumen: detalle.volumen,
              idCP: detalle.detalleCP,
            };
          }),
        ]);
      }
    }
  }, [currentCartaporte]);

  useEffect(() => {
    if (currentManifiesto.id) {
      methodsNuevoManifiesto.setValue("trailer", {
        value: currentManifiesto.trailer.id,
        label: currentManifiesto.trailer.placa,
      });
      methodsNuevoManifiesto.setValue("remolque", {
        value: currentManifiesto.remolque.id,
        label: currentManifiesto.remolque.placa,
      });
      methodsNuevoManifiesto.setValue("conductorprincipal", {
        value: currentManifiesto.conductorprincipal.id,
        label: currentManifiesto.conductorprincipal.nombre,
      });
      methodsNuevoManifiesto.setValue("conductorauxiliar", {
        value: currentManifiesto.conductorauxiliar.id,
        label: currentManifiesto.conductorauxiliar.nombre,
      });
      methodsNuevoManifiesto.setValue("pais_carga", {
        value: currentManifiesto.lugarcarga.id_pais,
        label: currentManifiesto.lugarcarga.pais,
      });
      methodsNuevoManifiesto.setValue("lugarcarga", {
        value: currentManifiesto.lugarcarga.id,
        label: currentManifiesto.lugarcarga.nombre,
      });
      methodsNuevoManifiesto.setValue("pais_descarga", {
        value: currentManifiesto.lugardescarga.id_pais,
        label: currentManifiesto.lugardescarga.pais,
      });
      methodsNuevoManifiesto.setValue("dpto_carga", {
        value: currentManifiesto.lugarcarga.id_departamento,
        label: currentManifiesto.lugarcarga.departamento,
      });
      methodsNuevoManifiesto.setValue("dpto_descarga", {
        value: currentManifiesto.lugardescarga.id_departamento,
        label: currentManifiesto.lugardescarga.departamento,
      });
      methodsNuevoManifiesto.setValue("lugardescarga", {
        value: currentManifiesto.lugardescarga.id,
        label: currentManifiesto.lugardescarga.nombre,
      });
      setSelectedOption(currentManifiesto.naturaleza.toString());
      methodsNuevoManifiesto.setValue(
        "numeroicontenedores",
        currentManifiesto.numeroicontenedores
      );
      methodsNuevoManifiesto.setValue(
        "numeroprecinto",
        currentManifiesto.numeroprecinto
      );
      methodsNuevoManifiesto.setValue(
        "observacionaduana",
        currentManifiesto.observacionaduana
      );
      methodsNuevoManifiesto.setValue("pais_cruce", {
        value: currentManifiesto.aduanacrucefrontera.id_pais,
        label: currentManifiesto.aduanacrucefrontera.pais,
      });
      methodsNuevoManifiesto.setValue("dpto_cruce", {
        value: currentManifiesto.aduanacrucefrontera.id_departamento,
        label: currentManifiesto.aduanacrucefrontera.departamento,
      });
      methodsNuevoManifiesto.setValue("aduanacrucefrontera", {
        value: currentManifiesto.aduanacrucefrontera.id,
        label: currentManifiesto.aduanacrucefrontera.nombre,
      });
      methodsNuevoManifiesto.setValue("pais_destino", {
        value: currentManifiesto.aduanadestino.id_pais,
        label: currentManifiesto.aduanadestino.pais,
      });
      methodsNuevoManifiesto.setValue("dpto_destino", {
        value: currentManifiesto.aduanadestino.id_departamento,
        label: currentManifiesto.aduanadestino.departamento,
      });
      methodsNuevoManifiesto.setValue("aduanadestino", {
        value: currentManifiesto.aduanadestino.id,
        label: currentManifiesto.aduanadestino.nombre,
      });
      methodsNuevoManifiesto.setValue("remitente", {
        value: currentManifiesto.remitente.id,
        label: currentManifiesto.remitente.razon_social,
      });
      methodsNuevoManifiesto.setValue("destinatario", {
        value: currentManifiesto.destinatario.id,
        label: currentManifiesto.destinatario.razon_social,
      });
      methodsNuevoManifiesto.setValue("puntoaduanafrontera", {
        value: currentManifiesto.puntoaduanafrontera.id,
        label: currentManifiesto.puntoaduanafrontera.nombre,
      });
      methodsNuevoManifiesto.setValue("puntoaduanadestino", {
        value: currentManifiesto.puntoaduanadestino.id,
        label: currentManifiesto.puntoaduanadestino.nombre,
      });
      setSelectedDetails([
        ...currentManifiesto.detalles.map((detalle) => {
          return {
            cartaporte: detalle.cartaporte,
            descripcion: detalle.descripcion,
            cantidad: detalle.cantidad,
            cantidadTotal: currentManifiesto.cartaporte?.cantidad_total,
            clase: detalle.id_clase,
            nombreClase: detalle.clase,
            marca: detalle.marca,
            peso_neto: detalle.pesoneto.replace(".", ","),
            peso_bruto: detalle.pesobruto.replace(".", ","),
            terminos: currentManifiesto.cartaporte?.codigo_incoterm,
            calcular_valor: detalle.precio,
            index: detalle.id,
            volumen: detalle.volumen,
            idCP: detalle.detalleCP,
          };
        }),
      ]);
    }
  }, [currentManifiesto]);

  const onSubmit = (data: NuevoManifiesto) => {
    const formatData = {
      manifiesto: {
        naturaleza: Number(selectedOption),
        especificar: data.especificar || "XXXXXX",
        numeroicontenedores: data.numeroicontenedores,
        numeroprecinto: data.numeroprecinto,
        monedamercancia: empresaFind.tipo_moneda,
        observacionaduana: data.observacionaduana.toUpperCase(),
        cartaporte:
          currentCartaporte.cartaporte?.id || currentManifiesto.cartaporte?.id,
        fecha_emision: data.fecha_emision,
        trailer: data.trailer?.value,
        remolque: data.remolque?.value,
        conductorprincipal: data.conductorprincipal?.value,
        conductorauxiliar: data.conductorauxiliar?.value,
        aduanacrucefrontera: data.aduanacrucefrontera?.value,
        aduanadestino: data.aduanadestino?.value,
        lugarcarga: data.lugarcarga?.value,
        lugardescarga: data.lugardescarga?.value,
        puntoaduanadestino: data.puntoaduanadestino?.value,
        puntoaduanafrontera: data.puntoaduanafrontera?.value,
        remitente:
          currentCartaporte.cartaporte?.remitente.id ||
          currentManifiesto.remitente.id,
        destinatario:
          currentCartaporte.cartaporte?.destinatario.id ||
          currentManifiesto.destinatario.id,
      },
      detallesManifiesto: selectedDetails.map((detalle) => {
        const newCantidad = methodsNuevoManifiesto.getValues(
          `cantidad${detalle.index}`
        )
          ? methodsNuevoManifiesto.getValues(`cantidad${detalle.index}`)
          : detalle.cantidad.replace(".", ",");
        const cantidadActual =
          methodsNuevoManifiesto
            .watch(`cantidad${detalle.index}`)
            ?.replace(",", ".") === detalle.cantidad;
        return {
          id: detalle.index || 0,
          manifiesto: currentManifiesto.id || 0,
          detalleCP: detalle.idCP || detalle.detalleCP,
          precio: cantidadActual
            ? detalle.calcular_valor
            : calculatedValor(
                newCantidad.replace(".", ""),
                currentCartaporte.cartaporte?.precio_mercancia ||
                  detalle.calcular_valor ||
                  "0",
                sumCantidades()?.toString() ||
                  sumCantidadesManifiesto()?.toString() ||
                  "0",
                detalle.index
              ),
          descripcion: detalle.descripcion,
          cantidad: newCantidad,
          pesobruto: cantidadActual
            ? detalle.peso_bruto
            : calculatedPesoBruto(
                newCantidad.replace(".", ""),
                currentCartaporte.cartaporte?.peso_bruto ||
                  detalle.peso_bruto ||
                  "0",
                sumCantidades()?.toString() ||
                  sumCantidadesManifiesto()?.toString() ||
                  "0",
                detalle.index
              ),
          pesoneto: cantidadActual
            ? detalle.peso_neto
            : calculatedPesoNeto(
                newCantidad.replace(".", ""),
                currentCartaporte.cartaporte?.peso_neto ||
                  detalle.peso_neto ||
                  "0",
                sumCantidades()?.toString() ||
                  sumCantidadesManifiesto()?.toString() ||
                  "0",
                detalle.index
              ),
          marca: detalle.marca,
          id_clase: detalle.clase,
          volumen:
            currentCartaporte.cartaporte?.volumen || detalle.volumen || "0",
        };
      }),
    };
    if (currentManifiesto.id && !copyM) {
      // console.log("update data ->", formatData);
      updateManifiesto(currentManifiesto.id, formatData as any);
    } else if (copyM) {
      // console.log("copiate data ->", formatData);
      createManifiesto(formatData as any);
    } else {
      // console.log("create data ->", formatData);
      createManifiesto(formatData as any);
    }
  };

  return {
    activeStep,
    methodsNuevoManifiesto,
    handleBack,
    onSubmit,
    loading,
    empresaFind,
    imageDataUrl,
    findCartaporte,
    vehiculos,
    conductores,
    paises,
    municipios,
    handleOptionChange,
    selectedOption,
    handleClose,
    currentCartaporte,
    setCurrentCartapore,
    selectedDetails,
    handleDetailSelection,
    handleCantidadChange,
    calculatedPesoNeto,
    calculatedPesoBruto,
    calculatedValor,
    terceros,
    sumarPesoBrutoTotal,
    sumarPesoNetoTotal,
    sumarValorTotal,
    sumCantidades,
    setSelectedDetails,
    sumCantidadesManifiesto,
    currentManifiesto,
    puntosSalida,
    copyManifiesto,
    manifiestos,
    departamentos,
  };
};

export default useNuevoManifiesto;
