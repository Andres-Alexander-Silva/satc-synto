import { PageHeader } from "@/components";
import { TableClase, ModalClase } from "@/features/registro/clase/components";

const Clase = () => {
  return (
    <div>
      <PageHeader currentpage="Clase" activepage="Registro" mainpage="Clase" />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-clase"
        >
          Agregar clase
        </button>
        <ModalClase />
        <div className="mt-5">
          <TableClase />
        </div>
      </div>
    </div>
  );
};

export default Clase;
