import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { useModalUsuarios } from "@/features/configuracion/usuarios/hooks";
import { Loader } from "@/components";
import Select from "react-select";

const ModalUsuarios = () => {
  const {
    currentUsuarios,
    handleClose,
    loading,
    methodsUsuarios,
    onSubmit,
    roles,
    generos,
    tipoDocumento,
    empresas,
    handleFileInputChange,
  } = useModalUsuarios();

  const currentDate = format(new Date(), "yyyy-MM-dd");

  const formatTipoDocumento = tipoDocumento.map((item) => ({
    value: item.id,
    label: item.descripcion,
  }));

  const formatRoles = roles.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));

  const formatGeneros = generos.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));

  const formatEmpresas = empresas.map((item) => ({
    value: item.id,
    label: item.razon_social,
  }));

  return (
    <div
      id="hs-focus-management-modal-usuario"
      className="hs-overlay hidden ti-modal"
    >
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out md:!max-w-2xl md:w-full m-3 md:mx-auto">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h3 className="ti-modal-title">
              {currentUsuarios.id ? "Editar" : "Agregar"} usuario
            </h3>
            <button
              type="button"
              className="hs-dropdown-toggle ti-modal-close-btn"
              data-hs-overlay="#hs-focus-management-modal-usuario"
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
          <form onSubmit={methodsUsuarios.handleSubmit(onSubmit)}>
            <div className="ti-modal-body grid grid-cols-2 gap-2">
              <Controller
                name="type_document"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.type_document
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Tipo de documento
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatTipoDocumento}
                      placeholder="Seleccione un tipo de documento"
                    />
                    {methodsUsuarios.formState.errors.type_document ? (
                      methodsUsuarios.formState.errors.type_document.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="num_document"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.num_document
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Número de documento
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.num_document
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Ingrese el número de documento"
                      autoFocus
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.num_document ? (
                      methodsUsuarios.formState.errors.num_document.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="name"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.name
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Nombres
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.name
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Ingrese los nombres"
                      autoFocus
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.name ? (
                      methodsUsuarios.formState.errors.name.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="lastname"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.lastname
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Apellidos
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.lastname
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Ingrese los apellidos"
                      autoFocus
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.lastname ? (
                      methodsUsuarios.formState.errors.lastname.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="phone"
                control={methodsUsuarios.control}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label className={`block text-sm mb-2 dark:text-white `}>
                      Teléfono
                    </label>
                    <input
                      type="number"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      placeholder="Ingrese el teléfono"
                      autoFocus
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="birthdate"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.birthdate
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      max={currentDate}
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.birthdate
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      autoFocus
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.birthdate ? (
                      methodsUsuarios.formState.errors.birthdate.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="address"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.address
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.address
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      autoFocus
                      placeholder="Ingrese la dirección"
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.address ? (
                      methodsUsuarios.formState.errors.address.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="email"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.email
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.email
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      autoFocus
                      placeholder="Ingrese el correo electrónico"
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.email ? (
                      methodsUsuarios.formState.errors.email.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              {currentUsuarios.id ? null : (
                <Controller
                  name="password"
                  control={methodsUsuarios.control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="mt-2">
                      <label
                        className={`block text-sm mb-2 dark:text-white ${
                          methodsUsuarios.formState.errors.password
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                          methodsUsuarios.formState.errors.password
                            ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                            : ""
                        }`}
                        autoFocus
                        placeholder="Ingrese la contraseña"
                        {...field}
                      />
                      {methodsUsuarios.formState.errors.password ? (
                        methodsUsuarios.formState.errors.password.type ===
                        "required" ? (
                          <span className="text-xs text-red-500">
                            Campo requerido
                          </span>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                />
              )}
              <Controller
                name="username"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.username
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsUsuarios.formState.errors.username
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      autoFocus
                      placeholder="Ingrese el nombre de usuario"
                      {...field}
                    />
                    {methodsUsuarios.formState.errors.username ? (
                      methodsUsuarios.formState.errors.username.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="rol"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.rol
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Rol
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatRoles}
                      placeholder="Seleccione un rol"
                    />
                    {methodsUsuarios.formState.errors.rol ? (
                      methodsUsuarios.formState.errors.rol.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="gender"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.gender
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Género
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatGeneros}
                      placeholder="Seleccione un género"
                    />
                    {methodsUsuarios.formState.errors.gender ? (
                      methodsUsuarios.formState.errors.gender.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <Controller
                name="empresa"
                control={methodsUsuarios.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsUsuarios.formState.errors.empresa
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Empresa
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatEmpresas}
                      placeholder="Seleccione una empresa"
                    />
                    {methodsUsuarios.formState.errors.empresa ? (
                      methodsUsuarios.formState.errors.empresa.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
              <div>
                <label
                  htmlFor="file-input"
                  className="block text-sm mb-2 dark:text-white"
                >
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
                data-hs-overlay="#hs-focus-management-modal-usuario"
                onClick={handleClose}
              >
                Cerrar
              </button>
              <button type="submit" className="ti-btn ti-btn-primary">
                {loading ? (
                  <Loader />
                ) : currentUsuarios.id ? (
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

export default ModalUsuarios;
