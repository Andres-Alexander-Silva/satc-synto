import { useContext, useEffect } from "react";
import { DepartamentosContext } from "@/features/registro/departamentos/context/DepartamentosContext";
import { PaisContext } from "@/features/registro/paises/context/PaisContext";
import { DepartamentosForm } from "@/features/registro/departamentos/interfaces/departamentos.interfaces";

const useModalDepartamentos = () => {
  const {
    loading,
    handleClose,
    methodsDepartamentos,
    createDepartamentos,
    updateDepartamentos,
    currentDepartamentos,
  } = useContext(DepartamentosContext);
  const { paises } = useContext(PaisContext);

  const onSubmit = (data: DepartamentosForm) => {
    const formatData = {
      ...data,
      pais: data.pais.value,
    }
    if (currentDepartamentos.id) {
      updateDepartamentos(currentDepartamentos.id, formatData as any);
    } else {
      createDepartamentos(formatData as any);
    }
  };

  const findPais = (id: number) => {
    return paises.find((pais) => pais.id === id);
  };

  useEffect(() => {
    if (currentDepartamentos.id) {
      methodsDepartamentos.setValue("codigo", currentDepartamentos.codigo);
      methodsDepartamentos.setValue("nombre", currentDepartamentos.nombre);
      const pais = findPais(currentDepartamentos.id_pais);
      if (pais) {
        methodsDepartamentos.setValue("pais", {
          value: pais.id,
          label: pais.nombre,
        });
      }
    } else {
      methodsDepartamentos.setValue("codigo", "");
      methodsDepartamentos.setValue("nombre", "");
      methodsDepartamentos.setValue("pais", "");
    }
  }, [currentDepartamentos]);

  return {
    loading,
    handleClose,
    methodsDepartamentos,
    onSubmit,
    currentDepartamentos,
    paises,
  };
};

export default useModalDepartamentos;
