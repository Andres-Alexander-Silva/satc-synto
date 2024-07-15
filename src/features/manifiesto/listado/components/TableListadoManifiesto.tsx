import { useTableListadoManifiesto } from "@/features/manifiesto/listado/hooks";
import { AiOutlineEdit, AiOutlineFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { LoaderComponents } from "@/components";

const columns = [
  { id: "numero", label: "Numero" },
  { id: "fechaEmision", label: "Fecha emision" },
  { id: "numeroCartaporte", label: "Cartaporte" },
  { id: "conducto", label: "Conductor" },
  { id: "trailer", label: "Trailer" },
  { id: "remolque", label: "Remolque" },
  { id: "pesoneto", label: "Peso neto" },
  { id: "pesobruto", label: "Peso bruto" },
  { id: "precio", label: "Precio" },
  {
    id: "acciones",
    label: "Acciones",
  },
];

const TableListadoManifiesto = () => {
  const {
    downloadOriginal,
    formatManifiestoId,
    loading,
    search,
    setSearch,
    searchManifiesto,
    empresaFind,
    totalesPesoNeto,
    totalesPesoBruto,
    totalesPrecio,
  } = useTableListadoManifiesto();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentManifiesto = searchManifiesto().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(searchManifiesto().length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const visiblePages = 2;
  const startPage = Math.max(1, currentPage - visiblePages);
  const endPage = Math.min(totalPages, currentPage + visiblePages);

  const sumarPesosDetalles = (
    detalles: any[]
  ): { sumaPesosBrutos: number; sumaPesosNetos: number } => {
    return detalles.reduce(
      (acumulador, detalle) => {
        const pesoBruto = parseFloat(detalle.pesobruto.replace(",", "."));
        const pesoNeto = parseFloat(detalle.pesoneto.replace(",", "."));

        if (!isNaN(pesoBruto)) {
          acumulador.sumaPesosBrutos += pesoBruto;
        }

        if (!isNaN(pesoNeto)) {
          acumulador.sumaPesosNetos += pesoNeto;
        }

        return acumulador;
      },
      { sumaPesosBrutos: 0, sumaPesosNetos: 0 }
    );
  };

  return (
    <div className="box basic-data-table">
      <div className="box-body">
        <div className="table-bordered rounded-md ti-custom-table-head">
          <div className="py-2 px-3">
            <div className="relative max-w-xs">
              <label htmlFor="hs-table-search2" className="sr-only">
                Search
              </label>
              <input
                type="text"
                name="hs-table-search2"
                id="hs-table-search2"
                className="p-3 ltr:pl-10 rtl:pr-10 ti-form-input"
                placeholder="Buscar manifiesto"
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
          </div>
          <div className="overflow-auto">
            {loading ? (
              <LoaderComponents />
            ) : (
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
                  {currentManifiesto.map((m, index) => (
                    <tr key={m.id}>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {formatManifiestoId(m.id)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {m.fecha_emision}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {formatManifiestoId(m.cartaporte.id)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {m.conductorprincipal.nombre}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {m.trailer.placa}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {m.remolque.placa}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        <NumericFormat
                          value={totalesPesoNeto[index].toFixed(2)}
                          displayType={"text"}
                          allowLeadingZeros
                          thousandSeparator="."
                          decimalSeparator=","
                          readOnly={true}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        <NumericFormat
                          value={totalesPesoBruto[index].toFixed(2)}
                          displayType={"text"}
                          allowLeadingZeros
                          thousandSeparator="."
                          decimalSeparator=","
                          readOnly={true}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        <NumericFormat
                          value={totalesPrecio[index].toFixed(2)}
                          displayType={"text"}
                          allowLeadingZeros
                          thousandSeparator="."
                          decimalSeparator=","
                          readOnly={true}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 inline-flex items-center gap-2 font-medium rounded-md text-yellow-500"
                            type="button"
                            data-hs-overlay="#hs-focus-management-modal-menu"
                          >
                            <Link to={`/main/manifiesto/nuevo/${m.id}`}>
                              <AiOutlineEdit />
                            </Link>
                          </button>
                          <div className="hs-dropdown ti-dropdown">
                            <button
                              aria-label="button"
                              id="hs-dropdown-custom-icon-trigger"
                              type="button"
                              className="hs-dropdown-toggle p-3  text-red-500"
                            >
                              <AiOutlineFilePdf />
                            </button>

                            <div
                              className="hs-dropdown-menu ti-dropdown-menu"
                              aria-labelledby="hs-dropdown-custom-trigger"
                            >
                              <span
                                className="ti-dropdown-item cursor-pointer"
                                onClick={() =>
                                  downloadOriginal(
                                    m.id,
                                    `${m.cartaporte.codigo_incoterm}/${m.cartaporte.municipio}/${m.cartaporte.pais}/${m.monedamercancia}`,
                                    0,
                                    sumarPesosDetalles(m.detalles),
                                    true
                                  )
                                }
                              >
                                Original
                              </span>
                              <span
                                className="ti-dropdown-item cursor-pointer"
                                onClick={() =>
                                  downloadOriginal(
                                    m.id,
                                    `${m.cartaporte.codigo_incoterm}/${m.cartaporte.municipio}/${m.cartaporte.pais}/${m.monedamercancia}`,
                                    1,
                                    sumarPesosDetalles(m.detalles),
                                    false
                                  )
                                }
                              >
                                Original y copia
                              </span>
                              <span
                                className="ti-dropdown-item cursor-pointer"
                                onClick={() =>
                                  downloadOriginal(
                                    m.id,
                                    `${m.cartaporte.codigo_incoterm}/${m.cartaporte.municipio}/${m.cartaporte.pais}/${m.monedamercancia}`,
                                    empresaFind.numCopias,
                                    sumarPesosDetalles(m.detalles),
                                    false
                                  )
                                }
                              >
                                {`Original y ${empresaFind.numCopias} copias`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <nav className="pagination-style-2 p-2">
            <ul className="ti-pagination">
              <li>
                <button
                  className="page-link"
                  onClick={() => handleClick(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => {
                if (
                  (index + 1 >= startPage && index + 1 <= endPage) ||
                  index + 1 === 1 ||
                  index + 1 === totalPages
                ) {
                  return (
                    <li key={index}>
                      <button
                        className={`page-link ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => handleClick(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  );
                }
                if (index + 1 === 2 && startPage > 2) {
                  return (
                    <li key={index}>
                      <button className="page-link" type="button">
                        <i className="ri-more-line"></i>
                      </button>
                    </li>
                  );
                }
                if (index + 1 === totalPages - 1 && endPage < totalPages - 1) {
                  return (
                    <li key={index}>
                      <button className="page-link" type="button">
                        <i className="ri-more-line"></i>
                      </button>
                    </li>
                  );
                }
                return null;
              })}
              <li>
                <button
                  className="page-link"
                  type="button"
                  onClick={() => handleClick(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
          <div className="flex justify-end pr-4 pb-2">
            <p className="text-gray-500 text-sm dark:text-white/70">
              Mostrando {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, searchManifiesto().length)} de{" "}
              {searchManifiesto().length} registros
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableListadoManifiesto;
