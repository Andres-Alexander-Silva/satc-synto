import { PageHeader } from "@/components";
import { TableListadoManifiesto } from "@/features/manifiesto/listado/components";

const ListadoManifiestos = () => {
  return (
    <div>
      <PageHeader
        currentpage="Listado manifiesto"
        activepage="Cartaporte"
        mainpage="Listado"
      />
      <div>
        <div className="mt-5">
          <TableListadoManifiesto />
        </div>
      </div>
    </div>
  );
};

export default ListadoManifiestos;
