import { useContext, useEffect } from "react";
import { UsuariosContext } from "@/features/configuracion/usuarios/context/UsuariosContext";
import { TipoDocumentoContext } from "@/features/configuracion/tipo_documentos/context/TipoDocumentoContext";
import { RolesContext } from "@/features/sistema/roles/context/RolesContext";
import { UsuariosForm } from "@/features/configuracion/usuarios/interfaces/usuarios.interface";
import { EmpresaContext } from "@/features/configuracion/empresas/context/EmpresaContext";

const useModalUsuarios = () => {
  const {
    loading,
    handleClose,
    methodsUsuarios,
    createUsuarios,
    updateUsuarios,
    currentUsuarios,
    generos,
  } = useContext(UsuariosContext);
  const { tipoDocumento } = useContext(TipoDocumentoContext);
  const { roles } = useContext(RolesContext);
  const { empresas } = useContext(EmpresaContext);

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

  const onSubmit = (data: UsuariosForm) => {
    const localStorageFile = localStorage.getItem("file");
    const formatData = {
      ...data,
      type_document: data.type_document.value,
      rol: data.rol.value,
      gender: data.gender.value,
      empresa: data.empresa.value,
      imagen_logo: typeof localStorageFile === "string" ? localStorageFile : "",
    };
    if (currentUsuarios.id) {
      console.log(formatData);
      updateUsuarios(currentUsuarios.id, formatData as any);
    } else {
      createUsuarios(formatData as any);
    }
  };

  const findTipoDocumento = (id: number) => {
    return tipoDocumento.find((item) => item.id === id);
  };

  const findRol = (id: number) => {
    return roles.find((item) => item.id === id);
  };

  const findGenero = (id: number) => {
    return generos.find((item) => item.id === id);
  };

  const findEmpresa = (id: number) => {
    return empresas.find((item) => item.id === id);
  };

  useEffect(() => {
    if (currentUsuarios.id) {
      const tipoDocumento = findTipoDocumento(
        currentUsuarios.datospersonales.tipoDocumento
      );
      if (tipoDocumento) {
        methodsUsuarios.setValue("type_document", {
          value: tipoDocumento.id,
          label: tipoDocumento.descripcion,
        });
      }
      methodsUsuarios.setValue(
        "num_document",
        currentUsuarios.datospersonales.noDocumento
      );
      methodsUsuarios.setValue("name", currentUsuarios.datospersonales.nombres);
      methodsUsuarios.setValue(
        "birthdate",
        new Date(currentUsuarios.datospersonales.fecha_nacimiento)
          .toISOString()
          .slice(0, 10)
      );
      methodsUsuarios.setValue(
        "address",
        currentUsuarios.datospersonales.direccion
      );
      methodsUsuarios.setValue("email", currentUsuarios.datospersonales.email);
      methodsUsuarios.setValue(
        "lastname",
        currentUsuarios.datospersonales.apellidos
      );
      methodsUsuarios.setValue("username", currentUsuarios.username);
      const rol = findRol(currentUsuarios.rol.id);
      if (rol) {
        methodsUsuarios.setValue("rol", {
          value: rol.id,
          label: rol.nombre,
        });
      }
      const genero = findGenero(currentUsuarios.datospersonales.genero);
      if (genero) {
        methodsUsuarios.setValue("gender", {
          value: genero.id,
          label: genero.nombre,
        });
      }
      const empresa = findEmpresa(currentUsuarios.empresa?.id);
      if (empresa) {
        methodsUsuarios.setValue("empresa", {
          value: empresa.id,
          label: empresa.razon_social,
        });
      }
      methodsUsuarios.setValue(
        "phone",
        currentUsuarios.datospersonales.telefono
      );
    } else {
      methodsUsuarios.setValue("type_document", "");
      methodsUsuarios.setValue("num_document", "");
      methodsUsuarios.setValue("name", "");
      methodsUsuarios.setValue("birthdate", "");
      methodsUsuarios.setValue("address", "");
      methodsUsuarios.setValue("email", "");
      methodsUsuarios.setValue("lastname", "");
      methodsUsuarios.setValue("username", "");
      methodsUsuarios.setValue("rol", "");
      methodsUsuarios.setValue("gender", "");
      methodsUsuarios.setValue("empresa", "");
    }
  }, [currentUsuarios]);

  return {
    loading,
    open,
    handleClose,
    methodsUsuarios,
    onSubmit,
    currentUsuarios,
    tipoDocumento,
    roles,
    generos,
    empresas,
    handleFileInputChange,
  };
};

export default useModalUsuarios;
