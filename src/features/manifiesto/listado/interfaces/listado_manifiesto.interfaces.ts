export interface Manifiestos {
  id: number;
  naturaleza: number;
  especificar: string;
  numeroicontenedores: string;
  numeroprecinto: string;
  preciomercancia: string;
  monedamercancia: string;
  observacionaduana: string;
  cartaporte: Cartaporte;
  fecha_emision: string;
  trailer: Trailer;
  remolque: Remolque;
  conductorprincipal: Conductorprincipal;
  conductorauxiliar: Conductorauxiliar;
  aduanacrucefrontera: Aduanacrucefrontera;
  aduanadestino: Aduanadestino;
  lugarcarga: Lugarcarga;
  lugardescarga: Lugardescarga;
  remitente: Remitente;
  destinatario: Destinatario;
  detalles: any[];
}

interface Cartaporte {
  id: number;
  municipio: string;
  pais: string;
  codigo_incoterm: string;
}

interface Trailer {
  id: number;
  placa: string;
  marca: string;
  id_marca: number;
  pais: string;
  id_pais: number;
  tipo_vehiculo: string;
  id_tipo_vehiculo: number;
  modelo: number;
  numchasis: string;
  numerohabilitacion: string;
  estado: boolean;
}

interface Remolque {
  id: number;
  placa: string;
  marca: string;
  id_marca: number;
  pais: string;
  id_pais: number;
  tipo_vehiculo: string;
  id_tipo_vehiculo: number;
  modelo: number;
  numchasis: string;
  numerohabilitacion: string;
  estado: boolean;
}

interface Conductorprincipal {
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
  estado: boolean;
}

interface Conductorauxiliar {
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
  estado: boolean;
}

interface Aduanacrucefrontera {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  id_pais: number;
}

interface Aduanadestino {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  id_pais: number;
}

interface Lugarcarga {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  id_pais: number;
}

interface Lugardescarga {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  id_pais: number;
}

interface Remitente {
  id: number;
  tipo_documento: string;
  numero_identificacion: string;
  digito_verificacion: string;
  razon_social: string;
  direccion: string;
  municipio: string;
  pais_muinicipio: string;
}

interface Destinatario {
  id: number;
  tipo_documento: string;
  numero_identificacion: string;
  digito_verificacion: string;
  razon_social: string;
  direccion: string;
  municipio: string;
  pais_muinicipio: string;
}
