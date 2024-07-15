export interface Roles {
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
}

export interface RolesPermisos {
  consultar: boolean;
  editar: boolean;
  eliminar: boolean;
  insertar: boolean;
  id: number;
  opcion: Opcion;
  rol: Rol;
}

interface Opcion {
  id: number;
  nombre: string;
  menu: Menu;
}

interface Menu {
  id: number;
  nombre: string;
}

interface Rol {
  id: number;
}

export interface RolesForm {
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface RolPermisoCheck {
  primaryId: number;
  value: boolean;
  rm: string;
}
