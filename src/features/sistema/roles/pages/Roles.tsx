import { PageHeader } from "@/components";
import {
  TableRoles,
  ModalRoles,
  ModalRolPermisos,
} from "@/features/sistema/roles/components";

const Roles = () => {
  return (
    <div>
      <PageHeader currentpage="Roles" activepage="Sistema" mainpage="Roles" />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-rol"
        >
          Agregar rol
        </button>
        <ModalRoles />
        <ModalRolPermisos />
        <div className="mt-5">
          <TableRoles />
        </div>
      </div>
    </div>
  );
};

export default Roles;
