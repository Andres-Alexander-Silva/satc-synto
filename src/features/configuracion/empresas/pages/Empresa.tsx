import { PageHeader } from "@/components";
import {
  TableEmpresa,
  ModalEmpresa,
} from "@/features/configuracion/empresas/components";

const Empresa = () => {
  return (
    <div>
      <PageHeader
        currentpage="Empresa"
        activepage="Configuracion"
        mainpage="Empresa"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-empresa"
        >
          Agregar empresa
        </button>
        <ModalEmpresa />
        <div className="mt-5">
          <TableEmpresa />
        </div>
      </div>
    </div>
  );
};

export default Empresa;
