import { useContext, useEffect } from "react";
import { OpcionesContext } from "@/features/sistema/opciones/context/OpcionesContext";
import { MenuContext } from "@/features/sistema/menus/context/MenuContext";
import { convertStringToBoolean } from "@/utils/stringToBoolean";
import { OpcionesForm } from "@/features/sistema/opciones/interface/opciones.interfaces";

const useModalOpciones = () => {
  const {
    loading,
    handleClose,
    methodsOpciones,
    createOpciones,
    updateOpciones,
    currentOpciones,
  } = useContext(OpcionesContext);
  const { menu } = useContext(MenuContext);

  const convertPermisos = (permisos: any) => {
    return {
      consultar: convertStringToBoolean(permisos?.consultar?.toString()),
      insertar: convertStringToBoolean(permisos?.insertar?.toString()),
      editar: convertStringToBoolean(permisos?.editar?.toString()),
      eliminar: convertStringToBoolean(permisos?.eliminar?.toString()),
    };
  };

  const onSubmit = (data: OpcionesForm) => {
    const formatData = {
      ...data,
      menu: data.menu.value,
      estado: convertStringToBoolean(data.estado.toString()),
      subOpcion: convertStringToBoolean(data.subOpcion.toString()),
    };
    if (Array.isArray(data.rol)) {
      data.rol = data.rol[0];
    }
    if (currentOpciones.id) {
      updateOpciones(currentOpciones.id, formatData as any);
    } else {
      createOpciones(formatData as any);
    }
  };

  const findMenu = (id: number) => {
    return menu.find((item) => item.id === id);
  };

  useEffect(() => {
    if (currentOpciones) {
      methodsOpciones.setValue("nombre", currentOpciones.nombre);
      methodsOpciones.setValue("icono", currentOpciones.icono);
      methodsOpciones.setValue("url", currentOpciones.url);
      methodsOpciones.setValue("estado", {
        value: currentOpciones.estado ? "true" : "false",
        label: currentOpciones.estado ? "Activo" : "Inactivo",
      });
      methodsOpciones.setValue("orden", currentOpciones.orden);
      methodsOpciones.setValue("subOpcion", {
        value: currentOpciones.subOpcion ? "true" : "false",
        label: currentOpciones.subOpcion ? "Si" : "No",
      });
      const menu = findMenu(currentOpciones.menu?.id);
      if (menu) {
        methodsOpciones.setValue("menu", {
          value: menu.id,
          label: menu.nombre,
        });
      }
      const permisos = convertPermisos(currentOpciones.permisos);
      methodsOpciones.setValue("consultar", permisos.consultar.toString());
      methodsOpciones.setValue("insertar", permisos.insertar.toString());
      const rol = currentOpciones.permisos?.map((p: any) => p.roll);
      if (rol) {
        methodsOpciones.setValue("rol", rol);
      }
      methodsOpciones.setValue("editar", permisos.editar.toString());
      methodsOpciones.setValue("eliminar", permisos.eliminar.toString());
    } else {
      methodsOpciones.setValue("nombre", "");
      methodsOpciones.setValue("icono", "");
      methodsOpciones.setValue("url", "");
      methodsOpciones.setValue("estado", "");
      methodsOpciones.setValue("orden", "");
      methodsOpciones.setValue("subOpcion", "");
      methodsOpciones.setValue("menu", "");
      methodsOpciones.setValue("rol", "");
      methodsOpciones.setValue("consultar", "");
      methodsOpciones.setValue("insertar", "");
      methodsOpciones.setValue("editar", "");
      methodsOpciones.setValue("eliminar", "");
    }
  }, [currentOpciones]);

  return {
    loading,
    handleClose,
    methodsOpciones,
    onSubmit,
    currentOpciones,
    menu,
  };
};

export default useModalOpciones;
