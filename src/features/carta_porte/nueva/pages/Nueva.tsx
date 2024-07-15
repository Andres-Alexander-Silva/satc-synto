import { PageHeader } from "@/components";
import { SteperNuevaCartaporte } from "@/features/carta_porte/nueva/components";

const Nueva = () => {
  return (
    <div>
      <PageHeader
        currentpage="Nueva cartaporte"
        activepage="Cartaporte"
        mainpage="Nueva"
      />
      <div>
        <div className="mt-5">
          <SteperNuevaCartaporte />
        </div>
      </div>
    </div>
  );
};

export default Nueva;
