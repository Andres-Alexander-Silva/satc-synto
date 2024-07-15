import { PageHeader } from "@/components";
import {
  TableConductores,
  ModalConductores,
} from "@/features/registro/conductores/components";

const Conductores = () => {
  return (
    <div>
      <PageHeader
        currentpage="Conductores"
        activepage="Registro"
        mainpage="Conductores"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-conductor"
        >
          Agregar conductor
        </button>
        <ModalConductores />
        <div className="mt-5">
          <TableConductores />
        </div>
      </div>
    </div>
  );
};

export default Conductores;
