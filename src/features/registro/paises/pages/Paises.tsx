import { PageHeader } from "@/components";
import { ModalPais, TablePais } from "@/features/registro/paises/components";

const Paises = () => {
  return (
    <div>
      <PageHeader
        currentpage="Paises"
        activepage="Registro"
        mainpage="Paises"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-pais"
        >
          Agregar pais
        </button>
        <ModalPais />
        <div className="mt-5">
          <TablePais />
        </div>
      </div>
    </div>
  );
};

export default Paises;
