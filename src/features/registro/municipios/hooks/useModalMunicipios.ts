import { useContext, useEffect } from "react";
import { MunicipiosContext } from "@/features/registro/municipios/context/MunicipiosContext";
import { DepartamentosContext } from "@/features/registro/departamentos/context/DepartamentosContext";
import { MunicipiosForm } from "@/features/registro/municipios/interface/municipios.interface";

const useModalMunicipios = () => {
  const {
    loading,
    handleClose,
    createMunicipios,
    updateMunicipios,
    currentMunicipios,
    methodsMunicipios,
  } = useContext(MunicipiosContext);
  const { departamentos } = useContext(DepartamentosContext);

  const onSubmit = (data: MunicipiosForm) => {
    const formatData = {
      ...data,
      departamento: data.departamento.value,
    }
    if (currentMunicipios.id) {
      updateMunicipios(currentMunicipios.id, formatData as any);
    } else {
      createMunicipios(formatData as any);
    }
  };

  const findDepartamento = (id: number) => {
    return departamentos.find((departamento) => departamento.id === id);
  };

  useEffect(() => {
    if (currentMunicipios.id) {
      methodsMunicipios.setValue("codigo", currentMunicipios.codigo);
      methodsMunicipios.setValue("nombre", currentMunicipios.nombre);
      const departamento = findDepartamento(currentMunicipios.id_departamento);
      if (departamento) {
        methodsMunicipios.setValue("departamento", {
          value: departamento.id,
          label: departamento.nombre,
        });
      }
    } else {
      methodsMunicipios.setValue("codigo", "");
      methodsMunicipios.setValue("nombre", "");
      methodsMunicipios.setValue("pais", "");
    }
  }, [currentMunicipios]);

  return {
    loading,
    handleClose,
    methodsMunicipios,
    onSubmit,
    currentMunicipios,
    departamentos,
  };
};

export default useModalMunicipios;
