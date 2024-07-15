import { PageHeader } from "@/components";
import { TableListadoCartaporte } from "@/features/carta_porte/listado/components";

const Listado = () => {
  return (
    <div>
      <PageHeader currentpage="Listado cartaporte" activepage="Cartaporte" mainpage="Listado" />
      <div>
        <div className="mt-5">
          <TableListadoCartaporte />
        </div>
      </div>
    </div>
  );
};

export default Listado;
