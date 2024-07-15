import {
  AiOutlineEdit,
  AiOutlineUnlock,
  AiOutlineLock,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { useTableConductores } from "@/features/registro/conductores/hooks";
import { NumericFormat } from "react-number-format";
import { LoaderComponents } from "@/components";
import { useState } from "react";

const columns = [
  { id: "tipo", label: "Tipo" },
  { id: "numero", label: "Numero" },
  { id: "nombre", label: "Nombre" },
  { id: "apellido", label: "Apellido" },
  { id: "nacionalidad", label: "Nacionalidad" },
  { id: "celular", label: "Celular" },
  { id: "libreta", label: "Libreta" },
  { id: "licencia", label: "Licencia" },
  { id: "estado", label: "Estado" },
  { id: "acciones", label: "Acciones" },
];

const TableConductores = () => {
  const {
    loading,
    open,
    deleteConductores,
    search,
    setSearch,
    searchConductores,
  } = useTableConductores();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentConductor = searchConductores().slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(searchConductores().length / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const visiblePages = 2;
  const startPage = Math.max(1, currentPage - visiblePages);
  const endPage = Math.min(totalPages, currentPage + visiblePages);

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
                placeholder="Buscar conductor"
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
                  {currentConductor.map((conductor) => (
                    <tr key={conductor.id}>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {conductor.tipo_documento}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        <NumericFormat
                          value={conductor.numero_documento}
                          displayType={"text"}
                          thousandSeparator="."
                          decimalSeparator=","
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {conductor.nombre}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {conductor.apellido}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {conductor.nacionalidad}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {conductor.celular}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        {conductor.libreta}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap dark:text-white/70">
                        <NumericFormat
                          value={conductor.licencia}
                          displayType={"text"}
                          thousandSeparator="."
                          decimalSeparator=","
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={
                            conductor.estado
                              ? "cursor-pointer text-green-500"
                              : "cursor-pointer text-red-500"
                          }
                        >
                          {conductor.estado ? (
                            <AiOutlineCheck />
                          ) : (
                            <AiOutlineClose />
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 inline-flex items-center gap-2 font-medium rounded-md text-yellow-500"
                            type="button"
                            data-hs-overlay="#hs-focus-management-modal-conductor"
                            onClick={() => open(conductor)}
                          >
                            <AiOutlineEdit />
                          </button>
                          <button
                            className={`p-2 inline-flex items-center gap-2 font-medium rounded-md ${
                              conductor.estado
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                            type="button"
                            onClick={() =>
                              deleteConductores(conductor.id, conductor.estado)
                            }
                          >
                            {conductor.estado ? (
                              <AiOutlineUnlock />
                            ) : (
                              <AiOutlineLock />
                            )}
                          </button>
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
              {Math.min(indexOfLastItem, searchConductores().length)} de{" "}
              {searchConductores().length} registros
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableConductores;
