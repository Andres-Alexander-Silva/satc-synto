import { Box, Grid, IconButton, Typography } from "@mui/material";
import { CartaporteListado } from "@/features/carta_porte/listado/interface/listado.interface";
import { useNuevoManifiesto } from "@/features/manifiesto/nuevo/hooks";
import { EmpresaFind } from "@/features/configuracion/empresas/interfaces/empresas.interface";
import { NumericFormat } from "react-number-format";
import { Controller } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";

interface FormRegistroDetallesManifiestoProps {
  current: CartaporteListado;
  empresa: EmpresaFind;
}

const FormRegistroDetallesManifiesto = ({
  current,
  empresa,
}: FormRegistroDetallesManifiestoProps) => {
  const {
    selectedDetails,
    handleCantidadChange,
    calculatedPesoNeto,
    calculatedPesoBruto,
    calculatedValor,
    sumarPesoBrutoTotal,
    sumarPesoNetoTotal,
    sumarValorTotal,
    setSelectedDetails,
    currentManifiesto,
    methodsNuevoManifiesto,
  } = useNuevoManifiesto();

  const handleRemoveDetail = (indexToRemove: number) => {
    const updatedDetails = selectedDetails.filter(
      (det: any) => det.index !== indexToRemove
    );
    setSelectedDetails(updatedDetails);
  };

  return (
    <>
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
              width: "16.6%",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              p: "0.75rem",
            }}
          >
            {selectedDetails.map((det) => {
              return (
                <Box
                  key={det.index}
                  sx={{
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleRemoveDetail(det.index)}
                  >
                    <AiOutlineDelete />
                  </IconButton>
                  <input
                    type="text"
                    value={det.cartaporte || ""}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    disabled
                  />
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              width: "16.6%",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              borderLeft: "none",
              p: "0.75rem",
            }}
          >
            {selectedDetails.map((det: any) => (
              <Box
                key={det.index}
                sx={{
                  mb: 1,
                }}
              >
                <textarea
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  value={det.descripcion || ""}
                  disabled
                  rows={3}
                  style={{ resize: "none" }}
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "16.6%",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              borderLeft: "none",
              p: "0.75rem",
            }}
          >
            {selectedDetails.map((det: any) => {
              return (
                <Box
                  key={det.index}
                  sx={{
                    mb: 1,
                  }}
                >
                  <Controller
                    name={`cantidad${det.index}`}
                    control={methodsNuevoManifiesto.control}
                    defaultValue={det.cantidad}
                    render={({ field }) => (
                      <NumericFormat
                        {...field}
                        value={det.cantidad}
                        thousandSeparator="."
                        decimalSeparator=","
                        onBlur={(e) => {
                          handleCantidadChange(det.index, e.target.value),
                            methodsNuevoManifiesto.trigger("cantidad");
                        }}
                        className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      />
                    )}
                  />
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              width: "16.6%",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              borderLeft: "none",
              p: "0.75rem",
            }}
          >
            {selectedDetails.map((det: any) => (
              <Box
                key={det.id}
                sx={{
                  p: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <input
                  type="text"
                  value={det.unidad || ""}
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  disabled
                />
                <span>&.</span>
                <input
                  type="text"
                  value={det.nombreClase || ""}
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  disabled
                />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              width: "37%",
              display: "flex",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderLeft: "none",
              borderTop: "none",
            }}
          >
            <Box
              sx={{
                width: "33.3%",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderLeft: "none",
                borderTop: "none",
                borderBottom: "none",
                p: "0.75rem",
              }}
            >
              {selectedDetails.map((det) => {
                const cantidadActual =
                  methodsNuevoManifiesto
                    .watch(`cantidad${det.index}`)
                    ?.replace(",", ".") === det.cantidad;
                return (
                  <Box
                    key={det.index}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <NumericFormat
                      value={
                        cantidadActual
                          ? det.peso_neto
                          : calculatedPesoNeto(
                              det.cantidad.toString(),
                              current.cartaporte?.peso_neto ||
                                det.peso_neto ||
                                "0",
                              det.cantidadTotal || "0",
                              det.index
                            )
                      }
                      thousandSeparator="."
                      decimalSeparator=","
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                width: "33.3%",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderLeft: "none",
                borderRight: "none",
                borderTop: "none",
                borderBottom: "none",
                p: "0.75rem",
              }}
            >
              {selectedDetails.map((det) => {
                const cantidadActual =
                  methodsNuevoManifiesto
                    .watch(`cantidad${det.index}`)
                    ?.replace(",", ".") === det.cantidad;
                return (
                  <Box
                    key={det.id}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <NumericFormat
                      value={
                        cantidadActual
                          ? det.peso_bruto
                          : calculatedPesoBruto(
                              det.cantidad.toString(),
                              current.cartaporte?.peso_bruto ||
                                det.peso_bruto ||
                                "0",
                              det.cantidadTotal || "0",
                              det.index
                            )
                      }
                      thousandSeparator="."
                      decimalSeparator=","
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    />
                  </Box>
                );
              })}
            </Box>
            <Box
              sx={{
                width: "33.3%",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRight: "none",
                borderTop: "none",
                borderBottom: "none",
                p: "0.75rem",
              }}
            >
              {selectedDetails.map((det) => {
                const cantidadActual =
                  methodsNuevoManifiesto
                    .watch(`cantidad${det.index}`)
                    ?.replace(",", ".") === det.cantidad;
                return (
                  <Box
                    key={det.id}
                    sx={{
                      mb: 1,
                    }}
                  >
                    <NumericFormat
                      value={
                        cantidadActual
                          ? det.calcular_valor
                          : calculatedValor(
                              det.cantidad.toString(),
                              current.cartaporte?.precio_mercancia ||
                                det.calcular_valor ||
                                "0",
                              det.cantidadTotal || "0",
                              det.index
                            )
                      }
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="$"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Grid>
      {/* 34. Observaciones */}
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
              width: "51.5%",
              backgroundColor: "#f5f5f5",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              padding: "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              34. Precio de las mercancias (INCOTERMS 2000) y tipo moneda
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <p>
                  {current.cartaporte?.terminosincoterms.codigo ||
                    currentManifiesto.cartaporte?.codigo_incoterm}
                </p>
                <p>
                  {current.cartaporte?.municipioIcoterm.name ||
                    currentManifiesto.cartaporte?.municipio}
                </p>
                <span>/</span>
                <p>
                  {current.cartaporte?.municipioIcoterm.name_pais ||
                    currentManifiesto.cartaporte?.pais}
                </p>
                <p>{empresa.tipo_moneda}</p>
                <NumericFormat
                  value={sumarValorTotal()}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="$"
                  readOnly={true}
                  displayType={"text"}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "15%",
              backgroundColor: "#f5f5f5",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              borderLeft: "none",
              paddingLeft: "0.75rem",
              paddingTop: "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              Total
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "37%",
            }}
          >
            <Box
              sx={{
                width: "33.3%",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <p>
                <NumericFormat
                  value={sumarPesoNetoTotal()}
                  thousandSeparator="."
                  decimalSeparator=","
                  readOnly={true}
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                />
              </p>
            </Box>
            <Box
              sx={{
                width: "33.3%",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <p>
                <NumericFormat
                  value={sumarPesoBrutoTotal()}
                  thousandSeparator="."
                  decimalSeparator=","
                  readOnly={true}
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                />
              </p>
            </Box>
            <Box
              sx={{
                width: "33.3%",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <p>
                <NumericFormat
                  value={sumarValorTotal()}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="$"
                  readOnly={true}
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                />
              </p>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default FormRegistroDetallesManifiesto;
