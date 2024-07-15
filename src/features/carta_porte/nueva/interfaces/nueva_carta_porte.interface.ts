export interface NuevaCartaPorteForm {
  fecharecibido: string;
  fechaembarque: string;
  fechadeentrega: string;
  condiciones_transporte_pago: string;
  pesoneto: string;
  pesobruto: string;
  volumen: string;
  otras_unidades: string;
  preciomercancia: string;
  moneda_mercancia: string;
  valorfleteremitente: number;
  valorseguroremitente: number;
  valorotrogastosremitente: number;
  valortotalremitente: number;
  modendafleteremitente: string;
  monedaseguroremitente: string;
  monedaotrosgastosremitente: string;
  monedatotalremitete: string;
  valorfletedestinatario: number;
  valorsegurodestinatario: number;
  valorotrosgastosdestinatario: number;
  valortotaldestinatari: number;
  monedafletedestinatario: string;
  monedasegurodestinatario: string;
  monedaotrosgastosdestinatario: string;
  monedatotaldestinatario: string;
  documentosrecibidos: string;
  fechaemision: string;
  instrucciones_transportista: string;
  observacionestransportista: string;
  remitente: Remitente;
  destinatario: Destinatario;
  consignatario: Consignatario;
  agencia: Agencia;
  notificara: Notificara;
  terminosincoterms: Terminosincoterms;
  lugarembarque: Lugarembarque;
  lugaremision: Lugaremision;
  lugarentrega: Lugarentrega;
  lugarrecibio: Lugarrecibio;
  municipioIcoterm: MunicipioIcoterm;
  detalleCartaPorte: DetalleCartaPorte[];
}

interface CuerpoCartaporte {
  fecha_recibido: string;
  fecha_embarque: string;
  fecha_de_entrega: string;
  condiciones_transporte_pago: string;
  pesoneto: number;
  pesobruto: number;
  volumen: string;
  otras_unidades: string;
  preciomercancia: number;
  moneda_mercancia: string;
  valorfleteremitente: number;
  valorseguroremitente: number;
  valorotrogastosremitente: number;
  valortotalremitente: string;
  modendafleteremitente: string;
  monedaseguroremitente: string;
  monedaotrosgastosremitente: string;
  monedatotalremitete: string;
  valorfletedestinatario: number;
  valorsegurodestinatario: number;
  valorotrosgastosdestinatario: number;
  valortotaldestinatari: number;
  monedafletedestinatario: string;
  monedasegurodestinatario: string;
  monedaotrosgastosdestinatario: string;
  monedatotaldestinatario: string;
  documentosrecibidos: string;
  fecha_emision: string;
  instrucciones_transportista: string;
  observacionestransportista: string;
  remitente: Remitente;
  destinatario: Destinatario;
  consignatario: Consignatario;
  notificara: Notificara;
  agencia: Agencia;
  terminosincoterms: string;
  lugarembarque: string;
  lugaremision: string;
  lugarentrega: string;
  lugarrecibio: string;
}

interface Remitente {
  value: number;
  label: string;
}

interface Destinatario {
  value: number;
  label: string;
}

interface Agencia {
  value: number;
  label: string;
}

interface Consignatario {
  value: number;
  label: string;
}

interface Notificara {
  value: number;
  label: string;
}

interface Terminosincoterms {
  value: number;
  label: string;
}

interface Lugarembarque {
  value: number;
  label: string;
}

interface Lugaremision {
  value: number;
  label: string;
}

interface Lugarentrega {
  value: number;
  label: string;
}

interface Lugarrecibio {
  value: number;
  label: string;
}

interface MunicipioIcoterm {
  value: number;
  label: string;
}

interface DetalleCartaPorte {
  marca: string;
  cantidad: string;
  descripcion: string;
  id_clase: string;
}

export interface CurrentCartaporte {
  cartaporte: CuerpoCartaporte;
  detalleCartaPorte: DetalleCartaPorte[];
}
