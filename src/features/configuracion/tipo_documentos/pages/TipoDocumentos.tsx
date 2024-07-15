import { PageHeader } from "@/components";
import {
  TableTipoDocumento,
  ModalTipoDocumento,
} from "@/features/configuracion/tipo_documentos/components";

const TipoDocumentos = () => {
  return (
    <div>
      <PageHeader
        currentpage="Tipo de Documentos"
        activepage="Configuracion"
        mainpage="Tipo de Documentos"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-tipo-documento"
        >
          Agregar tipo de documento
        </button>
        <ModalTipoDocumento />
        <div className="mt-5">
          <TableTipoDocumento />
        </div>
      </div>
    </div>
  );
};

export default TipoDocumentos;
