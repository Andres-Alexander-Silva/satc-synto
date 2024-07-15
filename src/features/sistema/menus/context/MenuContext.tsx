import { createContext, useState, useEffect } from "react";
import * as menuServices from "@/features/sistema/menus/services/menu.services";
import { useForm } from "react-hook-form";
import {
  MenuForm,
  Menu,
} from "@/features/sistema/menus/interface/menu.interface";
import Swal from "sweetalert2";

interface MenuProviderProps {
  children: React.ReactNode;
}

interface MenuContextValues {
  loading: boolean;
  currentMenu: Menu;
  menu: Menu[];
  methodsMenu: any;
  handleClose: () => void;
  setCurrentMenu: (menu: Menu) => void;
  createMenus: (data: MenuForm) => void;
  updateMenus: (id: number, data: MenuForm) => void;
  deleteMenus: (id: number, estado: boolean) => void;
}

export const MenuContext = createContext<MenuContextValues>({
  loading: false,
  currentMenu: {} as Menu,
  menu: [],
  methodsMenu: {},
  handleClose: () => {},
  setCurrentMenu: (_menu: Menu) => {},
  createMenus: (_data: MenuForm) => {},
  updateMenus: (_id: number, _data: MenuForm) => {},
  deleteMenus: (_id: number, _estado: boolean) => {},
});

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({} as Menu);
  const [menu, setMenu] = useState<Menu[]>([]);
  const methodsMenu = useForm<MenuForm>();

  const handleClose = () => {
    setCurrentMenu({} as Menu);
    methodsMenu.reset();
  };

  const getMenus = async () => {
    try {
      setLoading(true);
      const { data } = await menuServices.getMenus();
      setMenu(data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createMenus = async (data: MenuForm) => {
    try {
      setLoading(true);
      await menuServices.createMenus(data);
      Swal.fire({
        icon: "success",
        title: "Menu creado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMenus();
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateMenus = async (id: number, data: MenuForm) => {
    try {
      setLoading(true);
      await menuServices.updateMenus(id, data);
      Swal.fire({
        icon: "success",
        title: "Menu actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMenus();
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMenus = async (id: number, estado: boolean) => {
    try {
      setLoading(true);
      await menuServices.deleteMenus(id, estado);
      Swal.fire({
        icon: "success",
        title: "Menu actualizado con éxito",
        showConfirmButton: false,
        timer: 1500,
        heightAuto: false,
      });
      getMenus();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.error,
        heightAuto: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        loading,
        currentMenu,
        menu,
        methodsMenu,
        handleClose,
        setCurrentMenu,
        createMenus,
        updateMenus,
        deleteMenus,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
