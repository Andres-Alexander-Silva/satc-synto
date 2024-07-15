export interface Opciones {
  id: number;
  nombre: string;
  icono: string;
  url: string;
  estado: boolean;
  orden: number;
  subOpcion: boolean;
  menu: Menu;
  permisos: Permisos[];
}

interface Permisos {
  id: number;
  consultar: boolean;
  rol: number
  insertar: boolean;
  editar: boolean;
  eliminar: boolean;
}

interface Menu {
  id: number;
  nombre: string;
  icono: string;
  estado: boolean;
  orden: number;
}

export interface OpcionesForm {
  nombre: string;
  icono: string;
  url: string;
  estado: boolean;
  orden: number;
  subOpcion: boolean;
  menu: Menu;
  rol: number;
  consultar: boolean;
  insertar: boolean;
  editar: boolean;
  eliminar: boolean;
}

interface Menu {
  value: number;
  label: string;
}
