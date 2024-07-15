import { Controller } from "react-hook-form";
import { useModalTerceros } from "@/features/registro/terceros/hooks";
import { Loader } from "@/components";
import Select from "react-select";

const ModalTerceros = () => {
  const {
    currentTerceros,
    handleClose,
    loading,
    methodsTerceros,
    municipios,
    onSubmit,
    tipoDocumento,
    handleNumeroIdentificacionBlur,
    paises,
    findDocumentoTercero,
  } = useModalTerceros();

  const formatTipoDocumento = tipoDocumento.map((item) => ({
    value: item.id,
    label: item.descripcion,
  }));

  const formatPaises = paises.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));

  const municipiosByDpto = municipios.filter(
    (mun) => mun.id_pais === methodsTerceros.watch("pais")?.value
  );

  const formatMunicipios = municipiosByDpto.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));

  const dataConsignatario = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const dataDestinatario = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const dataRemitente = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const dataNotificara = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  const dataAgencia = [
    {
      value: true,
      label: "Si",
    },
    {
      value: false,
      label: "No",
    },
  ];

  return (
    <div
      id="hs-focus-management-modal-tercero"
      className="hs-overlay hidden ti-modal"
    >
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out md:!max-w-2xl md:w-full m-3 md:mx-auto">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h3 className="ti-modal-title">
              {currentTerceros.id ? "Editar" : "Agregar"} tercero
            </h3>
            <button
              type="button"
              className="hs-dropdown-toggle ti-modal-close-btn"
              data-hs-overlay="#hs-focus-management-modal-tercero"
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
          <form onSubmit={methodsTerceros.handleSubmit(onSubmit)}>
            <div className="ti-modal-body grid grid-cols-2 gap-2">
              <Controller
                name="tipo_documento"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.tipo_documento
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
                    {methodsTerceros.formState.errors.tipo_documento ? (
                      methodsTerceros.formState.errors.tipo_documento.type ===
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
                name="numero_identificacion"
                control={methodsTerceros.control}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  validate: (value) => /^\d+$/.test(value),
                  maxLength: {
                    value:
                      methodsTerceros.watch("tipo_documento")?.value === 17
                        ? 9
                        : 10,
                    message: `
                    ${
                      methodsTerceros.watch("tipo_documento")?.value === 17
                        ? "Maximo 9 caracter"
                        : "Maximo 10 caracter"
                    }
                    `,
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.numero_identificacion
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Número de documento
                    </label>
                    <div className="flex items-center">
                      {methodsTerceros.watch("tipo_documento")?.value ===
                        17 && (
                        <span className="mr-2 rounded-sm text-sm border border-gray-200 py-2 px-3">
                          J
                        </span>
                      )}
                      <input
                        {...field}
                        type="text"
                        onBlur={(e) => {
                          methodsTerceros.trigger("numero_identificacion");
                          handleNumeroIdentificacionBlur();
                          const newValue =
                            methodsTerceros.watch("tipo_documento")?.value ===
                            17
                              ? "J" + e.target.value
                              : e.target.value;
                          findDocumentoTercero(newValue);
                        }}
                        defaultValue={
                          methodsTerceros.watch("tipo_documento")?.value === 17
                            ? ""
                            : ""
                        }
                        className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                          methodsTerceros.formState.errors.numero_identificacion
                            ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                            : ""
                        }`}
                        placeholder="Ingrese el número de documento"
                        autoFocus
                      />
                    </div>
                    {methodsTerceros.formState.errors?.numero_identificacion ? (
                      methodsTerceros.formState.errors.numero_identificacion
                        .type === "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsTerceros.formState.errors.numero_identificacion
                          .type === "pattern" ? (
                        <span className="text-xs text-red-500">
                          Solo números
                        </span>
                      ) : methodsTerceros.formState.errors.numero_identificacion
                          .type === "maxLength" ? (
                        <span className="text-xs text-red-500">
                          {methodsTerceros.watch("tipo_documento")?.value === 17
                            ? "Máximo 9 caracteres"
                            : "Máximo 10 caracteres"}
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="digito_verificacion"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.digito_verificacion
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Digito de verificación
                    </label>
                    <input
                      {...field}
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsTerceros.formState.errors.digito_verificacion
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      disabled
                      placeholder=""
                      autoFocus
                    />
                    {methodsTerceros.formState.errors.digito_verificacion ? (
                      methodsTerceros.formState.errors.digito_verificacion
                        .type === "required" ? (
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
                name="razon_social"
                control={methodsTerceros.control}
                rules={{
                  required: true,
                  maxLength: 250,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.razon_social
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Razon social
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsTerceros.formState.errors.razon_social
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Ingrese la razon social"
                      autoFocus
                      {...field}
                    />
                    {methodsTerceros.formState.errors.razon_social ? (
                      methodsTerceros.formState.errors.razon_social.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsTerceros.formState.errors.razon_social.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Máximo 250 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="direccion"
                control={methodsTerceros.control}
                rules={{
                  required: true,
                  maxLength: 255,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.direccion
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsTerceros.formState.errors.direccion
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Ingrese la dirección"
                      autoFocus
                      {...field}
                    />
                    {methodsTerceros.formState.errors.direccion ? (
                      methodsTerceros.formState.errors.direccion.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsTerceros.formState.errors.direccion.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Máximo 255 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="telefono"
                control={methodsTerceros.control}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  validate: (value) => /^\d+$/.test(value),
                  maxLength: 30,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.telefono
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Teléfono
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsTerceros.formState.errors.telefono
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Ingrese el teléfono"
                      autoFocus
                      {...field}
                    />
                    {methodsTerceros.formState.errors?.telefono ? (
                      methodsTerceros.formState.errors.telefono.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : methodsTerceros.formState.errors.telefono.type ===
                        "pattern" ? (
                        <span className="text-xs text-red-500">
                          Solo números
                        </span>
                      ) : methodsTerceros.formState.errors.telefono.type ===
                        "maxLength" ? (
                        <span className="text-xs text-red-500">
                          Máximo 30 caracteres
                        </span>
                      ) : null
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="pais"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.pais
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Pais
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Seleccione un pais"
                    />
                    {methodsTerceros.formState.errors.pais ? (
                      methodsTerceros.formState.errors.pais.type ===
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
                name="municipio"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.municipio
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Municipio
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatMunicipios}
                      placeholder="Seleccione un municipio"
                      isDisabled={municipiosByDpto.length === 0}
                    />
                    {methodsTerceros.formState.errors.municipio ? (
                      methodsTerceros.formState.errors.municipio.type ===
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
                name="consignatario"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.consignatario
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Consignatario
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={dataConsignatario}
                      placeholder="Consignatario"
                    />
                    {methodsTerceros.formState.errors.destinatario ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="destinatario"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.destinatario
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Destinatario
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={dataDestinatario}
                      placeholder="Destinatario"
                    />
                    {methodsTerceros.formState.errors.destinatario ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="remitente"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.remitente
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Remitente
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={dataRemitente}
                      placeholder="Remitente"
                    />
                    {methodsTerceros.formState.errors.remitente ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="notificara"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      htmlFor="notificara"
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.notificara
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Notificara
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={dataNotificara}
                      placeholder="Notificara"
                    />
                    {methodsTerceros.formState.errors.notificara ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="agencia"
                control={methodsTerceros.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="mt-2">
                    <label
                      htmlFor="agencia"
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsTerceros.formState.errors.agencia
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Agencia
                    </label>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={dataAgencia}
                      placeholder="Agencia"
                    />
                    {methodsTerceros.formState.errors.agencia ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
            </div>
            <div className="ti-modal-footer">
              <button
                type="button"
                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                data-hs-overlay="#hs-focus-management-modal-tercero"
                onClick={handleClose}
              >
                Cerrar
              </button>
              <button type="submit" className="ti-btn ti-btn-primary">
                {loading ? (
                  <Loader />
                ) : currentTerceros.id ? (
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

export default ModalTerceros;
