import { useContext, useEffect } from "react";
import { MenuContext } from "@/features/sistema/menus/context/MenuContext";
import { MenuForm } from "@/features/sistema/menus/interface/menu.interface";

const useModalMenu = () => {
  const {
    loading,
    handleClose,
    methodsMenu,
    createMenus,
    updateMenus,
    currentMenu,
  } = useContext(MenuContext);

  const onSubmit = (data: MenuForm) => {
    if (currentMenu.id) {
      updateMenus(currentMenu.id, data);
    } else {
      createMenus(data);
    }
  };

  useEffect(() => {
    if (currentMenu.id) {
      methodsMenu.setValue("nombre", currentMenu.nombre);
      methodsMenu.setValue("icono", currentMenu.icono);
      methodsMenu.setValue("orden", currentMenu.orden);
    } else {
      methodsMenu.reset();
    }
  }, [currentMenu]);

  return {
    loading,
    open,
    handleClose,
    methodsMenu,
    onSubmit,
    currentMenu,
  };
};

export default useModalMenu;
