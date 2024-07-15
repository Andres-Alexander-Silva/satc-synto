export interface Empresa {
  id: number;
  identificacion: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  imagen_logo: string;
  estado: boolean;
  digito_verificacion: string;
  codigoci: string;
  codigoctic: string;
  codigopps: string;
  tipo_moneda: string;
  numCopias: number;
  prefijo: string
}

export interface EmpresaFind {
  id: number;
  identificacion: string;
  digito_verificacion: string;
  codigoctic: string;
  codigoci: string;
  codigopps: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  imagen_logo: string;
  estado: boolean;
  tipo_moneda: string;
  numCopias: number;
}

export interface EmpresaForm {
  identificacion: string;
  razon_social: string;
  direccion: string;
  telefono: string;
  correo_electronico: string;
  imagen_logo: string;
  codigoci: string;
  codigoctic: string;
  codigopps: string;
  tipo_moneda: string;
}
