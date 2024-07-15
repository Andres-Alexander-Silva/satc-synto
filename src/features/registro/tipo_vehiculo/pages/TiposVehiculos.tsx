import { PageHeader } from "@/components";
import {
  TableTipoVehiculos,
  ModalTipoVehiculos,
} from "@/features/registro/tipo_vehiculo/components";
const TiposVehiculos = () => {
  return (
    <div>
      <PageHeader
        currentpage="Tipo vehiculo"
        activepage="Registro"
        mainpage="Tipo vehiculo"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-tipo-vehiculo"
        >
          Agregar tipo vehiculo
        </button>
        <ModalTipoVehiculos />
        <div className="mt-5">
          <TableTipoVehiculos />
        </div>
      </div>
    </div>
  );
};

export default TiposVehiculos;
