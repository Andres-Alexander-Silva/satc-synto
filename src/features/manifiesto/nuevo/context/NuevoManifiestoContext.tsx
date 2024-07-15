import { createContext, useEffect, useState } from "react";
import * as nuevoManifiestoServices from "@/features/manifiesto/nuevo/services/nuevo_manifiesto.services";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { NuevoManifiesto } from "@/features/manifiesto/nuevo/interface/nuevo_manifiesto.interface";
import {
  CartaporteListado,
  Manifiesto,
} from "@/features/carta_porte/listado/interface/listado.interface";
import Swal from "sweetalert2";
import { Manifiestos } from "@/features/manifiesto/listado/interfaces/listado_manifiesto.interfaces";

interface NuevoManifiestoProviderProps {
  children: React.ReactNode;
}

interface NuevoManifiestoContextValues {
  currentCartaporte: CartaporteListado;
  setCurrentCartapore: (data: CartaporteListado) => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  methodsNuevoManifiesto: any;
  loading: boolean;
  createManifiesto: (data: NuevoManifiesto) => void;
  updateManifiesto: (id: number, data: NuevoManifiesto) => void;
  findCartaporte: (id: number) => void;
  selectedDetails: any[];
  setSelectedDetails: (data: any) => void;
  currentManifiesto: Manifiesto;
  manifiestos: Manifiestos[];
  copyManifiesto: (id: number, copy: boolean) => void;
  copyM: boolean;
}

export const NuevoManifiestoContext =
  createContext<NuevoManifiestoContextValues>({
    currentCartaporte: {} as CartaporteListado,
    setCurrentCartapore: () => {},
    open: false,
    handleOpen: () => {},
    handleClose: () => {},
    methodsNuevoManifiesto: {},
    loading: false,
    createManifiesto: () => {},
    updateManifiesto: () => {},
    findCartaporte: () => {},
    selectedDetails: [],
    setSelectedDetails: () => {},
    currentManifiesto: {} as Manifiesto,
    manifiestos: [],
    copyManifiesto: () => {},
    copyM: false,
  });

export const NuevoManifiestoProvider = ({
  children,
}: NuevoManifiestoProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentCartaporte, setCurrentCartapore] = useState(
    {} as CartaporteListado
  );
  const [selectedDetails, setSelectedDetails] = useState<any[]>([]);
  const [currentManifiesto, setCurrentManifiesto] = useState({} as Manifiesto);
  const [manifiestos, setManifiestos] = useState<Manifiestos[]>([]);
  const [copyM, setCopyM] = useState(false);
  const [open, setOpen] = useState(false);
  const methodsNuevoManifiesto = useForm();
  const { id } = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getListado = async () => {
    try {
      setLoading(true);
      const { data } = await nuevoManifiestoServices.getManifiestos();
      setManifiestos(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createManifiesto = async (data: NuevoManifiesto) => {
    try {
      setLoading(true);
      await nuevoManifiestoServices.createManifiesto(data);
      toast.success("Manifiesto creado con éxito");
      methodsNuevoManifiesto.reset();
      setCurrentCartapore({} as CartaporteListado);
      setSelectedDetails([]);
      localStorage.removeItem("totalValor");
      Swal.fire({
        icon: "success",
        title: "Manifiesto creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error al registrar Manifiesto",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateManifiesto = async (id: number, data: NuevoManifiesto) => {
    try {
      setLoading(true);
      await nuevoManifiestoServices.updateManifiesto(id, data);
      toast.success("Manifiesto actualizado con éxito");
      methodsNuevoManifiesto.reset();
      setSelectedDetails([]);
      Swal.fire({
        icon: "success",
        title: "Manifiesto actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error al registrar Manifiesto",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyManifiesto = async (id: number, copy: boolean) => {
    try {
      setLoading(true);
      const { data } = await nuevoManifiestoServices.findManifiesto(id);
      setCopyM(copy);
      setCurrentManifiesto(data.response);
      Swal.fire({
        icon: "success",
        title: "Manifiesto copiado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error al registrar Manifiesto",
        text: "Error al copiar el manifiesto",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findManifiesto = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await nuevoManifiestoServices.findManifiesto(id);
      findCartaporte(data.response.cartaporte.id);
      setCurrentManifiesto(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findCartaporte = async (id: number) => {
    try {
      const { data } = await nuevoManifiestoServices.findCartaporte(id);
      setCurrentCartapore(data.response);
      const detalleCartaporte = data.response.detallecartaporte?.map(
        (det: any) => det.id
      );
      if (detalleCartaporte) {
        let updatedDetalleCartaporte = data.response.detallecartaporte;
        for (const detId of detalleCartaporte) {
          try {
            const { data: datas } =
              await nuevoManifiestoServices.manifiestoSelect(
                data.response.cartaporte.id,
                detId
              );

            const format = {
              id: detId,
              detalle: datas,
            };
            // if (format.detalle.cantidad_total === null) return;
            updatedDetalleCartaporte = updatedDetalleCartaporte?.map(
              (detalle: any) => {
                if (detalle.id === format.id) {
                  const resta =
                    parseFloat(detalle.cantidad.toString()) -
                    parseFloat(format.detalle.cantidad_total);
                  return {
                    ...detalle,
                    cantidadTotal: detalle.cantidad,
                    cantidad: resta.toFixed(2),
                  };
                }
                return detalle;
              }
            );
          } catch (error) {
            toast.error("No se encontró el detalle");
          }
        }

        setCurrentCartapore((prevCartaporte: any) => ({
          ...prevCartaporte,
          detallecartaporte: updatedDetalleCartaporte,
        }));
      }
    } catch (error) {
      toast.error("No se encontró el cartaporte");
    }
  };

  useEffect(() => {
    if (id) {
      findManifiesto(Number(id));
    }

    if (id === undefined) {
      methodsNuevoManifiesto.reset();
    }
  }, [id]);

  useEffect(() => {
    getListado();
  }, []);

  return (
    <NuevoManifiestoContext.Provider
      value={{
        currentManifiesto,
        setCurrentCartapore,
        currentCartaporte,
        open,
        handleOpen,
        handleClose,
        findCartaporte,
        methodsNuevoManifiesto,
        loading,
        createManifiesto,
        updateManifiesto,
        selectedDetails,
        setSelectedDetails,
        manifiestos,
        copyManifiesto,
        copyM,
      }}
    >
      {children}
    </NuevoManifiestoContext.Provider>
  );
};
