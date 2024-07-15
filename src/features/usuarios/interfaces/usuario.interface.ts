export interface Permission {
  menuId: number;
  nombre: string;
  icono: string;
  url: string;
  estado: boolean;
  consultar: boolean;
  insertar: boolean;
  editar: boolean;
  eliminar: boolean;
  menu: Menu;
  id: number;
  creado: string;
  actualizado: string;
}

export interface Menu {
  nombre: string;
  icono: string;
  estado: boolean;
  id: number;
  creado: string;
  actualizado: string;
}

export interface TransformedMenuItem {
  id: number;
  menutitle: string;
  Items: {
    id: number;
    icon: string;
    title: string;
    type: string;
    active: boolean;
    selected: boolean;
    children: {
      id: number;
      path: string;
      type: string;
      active: boolean;
      selected: boolean;
      title: string;
    }[];
  }[];
}
