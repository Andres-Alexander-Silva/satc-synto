import { useContext, useState } from "react";
import { MenuContext } from "@/features/sistema/menus/context/MenuContext";
import { Menu } from "@/features/sistema/menus/interface/menu.interface";

const useTableMenu = () => {
  const { menu, loading, deleteMenus, setCurrentMenu } =
    useContext(MenuContext);

  const [search, setSearch] = useState("");

  const searchMenu = () => {
    return menu.filter((men) => {
      const nombreMatches = men.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      return search === "" || nombreMatches;
    });
  };

  const open = (menu: Menu) => {
    setCurrentMenu(menu);
  };

  return {
    loading,
    deleteMenus,
    open,
    search,
    setSearch,
    searchMenu,
  };
};

export default useTableMenu;
