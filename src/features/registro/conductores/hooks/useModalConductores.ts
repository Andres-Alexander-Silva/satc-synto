import { useContext, useEffect } from "react";
import { ConductoresContext } from "@/features/registro/conductores/context/ConductoresContext";
import { ConductoresForm } from "@/features/registro/conductores/interfaces/conductores.interface";
import { TipoDocumentoContext } from "@/features/configuracion/tipo_documentos/context/TipoDocumentoContext";

const useModalConductores = () => {
  const {
    loading,
    handleClose,
    createConductores,
    updateConductores,
    methodsConductores,
    currentConductores,
    findDocumentoConductor,
  } = useContext(ConductoresContext);

  const { tipoDocumento } = useContext(TipoDocumentoContext);

  const onSubmit = (data: ConductoresForm) => {
    const formatData = {
      ...data,
      tipo_documento: data.tipo_documento.value,
    };
    if (currentConductores.id) {
      updateConductores(currentConductores.id, formatData as any);
    } else {
      createConductores(formatData as any);
    }
  };

  const filteredTipoDocumento = tipoDocumento.filter(
    (item) => item.id !== 17 && item.id !== 18
  );

  const findTipoDocumento = (id: number) => {
    return tipoDocumento.find((item) => item.id === id);
  };

  useEffect(() => {
    if (currentConductores.id) {
      const tipoDocumento = findTipoDocumento(
        currentConductores.id_tipo_documento
      );
      if (tipoDocumento) {
        methodsConductores.setValue("tipo_documento", {
          value: tipoDocumento.id,
          label: tipoDocumento.descripcion,
        });
      }
      methodsConductores.setValue(
        "numero_documento",
        currentConductores.numero_documento
      );
      methodsConductores.setValue("nombre", currentConductores.nombre);
      methodsConductores.setValue("apellido", currentConductores.apellido);
      methodsConductores.setValue(
        "nacionalidad",
        currentConductores.nacionalidad
      );
      methodsConductores.setValue("celular", currentConductores.celular);
      methodsConductores.setValue("libreta", currentConductores.libreta);
      methodsConductores.setValue("licencia", currentConductores.licencia);
    } else {
      methodsConductores.setValue("tipo_documento", "");
      methodsConductores.setValue("numero_documento", "");
      methodsConductores.setValue("nombre", "");
      methodsConductores.setValue("apellido", "");
      methodsConductores.setValue("nacionalidad", "");
      methodsConductores.setValue("celular", "");
      methodsConductores.setValue("libreta", "");
      methodsConductores.setValue("licencia", "");
    }
  }, [currentConductores]);

  return {
    loading,
    open,
    handleClose,
    onSubmit,
    methodsConductores,
    currentConductores,
    tipoDocumento: filteredTipoDocumento,
    findDocumentoConductor,
  };
};

export default useModalConductores;
