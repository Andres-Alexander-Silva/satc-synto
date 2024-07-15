export interface Usuarios {
  id: number;
  username: string;
  estado: boolean;
  datospersonales: DatosPersonales;
  rol: Rol;
  empresa: Empresa;
  ultima_sesion: string;
}

export interface Generos {
  id: number;
  sigla: string;
  nombre: string;
}

interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  estado: number;
}

interface Empresa {
  correo_electronico: string;
  direccion: string;
  estado: boolean;
  id: number;
  identificacion: string;
  imagen_logo: string;
  razon_social: string;
  telefono: string;
}

interface DatosPersonales {
  id: number;
  tipoDocumento: number;
  genero: number;
  noDocumento: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  direccion: string;
  email: string;
  telefono: string;
}

export interface UsuariosForm {
  type_document: TipoDocumento;
  num_document: string;
  name: string;
  lastname: string;
  birthdate: string;
  address: string;
  email: string;
  username: string;
  password: string;
  gender: Genero;
  rol: Rol;
  state: boolean;
  empresa: Empresa;
}

interface TipoDocumento {
  value: number;
  label: string;
}

interface Genero {
  value: number;
  label: string;
}

interface Empresa {
  value: number;
  label: string;
}

interface Rol {
  value: number;
  label: string;
}
