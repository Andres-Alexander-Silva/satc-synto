import { PageHeader } from "@/components";
import { SteperNuevoManifiesto } from "@/features/manifiesto/nuevo/components";

const NuevoManifiesto = () => {
  return (
    <div>
      <PageHeader
        currentpage="Nueva manifiesto"
        activepage="Manifiesto"
        mainpage="Nueva"
      />
      <div>
        <div className="mt-5">
          <SteperNuevoManifiesto />
        </div>
      </div>
    </div>
  );
};

export default NuevoManifiesto;
