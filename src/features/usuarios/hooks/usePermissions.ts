import { useContext, useEffect, useState } from "react";
import { UsuariosContext } from "@/features/usuarios/context/UsuariosContext";
import { TransformedMenuItem } from "@/features/usuarios/interfaces/usuario.interface";

const usePermissions = () => {
  const { loading, permissions } = useContext(UsuariosContext);
  const [formattedPermissions, setFormattedPermissions] = useState<
    TransformedMenuItem[]
  >([]);

  const formatPermissions = (dataArray: any) => {
    const groupedData: { [key: string]: TransformedMenuItem } = {};

    dataArray.forEach((data: any) => {
      const menuTitle = data.menu.nombre;

      if (groupedData[menuTitle]) {
        groupedData[menuTitle].Items[0].children.push({
          id: data.menu.id + 2,
          path: `/main${data.url}`,
          type: "link",
          active: data.estado,
          selected: false,
          title: data.nombre,
        });
      } else {
        groupedData[menuTitle] = {
          id: data.menu.id,
          menutitle: menuTitle,
          Items: [
            {
              id: data.menu.id + 1,
              icon: data.menu.icono,
              title: menuTitle,
              type: "sub",
              active: false,
              selected: false,
              children: [
                {
                  id: data.menu.id + 2,
                  path: `/main${data.url}`,
                  type: "link",
                  active: false,
                  selected: false,
                  title: data.nombre,
                },
              ],
            },
          ],
        };
      }
    });

    const transformedDataArray = Object.values(groupedData);

    setFormattedPermissions(transformedDataArray);
  };

  useEffect(() => {
    if (permissions.length > 0) {
      formatPermissions(permissions);
    }
  }, [loading, permissions]);

  return {
    permissions: formattedPermissions,
    loading,
  };
};

export default usePermissions;
