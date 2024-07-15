import { useContext, useEffect } from "react";
import { EmpresaContext } from "@/features/configuracion/empresas/context/EmpresaContext";
import { EmpresaForm } from "@/features/configuracion/empresas/interfaces/empresas.interface";

const useModalEmpresa = () => {
  const {
    loading,
    handleClose,
    createEmpresas,
    updateEmpresas,
    methodsEmpresa,
    currentEmpresa,
  } = useContext(EmpresaContext);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      };
    });
  };

  const handleFileInputChange = (selectedFile: any) => {
    if (selectedFile) {
      getBase64(selectedFile)
        .then((result) => {
          localStorage.setItem("file", result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onSubmit = (data: EmpresaForm) => {
    const localStorageFile = localStorage.getItem("file");
    const formatData = {
      ...data,
      imagen_logo: typeof localStorageFile === "string" ? localStorageFile : "",
    };
    if (currentEmpresa.id) {
      const newFormatData = {
        ...formatData,
        imagen_logo: currentEmpresa.imagen_logo,
      };
      updateEmpresas(currentEmpresa.id, newFormatData);
    } else {
      createEmpresas(formatData);
    }
  };

  useEffect(() => {
    if (currentEmpresa.id) {
      methodsEmpresa.setValue("identificacion", currentEmpresa.identificacion);
      methodsEmpresa.setValue("razon_social", currentEmpresa.razon_social);
      methodsEmpresa.setValue("direccion", currentEmpresa.direccion);
      methodsEmpresa.setValue("telefono", currentEmpresa.telefono);
      methodsEmpresa.setValue(
        "correo_electronico",
        currentEmpresa.correo_electronico
      );
      methodsEmpresa.setValue(
        "digito_verificacion",
        currentEmpresa.digito_verificacion
      );
      methodsEmpresa.setValue("codigoci", currentEmpresa.codigoci);
      methodsEmpresa.setValue("codigoctic", currentEmpresa.codigoctic);
      methodsEmpresa.setValue("codigopps", currentEmpresa.codigopps);
      methodsEmpresa.setValue("tipo_moneda", currentEmpresa.tipo_moneda);
      methodsEmpresa.setValue("numCopias", currentEmpresa.numCopias)
      methodsEmpresa.setValue("prefijo", currentEmpresa.prefijo)
    } else {
      methodsEmpresa.setValue("identificacion", "");
      methodsEmpresa.setValue("razon_social", "");
      methodsEmpresa.setValue("direccion", "");
      methodsEmpresa.setValue("telefono", "");
      methodsEmpresa.setValue("correo_electronico", "");
      methodsEmpresa.setValue("digito_verificacion", "");
      methodsEmpresa.setValue("codigoci", "");
      methodsEmpresa.setValue("codigoctic", "");
      methodsEmpresa.setValue("codigopps", "");
      methodsEmpresa.setValue("tipo_moneda", "");
      methodsEmpresa.setValue("numCopias", "")
    }
  }, [currentEmpresa]);

  return {
    loading,
    handleClose,
    onSubmit,
    methodsEmpresa,
    currentEmpresa,
    handleFileInputChange,
  };
};

export default useModalEmpresa;
