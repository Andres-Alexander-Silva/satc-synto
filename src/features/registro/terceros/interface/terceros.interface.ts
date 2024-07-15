export interface TercerosForm {
  tipo_documento: TipoDocumento;
  numero_identificacion: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  municipio: Municipio;
  consignatario: Select;
  destinatario: Select;
  remitente: Select;
  notificara: Select;
  agencia: Select;
  digito_verificacion: number;
}

interface Select {
  value: boolean;
  label: string;
}

interface Municipio {
  value: number;
  label: string;
}

interface TipoDocumento {
  value: number;
  label: string;
}

export interface Terceros {
  id: number;
  tipo_documento: string;
  id_tipo_documento: number;
  numero_identificacion: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  municipio: string;
  id_municipio: number;
  id_pais: number;
  id_departamento: number;
  consignatario: boolean;
  destinatario: boolean;
  remitente: boolean;
  notificara: boolean;
  agencia: boolean;
  estado: boolean;
  digito_verificacion: string;
  pais: string;
}
