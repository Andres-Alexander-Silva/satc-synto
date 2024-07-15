export interface NuevoManifiesto {
  naturaleza: string;
  especificar: string;
  numeroicontenedores: string;
  numeroprecinto: string;
  preciomercancia: string;
  monedamercancia: string;
  observacionaduana: string;
  anulado: string;
  cartaporte: string;
  fecha_emision: string;
  trailer: SelectValue;
  remolque: SelectValue;
  conductorprincipal: SelectValue;
  conductorauxiliar: SelectValue;
  aduanacrucefrontera: SelectValue;
  aduanadestino: SelectValue;
  lugarcarga: SelectValue;
  lugardescarga: SelectValue;
  remitente: string;
  destinatario: string;
  cantidad: string;
  pesoneto: number;
  pesobruto: number;
  puntoaduanafrontera: SelectValue;
  puntoaduanadestino: SelectValue;
}

interface SelectValue {
  value: number;
  label: string;
}