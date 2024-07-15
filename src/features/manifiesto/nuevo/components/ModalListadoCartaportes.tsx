import { useModalListadoCartaportes } from "@/features/manifiesto/nuevo/hooks";
import { CartaporteListado } from "@/features/carta_porte/listado/interface/listado.interface";
import { NumericFormat } from "react-number-format";
import { useNuevoManifiesto } from "@/features/manifiesto/nuevo/hooks";

interface ModalListadoCartaportesProps {
  handleClose: () => void;
  findCartaporte: (id: number) => void;
  current: CartaporteListado;
}

const columns = [
  { id: "agregar", label: "[+]" },
  { id: "noCarta", label: "No Carta" },
  { id: "descripcion", label: "Descripcion" },
  { id: "cantidad", label: "Cantidad" },
  { id: "clase", label: "Clase" },
  { id: "pesoNeto", label: "Peso neto" },
  { id: "pesoBruto", label: "Peso bruto" },
  { id: "incoterms", label: "Incoterms" },
  {
    id: "valor",
    label: "Valor",
  },
];

const ModalListadoCartaportes = ({
  handleClose,
  findCartaporte,
  current,
}: ModalListadoCartaportesProps) => {
  const {
    setCurrentCartapore,
    selectedDetails,
    handleDetailSelection,
    handleCantidadChange,
    calculatedPesoNeto,
    calculatedPesoBruto,
    calculatedValor,
    sumCantidades,
  } = useNuevoManifiesto();
  const { formatCartaporteId, search, setSearch } =
    useModalListadoCartaportes();

  return (
    <div
      id="hs-focus-management-modal-manifiesto"
      className="hs-overlay hidden ti-modal"
    >
      <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out lg:!max-w-4xl lg:w-full m-3 lg:!mx-auto">
        <div className="ti-modal-content">
          <div className="ti-modal-header">
            <h3 className="ti-modal-title">Listado cartaportes</h3>
            <button
              type="button"
              className="hs-dropdown-toggle ti-modal-close-btn"
              data-hs-overlay="#hs-focus-management-modal-manifiesto"
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
          <div className="ti-modal-body">
            <div className="box-body">
              <div className="table-bordered rounded-md ti-custom-table-head">
                <div className="py-2 px-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <div className="relative max-w-xs">
                      <label htmlFor="hs-table-search2" className="sr-only">
                        Search
                      </label>
                      <input
                        type="text"
                        name="hs-table-search2"
                        id="hs-table-search2"
                        className="p-3 ltr:pl-10 rtl:pr-10 ti-form-input"
                        placeholder="Buscar cartaporte"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 flex items-center pointer-events-none ltr:pl-4 rtl:pr-4">
                        <svg
                          className="h-3.5 w-3.5 text-gray-400 dark:text-white/70"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="hs-dropdown-toggle ti-btn ti-btn-primary"
                      onClick={() => findCartaporte(Number(search))}
                    >
                      Buscar
                    </button>
                  </div>
                  <button
                    type="button"
                    className="hs-dropdown-toggle ti-btn ti-btn-primary"
                    onClick={() => {
                      setCurrentCartapore({} as any);
                    }}
                  >
                    Limpiar
                  </button>
                </div>
                <div className="overflow-auto">
                  <table className="ti-custom-table ti-custom-table-head">
                    <thead className="bg-gray-50 dark:bg-black/20">
                      {
                        <tr>
                          {columns.map((column) => (
                            <th
                              key={column.id}
                              scope="col"
                              className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white/70"
                            >
                              {column.label}
                            </th>
                          ))}
                        </tr>
                      }
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-bgdark dark:divide-gray-700">
                      {current.detallecartaporte?.map((cu) => {
                        return (
                          <tr key={cu.id}>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              <input
                                type="checkbox"
                                checked={selectedDetails.some(
                                  (selectedRow: any) =>
                                    selectedRow.index === cu.id
                                )}
                                onChange={() =>
                                  handleDetailSelection(cu, cu.id)
                                }
                                disabled={cu.cantidad.toString() === "0.00"}
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              {formatCartaporteId(current.cartaporte?.id)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              {cu.descripcion}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              <NumericFormat
                                value={cu.cantidad}
                                thousandSeparator="."
                                decimalSeparator=","
                                onBlur={(e) =>
                                  handleCantidadChange(cu.id, e.target.value)
                                }
                                disabled={cu.cantidad.toString() === "0.00"}
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              {cu.clase}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              <NumericFormat
                                value={calculatedPesoNeto(
                                  cu.cantidad.toString(),
                                  current.cartaporte?.peso_neto || "0",
                                  cu.cantidadTotal || "0",
                                  cu.id
                                )}
                                thousandSeparator="."
                                decimalSeparator=","
                                disabled={cu.cantidad.toString() === "0.00"}
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              <NumericFormat
                                value={calculatedPesoBruto(
                                  cu.cantidad.toString(),
                                  current.cartaporte?.peso_bruto || "0",
                                  sumCantidades().toString() || "0",
                                  cu.id
                                )}
                                thousandSeparator="."
                                decimalSeparator=","
                                disabled={cu.cantidad.toString() === "0.00"}
                              />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              {current.cartaporte?.terminosincoterms.codigo}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                              <NumericFormat
                                value={calculatedValor(
                                  cu.cantidad.toString(),
                                  current.cartaporte?.precio_mercancia || "0",
                                  sumCantidades().toString() || "0",
                                  cu.id
                                )}
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="$"
                                disabled={cu.cantidad.toString() === "0.00"}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="ti-modal-footer">
            <button
              type="button"
              className="hs-dropdown-toggle ti-btn ti-border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:ring-offset-white focus:ring-primary dark:bg-bgdark dark:hover:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-white dark:focus:ring-offset-white/10"
              data-hs-overlay="#hs-focus-management-modal-manifiesto"
              onClick={handleClose}
            >
              Aceptar
            </button>
            <button
              type="button"
              className="ti-btn ti-btn-primary"
              data-hs-overlay="#hs-focus-management-modal-manifiesto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalListadoCartaportes;
