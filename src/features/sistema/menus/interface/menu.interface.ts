export interface Menu {
  id: number;
  nombre: string;
  icono: string;
  estado: boolean;
  orden: number;
}

export interface MenuForm {
  nombre: string;
  icono: string;
  estado: boolean;
  orden: boolean;
}
