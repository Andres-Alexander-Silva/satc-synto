import { PageHeader } from "@/components";
import {
  TableUsuarios,
  ModalUsuarios,
} from "@/features/configuracion/usuarios/components";

const Usuarios = () => {
  return (
    <div>
      <PageHeader
        currentpage="Usuarios"
        activepage="Configuracion"
        mainpage="Usuarios"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-usuario"
        >
          Agregar usuario
        </button>
        <ModalUsuarios />
        <div className="mt-5">
          <TableUsuarios />
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
