export interface Conductores {
  id: number;
  tipo_documento: string;
  id_tipo_documento: number;
  numero_documento: string;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  celular: string;
  libreta: string;
  licencia: string;
  estado: number;
}

export interface ConductoresForm {
  tipo_documento: TipoDocumento;
  numero_documento: string;
  nombre: string;
  apellido: string;
  nacionalidad: string;
  celular: string;
  libreta: string;
  licencia: string;
  estado: boolean;
}

interface TipoDocumento {
  value: number;
  label: string;
}
