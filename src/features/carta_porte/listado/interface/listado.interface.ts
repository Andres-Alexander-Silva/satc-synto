export interface CartaporteListado {
  cartaporte: Cartaporte;
  detallecartaporte: Detallecartaporte[];
}

export interface Cartaporte {
  estadoRD: number;
  id: number;
  fecha_recibido: string;
  fecha_embarque: string;
  fecha_de_entrega: string;
  condiciones_transporte_pago: string;
  peso_neto: string;
  peso_bruto: string;
  volumen: string;
  otras_unidades: string;
  precio_mercancia: string;
  moneda_mercancia: string;
  valor_flete_remitente: string;
  valor_seguro_remitente: string;
  valor_otros_gastos_remitente: string;
  valor_total_remitente: string;
  modenda_flete_remitente: string;
  moneda_seguro_remitente: string;
  moneda_otros_gastos_remitente: string;
  moneda_total_remitete: string;
  valorfletedestinatario: string;
  valor_seguro_destinatario: string;
  valor_otros_gastos_destinatario: string;
  valor_total_destinatario: string;
  moneda_flete_destinatario: string;
  moneda_seguro_destinatario: string;
  moneda_otros_gastos_destinatario: string;
  moneda_total_destinatario: string;
  documentos_recibidos: string;
  fecha_emision: string;
  instrucciones_transportista: string;
  observaciones_transportista: string;
  remitente: Remitente;
  destinatario: Destinatario;
  consignatario: Consignatario;
  agenteaduana: number;
  notificara: Notificara;
  terminosincoterms: Terminosincoterms;
  lugarembarque: Lugarembarque;
  lugaremision: Lugaremision;
  lugarentrega: Lugarentrega;
  lugarrecibio: Lugarrecibio;
  municipioIcoterm: MunicipioIcoterm;
}

interface MunicipioIcoterm {
  id: number;
  id_departamento: number;
  id_pais: number;
  name: string;
  name_departamento: string;
  name_pais: string;
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

interface Consignatario {
  id: number;
  tipo_documento: string;
  numero_identificacion: string;
  digito_verificacion: string;
  razon_social: string;
  direccion: string;
  municipio: string;
  pais_muinicipio: string;
}

interface Notificara {
  id: number;
  tipo_documento: string;
  numero_identificacion: string;
  digito_verificacion: string;
  razon_social: string;
  direccion: string;
  municipio: string;
  pais_muinicipio: string;
}

interface Terminosincoterms {
  id: number;
  codigo: string;
  descripcion: string;
}

interface Lugarembarque {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Lugaremision {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Lugarentrega {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Lugarrecibio {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

export interface Detail {
  detalleCartaporte: Detallecartaporte;
}

interface Detallecartaporte {
  id: number;
  marca: string;
  cantidad: number;
  cantidad_inicial: string;
  descripcion: string;
  id_clase: string;
  clase: string;
  cartaporte: number;
  cantidadTotal: string;
}

export interface Manifiesto {
  id: number;
  naturaleza: number;
  especificar: string;
  numeroicontenedores: string;
  numeroprecinto: string;
  preciomercancia: string;
  monedamercancia: string;
  observacionaduana: string;
  cartaporte: Cartaport;
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
  puntoaduanadestino: PuntoaduanaDestino;
  puntoaduanafrontera: PuntoaduanaFrontera;
  detalles: Detalle[];
}

interface Cartaport {
  id: number;
  municipio: string;
  pais: string;
  codigo_incoterm: string;
  cantidad_total: string;
  peso_bruto: string;
  peso_neto: string;
  precio_mercancia: string;
}

interface PuntoaduanaDestino {
  id: number;
  nombre: string;
  estado: boolean;
}

interface PuntoaduanaFrontera {
  id: number;
  nombre: string;
  estado: boolean;
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
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Aduanadestino {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Lugarcarga {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Lugardescarga {
  id: number;
  codigo: string;
  nombre: string;
  id_departamento: number;
  departamento: string;
  id_pais: number;
  pais: string;
}

interface Detalle {
  id: number;
  descripcion: string;
  cantidad: string;
  marca: string;
  pesobruto: string;
  pesoneto: string;
  volumen: string;
  id_clase: number;
  clase: string;
  manifiesto: number;
  precio: string;
  cartaporte: number;
  detalleCP: number;
}
