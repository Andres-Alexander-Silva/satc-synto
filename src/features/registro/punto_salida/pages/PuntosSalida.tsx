import { PageHeader } from "@/components";
import {
  ModalPuntoSalida,
  TablePuntoSalida,
} from "@/features/registro/punto_salida/components";

const PuntosSalida = () => {

  return (
    <div>
      <PageHeader
        currentpage="Punto de salida"
        activepage="Registro"
        mainpage="Punto de salida"
      />
      <div>
        <button
          type="button"
          className="hs-dropdown-toggle ti-btn ti-btn-primary"
          data-hs-overlay="#hs-focus-management-modal-punto-salida"
        >
          Agregar punto de salida
        </button>
        <ModalPuntoSalida />
        <div className="mt-5">
          <TablePuntoSalida />
        </div>
      </div>
    </div>
  );
};

export default PuntosSalida;
