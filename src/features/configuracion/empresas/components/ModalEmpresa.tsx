import { Controller } from "react-hook-form";
import { useModalEmpresa } from "@/features/configuracion/empresas/hooks";
import { Loader } from "@/components";

const ModalEmpresa = () => {
  const {
    currentEmpresa,
    handleClose,
    loading,
    methodsEmpresa,
    onSubmit,
    handleFileInputChange,
  } = useModalEmpresa();

  return (
    <div
      id="hs-focus-management-modal-empresa"
      className="hs-overlay hidden ti-modal"
    >
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h3 className="ti-modal-title">
              {currentEmpresa.id ? "Editar" : "Agregar"} empresa
            </h3>
            <button
              type="button"
              className="hs-dropdown-toggle ti-modal-close-btn"
              data-hs-overlay="#hs-focus-management-modal-empresa"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3.5 h-3.5"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={methodsEmpresa.handleSubmit(onSubmit)}>
            <div className="ti-modal-body grid grid-cols-2 gap-2">
              <Controller
                name="identificacion"
                control={methodsEmpresa.control}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  validate: (value) => /^\d+$/.test(value),
                  maxLength: 20,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.identificacion
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Identificacion
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.identificacion
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Identificacion"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.identificacion ? (
                      methodsEmpresa.formState.errors.identificacion.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsEmpresa.formState.errors.identificacion
                          .type === "pattern" ? (
                        <span className="text-xs text-red-500">
                          Solo numeros
                        </span>
                      ) : methodsEmpresa.formState.errors.identificacion
                          .type === "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Maximo 20 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="digito_verificacion"
                control={methodsEmpresa.control}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  validate: (value) => /^\d+$/.test(value),
                  maxLength: 1,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.digito_verificacion
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Digito verificacion
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.digito_verificacion
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Digito verificacion"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.digito_verificacion ? (
                      methodsEmpresa.formState.errors.digito_verificacion
                        .type === "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsEmpresa.formState.errors.digito_verificacion
                          .type === "pattern" ? (
                        <span className="text-xs text-red-500">
                          Solo numeros
                        </span>
                      ) : methodsEmpresa.formState.errors.digito_verificacion
                          .type === "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Maximo 1 caracter
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="razon_social"
                control={methodsEmpresa.control}
                rules={{
                  required: true,
                  maxLength: 250,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.razon_social
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Razon social
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.razon_social
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Razon social"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.razon_social ? (
                      methodsEmpresa.formState.errors.razon_social.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsEmpresa.formState.errors.razon_social.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Maximo 250 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="direccion"
                control={methodsEmpresa.control}
                rules={{
                  required: true,
                  maxLength: 250,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.direccion
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Direccion
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.direccion
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Direccion"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.direccion ? (
                      methodsEmpresa.formState.errors.direccion.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsEmpresa.formState.errors.direccion.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Maximo 250 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="telefono"
                control={methodsEmpresa.control}
                rules={{
                  required: true,
                  maxLength: 250,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.telefono
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Telefono
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.telefono
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Telefono"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.telefono ? (
                      methodsEmpresa.formState.errors.telefono.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsEmpresa.formState.errors.telefono.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Maximo 250 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="correo_electronico"
                control={methodsEmpresa.control}
                rules={{
                  required: true,
                  maxLength: 250,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.correo_electronico
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Correo electronico
                    </label>
                    <input
                      type="email"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.correo_electronico
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Correo electronico"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.correo_electronico ? (
                      methodsEmpresa.formState.errors.correo_electronico
                        .type === "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsEmpresa.formState.errors.telefono.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Maximo 250 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="codigoci"
                control={methodsEmpresa.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.codigoci
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Certificado de idoneidad de servicios
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.codigoci
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Certificado de idoneidad de servicios"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.codigoci ? (
                      methodsEmpresa.formState.errors.codigoci.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="codigoctic"
                control={methodsEmpresa.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.codigoctic
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Codigo CTIC
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.codigoctic
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Codigo CTIC"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.codigoctic ? (
                      methodsEmpresa.formState.errors.codigoctic.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="codigopps"
                control={methodsEmpresa.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.codigopps
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Permiso de presentacion de servicios
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.codigopps
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Permiso de presentacion de servicios"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.codigopps ? (
                      methodsEmpresa.formState.errors.codigopps.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="tipo_moneda"
                control={methodsEmpresa.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.tipo_moneda
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Tipo moneda
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.tipo_moneda
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Tipo moneda"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.tipo_moneda ? (
                      methodsEmpresa.formState.errors.tipo_moneda.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="numCopias"
                control={methodsEmpresa.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.numCopias
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Numero de copias
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.numCopias
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Numero de copias"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.numCopias ? (
                      methodsEmpresa.formState.errors.numCopias.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="prefijo"
                control={methodsEmpresa.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsEmpresa.formState.errors.prefijo
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Prefijo
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsEmpresa.formState.errors.prefijo
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Prefijo"
                      autoFocus
                      {...field}
                    />
                    {methodsEmpresa.formState.errors?.prefijo ? (
                      methodsEmpresa.formState.errors.prefijo.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <div>
                <label htmlFor="file-input" className="block text-sm mb-2 dark:text-white">
                  Logo
                </label>
                <input
                  type="file"
                  accept="image/png"
                  onChange={(e) => {
                    const selectedFile = e.target.files && e.target.files[0];
                    handleFileInputChange(selectedFile);
                  }}
                  id="file-input"
                  className="block w-full border border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                />
              </div>
            </div>
            <div className="ti-modal-footer">
              <button
                type="button"
                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                data-hs-overlay="#hs-focus-management-modal-empresa"
                onClick={handleClose}
              >
                Cerrar
              </button>
              <button type="submit" className="ti-btn ti-btn-primary">
                {loading ? (
                  <Loader />
                ) : currentEmpresa.id ? (
                  "Actualizar"
                ) : (
                  "Crear"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEmpresa;
