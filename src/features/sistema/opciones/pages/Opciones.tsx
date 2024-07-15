import { PageHeader } from "@/components";
import {
  ModalOpcion,
  TableOpciones,
} from "@/features/sistema/opciones/components";

const Opciones = () => {
  return (
    <div>
      <PageHeader
        currentpage="Opciones"
        activepage="Sistema"
        mainpage="Opciones"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-opcion"
        >
          Agregar opcion
        </button>
        <ModalOpcion />
        <div className="mt-5">
          <TableOpciones />
        </div>
      </div>
    </div>
  );
};

export default Opciones;
