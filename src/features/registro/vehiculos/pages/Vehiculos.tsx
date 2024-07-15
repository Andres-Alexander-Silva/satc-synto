import { PageHeader } from "@/components";
import {
  TableVehiculos,
  ModalVehiculos,
} from "@/features/registro/vehiculos/components";

const Vehiculos = () => {
  return (
    <div>
      <PageHeader
        currentpage="Vehiculos"
        activepage="Registro"
        mainpage="Vehiculos"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-vehiculo"
        >
          Agregar vehiculo
        </button>
        <ModalVehiculos />
        <div className="mt-5">
          <TableVehiculos />
        </div>
      </div>
    </div>
  );
};

export default Vehiculos;
