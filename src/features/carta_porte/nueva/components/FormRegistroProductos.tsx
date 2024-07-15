import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { Clase } from "@/features/registro/clase/interface/clase.interface";
import { Grid, Box } from "@mui/material";
import Select from "react-select";

interface FormRegistroProductos {
  methods: any;
  append: any;
  fields: any;
  remove: any;
  clase: Clase[];
  selectedActos: any;
  setSelectedActos: any;
  formatNumber: (value: string) => string;
}

const FormRegistroProductos = ({
  methods,
  append,
  fields,
  remove,
  clase,
  selectedActos,
  setSelectedActos,
  formatNumber,
}: FormRegistroProductos) => {
  const handleActoSelection = (index: number, value: any) => {
    setSelectedActos((prevSelectedActos: any) => {
      const updatedSelectedActos = [...prevSelectedActos];
      updatedSelectedActos[index] = value;
      return updatedSelectedActos;
    });
  };

  const handleRemoveField = (indexToRemove: number) => {
    setSelectedActos((prevSelectedActos: any) => {
      const updatedSelectedActos = [...prevSelectedActos];
      updatedSelectedActos.splice(indexToRemove, 1);
      return updatedSelectedActos;
    });

    remove(indexToRemove);
  };

  const formatClase = clase.map((c) => ({
    value: c.id,
    label: c.nombre,
  }));

  return (
    <Fragment>
      {/* Cantidad y clase bultos */}
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid
          item
          xs={12}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2) ",
            borderBottom: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderTop: "none",
                  borderBottom: "none",
                  borderLeft: "none",
                  width: "33.3%",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  10. Cantidad y Clase de Los bultos
                </p>
              </Box>
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderTop: "none",
                  borderBottom: "none",
                  borderLeft: "none",
                  width: "20%",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  11. Marcas y Números de los Bultos
                </p>
              </Box>
              <Box
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderTop: "none",
                  borderBottom: "none",
                  borderRight: "none",
                  borderLeft: "none",
                  width: "46.7%",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  12. Descripcion de las Mercancias
                </p>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {fields.map((item: any, index: number) => (
        <Fragment key={item.id}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={1}
            sx={{
              "& .MuiGrid-root": {
                padding: 0,
              },
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "33.3%",
                    gap: 1,
                    border: "1px solid rgba(0, 0, 0, 0.2) ",
                    p: "0.75rem",
                  }}
                >
                  <div className="w-full">
                    <Select
                      options={formatClase}
                      classNamePrefix="react-select"
                      placeholder="Clase"
                      onChange={(value: any) =>
                        handleActoSelection(index, value)
                      }
                      value={selectedActos[index] || null}
                    />
                  </div>
                  <Controller
                    name={`detalleCartaPorte.${index}.cantidad`}
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                          placeholder="Cantidad"
                          onChange={(e) => {
                            const formattedValue = formatNumber(e.target.value);
                            e.target.value = formattedValue;
                            field.onChange(e);
                          }}
                        />
                        {methods.formState.errors?.detalleCartaPorte?.[index]
                          ?.cantidad ? (
                          <span className="text-xs text-red-500">
                            Campo requerido
                          </span>
                        ) : null}
                      </div>
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    width: "20%",
                    border: "1px solid rgba(0, 0, 0, 0.2) ",
                    borderLeft: "none",
                    p: "0.75rem",
                  }}
                >
                  <Controller
                    name={`detalleCartaPorte.${index}.marca`}
                    control={methods.control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                          placeholder="Marca"
                        />
                      </div>
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    width: "46.7%",
                    border: "1px solid rgba(0, 0, 0, 0.2) ",
                    borderLeft: "none",
                    p: "0.75rem",
                  }}
                >
                  <Controller
                    name={`detalleCartaPorte.${index}.descripcion`}
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <textarea
                          {...field}
                          className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70`}
                          placeholder="Descripcion"
                          rows={4}
                          style={{ resize: "none" }}
                        />
                        {methods.formState.errors?.detalleCartaPorte?.[index]
                          ?.descripcion ? (
                          <span className="text-xs text-red-500">
                            Campo requerido
                          </span>
                        ) : null}
                      </div>
                    )}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <button
            onClick={() => {
              handleRemoveField(index);
            }}
            disabled={fields.length === 1}
            className="my-1 ti-btn ti-btn-primary"
          >
            Eliminar producto
          </button>
        </Fragment>
      ))}
      <button
        type="button"
        className=" mt-1 mx-1 ti-btn ti-btn-primary"
        onClick={() =>
          append({
            marca: "",
            cantidad: 0,
            descripcion: "",
            id_clase: 0,
          })
        }
      >
        Agregar producto
      </button>
    </Fragment>
  );
};

export default FormRegistroProductos;
