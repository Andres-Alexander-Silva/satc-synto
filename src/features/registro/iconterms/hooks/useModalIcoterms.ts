import { useContext, useEffect } from "react";
import { IcotermsContext } from "@/features/registro/iconterms/context/IcotermsContext";
import { IcotermsForm } from "@/features/registro/iconterms/interfaces/icoterms.interface";

const useModalIcoterms = () => {
  const {
    loading,
    currentIcoterms,
    createIcoterms,
    updateIcoterm,
    methodsIcoterms,
    handleClose
  } = useContext(IcotermsContext);

  const onSubmit = (data: IcotermsForm) => {
    if (currentIcoterms.id) {
      updateIcoterm(currentIcoterms.id, data);
    } else {
      createIcoterms(data);
    }
  };

  useEffect(() => {
    if (currentIcoterms.id) {
      methodsIcoterms.setValue("codigo", currentIcoterms.codigo);
      methodsIcoterms.setValue("descripcion", currentIcoterms.descripcion);
    } else {
      methodsIcoterms.setValue("codigo", "");
      methodsIcoterms.setValue("descripcion", "");
    }
  }, [currentIcoterms]);

  return {
    loading,
    onSubmit,
    methodsIcoterms,
    currentIcoterms,
    handleClose
  }
};

export default useModalIcoterms;
