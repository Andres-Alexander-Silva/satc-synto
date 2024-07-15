import { PageHeader } from "@/components";
import {
  ModalDepartamento,
  TableDepartamento,
} from "@/features/registro/departamentos/components";

const Departamentos = () => {
  return (
    <div>
      <PageHeader
        currentpage="Departamentos"
        activepage="Registro"
        mainpage="Departamentos"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-dpto"
        >
          Agregar departamento
        </button>
        <ModalDepartamento />
        <div className="mt-5">
          <TableDepartamento />
        </div>
      </div>
    </div>
  );
};

export default Departamentos;
