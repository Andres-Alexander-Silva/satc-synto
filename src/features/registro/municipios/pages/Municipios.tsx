import { PageHeader } from "@/components";
import {
  ModalMunicipios,
  TableMunicipios,
} from "@/features/registro/municipios/components";

const Municipios = () => {
  return (
    <div>
      <PageHeader
        currentpage="Municipios"
        activepage="Registro"
        mainpage="Municipios"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-mun"
        >
          Agregar municipio
        </button>
        <ModalMunicipios />
        <div className="mt-5">
          <TableMunicipios />
        </div>
      </div>
    </div>
  );
};

export default Municipios;
