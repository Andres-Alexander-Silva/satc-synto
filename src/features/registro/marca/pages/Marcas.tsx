import { PageHeader } from "@/components";
import { TableMarcas, ModalMarcas } from "@/features/registro/marca/components";

const Marcas = () => {
  return (
    <div>
      <PageHeader currentpage="Marca" activepage="Registro" mainpage="Marca" />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-marca"
        >
          Agregar marca
        </button>
        <ModalMarcas />
        <div className="mt-5">
          <TableMarcas />
        </div>
      </div>
    </div>
  );
};

export default Marcas;
