export interface Vehiculos {
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

export interface VehiculosForm {
  placa: string;
  marca: Marca;
  pais: Pais;
  tipo_vehiculo: TipoVehiculo;
  modelo: number;
  numchasis: string;
  numerohabilitacion: string;
  estado: number | boolean;
}

interface Marca {
  value: number;
  label: string;
}

interface Pais {
  value: number;
  label: string;
}

interface TipoVehiculo {
  value: number;
  label: string;
}
