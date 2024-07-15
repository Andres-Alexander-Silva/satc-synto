import { createContext, useEffect, useState } from "react";
import * as nuevaCartaPorteServices from "@/features/carta_porte/nueva/services/nueva_carta_porte.services";
import { useForm } from "react-hook-form";
import { NuevaCartaPorteForm } from "@/features/carta_porte/nueva/interfaces/nueva_carta_porte.interface";
import { CartaporteListado } from "@/features/carta_porte/listado/interface/listado.interface";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

interface NuevaCartaPorteProviderProps {
  children: React.ReactNode;
}

interface NuevaCartaPorteContextValues {
  loading: boolean;
  methodsNuevaCartaPorte: any;
  currentCartaporte: CartaporteListado;
  createCartaPorte: (data: NuevaCartaPorteForm) => void;
  updateCartaporte: (id: number, data: NuevaCartaPorteForm) => void;
  listadoCartaporte: CartaporteListado[];
  copyCartaporte: (id: string, copy: boolean) => void;
  copyCp: boolean;
}

export const NuevaCartaPorteContext =
  createContext<NuevaCartaPorteContextValues>({
    loading: false,
    methodsNuevaCartaPorte: {},
    currentCartaporte: {} as CartaporteListado,
    createCartaPorte: (_data: NuevaCartaPorteForm) => {},
    updateCartaporte: (_id: number, _data: NuevaCartaPorteForm) => {},
    listadoCartaporte: [],
    copyCartaporte: (_id: string, _copy: boolean) => {},
    copyCp: false,
  });

export const NuevaCartaPorteProvider = ({
  children,
}: NuevaCartaPorteProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [currentCartaporte, setCurrentCartapore] = useState(
    {} as CartaporteListado
  );
  const [listadoCartaporte, setListadoCartaporte] = useState<
    CartaporteListado[]
  >([]);
  const [copyCp, setCopyCp] = useState(false);
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const methodsNuevaCartaPorte = useForm<NuevaCartaPorteForm>({
    defaultValues: {
      fecharecibido: formattedDate,
      fechaembarque: formattedDate,
      fechadeentrega: formattedDate,
      condiciones_transporte_pago: "",
      pesoneto: "",
      pesobruto: "",
      volumen: "XXXXXX",
      otras_unidades: "XXXXXX",
      preciomercancia: "",
      moneda_mercancia: "",
      valorfleteremitente: 0,
      valorseguroremitente: 0,
      valorotrogastosremitente: 0,
      valortotalremitente: 0,
      modendafleteremitente: "",
      monedaseguroremitente: "",
      monedaotrosgastosremitente: "",
      monedatotalremitete: "",
      valorfletedestinatario: 0,
      valorsegurodestinatario: 0,
      valorotrosgastosdestinatario: 0,
      valortotaldestinatari: 0,
      monedafletedestinatario: "",
      monedasegurodestinatario: "",
      monedaotrosgastosdestinatario: "",
      monedatotaldestinatario: "",
      documentosrecibidos: "",
      fechaemision: formattedDate,
      instrucciones_transportista: "",
      observacionestransportista: "",
      remitente: {
        value: 0,
        label: "",
      },
      destinatario: {
        value: 0,
        label: "",
      },
      consignatario: {
        value: 0,
        label: "",
      },
      notificara: {
        value: 0,
        label: "",
      },
      terminosincoterms: {
        value: 0,
        label: "",
      },
      lugarembarque: {
        value: 0,
        label: "",
      },
      lugaremision: {
        value: 0,
        label: "",
      },
      lugarentrega: {
        value: 0,
        label: "",
      },
      lugarrecibio: {
        value: 0,
        label: "",
      },
      detalleCartaPorte: [
        { marca: "", cantidad: "", descripcion: "", id_clase: "" },
      ],
    },
  });

  const getListado = async () => {
    try {
      setLoading(true);
      const { data } = await nuevaCartaPorteServices.getListadoCartaPorte();
      setListadoCartaporte(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCartaPorte = async (data: NuevaCartaPorteForm) => {
    try {
      setLoading(true);
      await nuevaCartaPorteServices.createCartaPorte(data);
      Swal.fire({
        icon: "success",
        title: "Cartaporte creada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      methodsNuevaCartaPorte.reset();
    } catch (error: any) {
      Swal.fire({
        title: "Error al registrar carta porte",
        text: "Error al registrar la carta porte",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyCartaporte = async (id: string, copy: boolean) => {
    try {
      setLoading(true);
      const { data } = await nuevaCartaPorteServices.findCartaporte(id);
      setCopyCp(copy);
      setCurrentCartapore(data.response);
      Swal.fire({
        icon: "success",
        title: "Cartaporte copiada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error al registrar carta porte",
        text: "Error al copiar la carta porte",
        icon: "error",
        confirmButtonText: "Ok",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const findCartaporte = async () => {
    try {
      setLoading(true);
      if (id) {
        const { data } = await nuevaCartaPorteServices.findCartaporte(id);
        setCurrentCartapore(data.response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartaporte = async (id: number, data: NuevaCartaPorteForm) => {
    try {
      setLoading(true);
      await nuevaCartaPorteServices.editCartaporte(id, data);
      Swal.fire({
        icon: "success",
        title: "Cartaporte actualizada con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      navigate("/main/carta_porte/listarcartaporte");
    } catch (error: any) {
      Swal.fire({
        title: "Error al registrar carta porte",
        text: "Error al actualizar la carta porte",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findCartaporte();

    if (id === undefined) {
      methodsNuevaCartaPorte.reset();
    }
  }, [id]);

  useEffect(() => {
    getListado();
  }, []);

  return (
    <NuevaCartaPorteContext.Provider
      value={{
        listadoCartaporte,
        currentCartaporte,
        loading,
        methodsNuevaCartaPorte,
        createCartaPorte,
        updateCartaporte,
        copyCartaporte,
        copyCp,
      }}
    >
      {children}
    </NuevaCartaPorteContext.Provider>
  );
};
