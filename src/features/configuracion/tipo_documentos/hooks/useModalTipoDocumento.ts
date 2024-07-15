import { useContext, useEffect } from "react";
import { TipoDocumentoContext } from "@/features/configuracion/tipo_documentos/context/TipoDocumentoContext";
import { TipoDocumentoForm } from "@/features/configuracion/tipo_documentos/interfaces/tipo_documento.interface";

const useModalTipoDocumento = () => {
  const {
    loading,
    handleClose,
    methodsTipoDocumento,
    createTipoDocumento,
    updateTipoDocumento,
    currentTipoDocumento,
  } = useContext(TipoDocumentoContext);

  const onSubmit = (data: TipoDocumentoForm) => {
    if (currentTipoDocumento.id) {
      updateTipoDocumento(currentTipoDocumento.id, data);
    } else {
      createTipoDocumento(data);
    }
  };

  useEffect(() => {
    if (currentTipoDocumento.id) {
      methodsTipoDocumento.setValue("sigla", currentTipoDocumento.sigla);
      methodsTipoDocumento.setValue(
        "descripcion",
        currentTipoDocumento.descripcion
      );
    } else {
      methodsTipoDocumento.setValue("sigla", "");
      methodsTipoDocumento.setValue("descripcion", "");
    }
  }, [currentTipoDocumento]);

  return {
    loading,
    open,
    handleClose,
    methodsTipoDocumento,
    onSubmit,
    currentTipoDocumento
  };
};

export default useModalTipoDocumento;
