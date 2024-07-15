import { PageHeader } from "@/components";
import {
  TableTerceros,
  ModalTerceros,
} from "@/features/registro/terceros/components";

const Terceros = () => {
  return (
    <div>
      <PageHeader
        currentpage="Terceros"
        activepage="Registro"
        mainpage="Terceros"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-tercero"
        >
          Agregar tercero
        </button>
        <ModalTerceros />
        <div className="mt-5">
          <TableTerceros />
        </div>
      </div>
    </div>
  );
};

export default Terceros;
