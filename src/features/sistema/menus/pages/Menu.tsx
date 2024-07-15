import { PageHeader } from "@/components";
import { TableMenu, ModalMenu } from "@/features/sistema/menus/components";

const Menu = () => {
  return (
    <div>
      <PageHeader
        currentpage="Menu"
        activepage="Sistema"
        mainpage="Menu"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-menu"
        >
          Agregar menu
        </button>
        <ModalMenu />
        <div className="mt-5">
          <TableMenu />
        </div>
      </div>
    </div>
  );
};

export default Menu;
