export interface TipoDocumento {
  id: number;
  sigla: string;
  descripcion: string;
  estado: boolean;
}

export interface TipoDocumentoForm {
  sigla: string;
  descripcion: string;
}
