export interface DepartamentosForm {
  codigo: string;
  nombre: string;
  pais: Pais;
}

interface Pais {
  value: number;
  label: string;
}

export interface Departamentos {
  id: number;
  codigo: string;
  nombre: string;
  pais: string;
  id_pais: number;
  estado: boolean
}
