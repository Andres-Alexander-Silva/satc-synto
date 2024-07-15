export interface Municipios {
  id: number;
  codigo: string;
  nombre: string;
  pais: string;
  departamento: string;
  id_departamento: number;
  estado: boolean;
  id_pais: number;
}

export interface MunicipiosForm {
  codigo: string;
  nombre: string;
  departamento: Departamento;
}

interface Departamento {
  value: number;
  label: string;
}
