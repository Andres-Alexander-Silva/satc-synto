import { PageHeader } from "@/components";
import {
  TableIcoterms,
  ModalIcoterms,
} from "@/features/registro/iconterms/components";

const Icoterms = () => {
  return (
    <div>
      <PageHeader
        currentpage="Iconterms"
        activepage="Registro"
        mainpage="Iconterms"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-iconterm"
        >
          Agregar iconterms
        </button>
        <ModalIcoterms />
        <div className="mt-5">
          <TableIcoterms />
        </div>
      </div>
    </div>
  );
};

export default Icoterms;
