import { Controller } from "react-hook-form";
import { Loader } from "@/components";
import { useModalPuntoSalida } from "@/features/registro/punto_salida/hooks";

const ModalPuntoSalida = () => {
  const {
    currentPuntoSalida,
    handleClose,
    loading,
    methodsPuntoSalida,
    onSubmit,
  } = useModalPuntoSalida();

  return (
    <div
      id="hs-focus-management-modal-punto-salida"
      className="hs-overlay hidden ti-modal"
    >
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out md:!max-w-2xl md:w-full m-3 md:mx-auto">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h3 className="ti-modal-title">
              {currentPuntoSalida.id ? "Editar" : "Agregar"} punto de salida
            </h3>
            <button
              type="button"
              className="hs-dropdown-toggle ti-modal-close-btn"
              data-hs-overlay="#hs-focus-management-modal-punto-salida"
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
          <form onSubmit={methodsPuntoSalida.handleSubmit(onSubmit)}>
            <div className="ti-modal-body">
              <Controller
                name="nombre"
                control={methodsPuntoSalida.control}
                rules={{ required: true, maxLength: 60 }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <label
                      className={`block text-sm mb-2 dark:text-white ${
                        methodsPuntoSalida.formState.errors.nombre
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                        methodsPuntoSalida.formState.errors.nombre
                          ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                          : ""
                      }`}
                      placeholder="Nombre"
                      autoFocus
                      {...field}
                    />
                    {methodsPuntoSalida.formState.errors.nombre ? (
                      methodsPuntoSalida.formState.errors.nombre.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          El nombre es requerido
                        </span>
                      ) : (
                        <span className="text-xs text-red-500">
                          Maximo 60 caracteres
                        </span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
              />
            </div>
            <div className="ti-modal-footer">
              <button
                type="button"
                className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
                data-hs-overlay="#hs-focus-management-modal-punto-salida"
                onClick={handleClose}
              >
                Cerrar
              </button>
              <button type="submit" className="ti-btn ti-btn-primary">
                {loading ? <Loader /> : currentPuntoSalida.id ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPuntoSalida;
