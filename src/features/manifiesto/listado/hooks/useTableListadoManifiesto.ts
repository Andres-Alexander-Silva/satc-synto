import { useContext, useState } from "react";
import { ListadoManifiestoContext } from "@/features/manifiesto/listado/context/ListadoManifiestoContext";
import { EmpresaContext } from "@/features/configuracion/empresas/context/EmpresaContext";

const useTableListadoManifiesto = () => {
  const { downloadOriginal, loading, manifiestos } = useContext(
    ListadoManifiestoContext
  );
  const { empresaFind } = useContext(EmpresaContext);

  const [search, setSearch] = useState("");

  const formatManifiestoId = (id: number) => id.toString().padStart(3, "0");

  const manifiestoSorted = manifiestos.sort((a, b) => b.id - a.id);

  const calcularTotalPesoNeto = (registro: any) => {
    return registro.detalles?.reduce((total: any, detalle: any) => {
      return total + parseFloat(detalle.pesoneto || 0);
    }, 0);
  };

  const calcularTotalPesoNetoTodos = (datos: any) => {
    return datos.map(calcularTotalPesoNeto);
  };

  const totalesPesoNeto = calcularTotalPesoNetoTodos(manifiestos);

  const calcularTotalPesoBruto = (registro: any) => {
    return registro.detalles?.reduce((total: any, detalle: any) => {
      return total + parseFloat(detalle.pesobruto || 0);
    }, 0);
  };

  const calcularTotalPesoBrutoTodos = (datos: any) => {
    return datos.map(calcularTotalPesoBruto);
  };

  const totalesPesoBruto = calcularTotalPesoBrutoTodos(manifiestos);

  const calcularTotalPrecio = (registro: any) => {
    return registro.detalles?.reduce((total: any, detalle: any) => {
      return total + parseFloat(detalle.precio || 0);
    }, 0);
  };

  const calcularTotalPrecioTodos = (datos: any) => {
    return datos.map(calcularTotalPrecio);
  };

  const totalesPrecio = calcularTotalPrecioTodos(manifiestos);

  const searchManifiesto = () => {
    return manifiestoSorted.filter((m) => {
      const numCartaporteMatch = String(formatManifiestoId(m.id))
        .toLowerCase()
        .includes(search.toLowerCase());

      const fechaEmisionMatch = m.fecha_emision
        .toLowerCase()
        .includes(search.toLowerCase());

      const cartaporteMatch = String(m.cartaporte)
        .toLowerCase()
        .includes(search.toLowerCase());

      const conductoMatch = m.conductorprincipal.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const vehiculoMatch = m.trailer.placa
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        search === "" ||
        numCartaporteMatch ||
        fechaEmisionMatch ||
        cartaporteMatch ||
        conductoMatch ||
        vehiculoMatch
      );
    });
  };

  return {
    loading,
    formatManifiestoId,
    downloadOriginal,
    search,
    setSearch,
    searchManifiesto,
    empresaFind,
    totalesPesoNeto,
    totalesPesoBruto,
    totalesPrecio
  };
};

export default useTableListadoManifiesto;
