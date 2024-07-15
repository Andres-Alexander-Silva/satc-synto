import { Grid, Box, Typography } from "@mui/material";
import Select from "react-select";
import image from "@/assets/images/no-image.png";
import { Vehiculos } from "@/features/registro/vehiculos/interfaces/vehiculos.interface";
import { Conductores } from "@/features/registro/conductores/interfaces/conductores.interface";
import { EmpresaFind } from "@/features/configuracion/empresas/interfaces/empresas.interface";
import { Pais } from "@/features/registro/paises/interfaces/pais.interface";
import { Municipios } from "@/features/registro/municipios/interface/municipios.interface";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { ModalListadoCartaportes } from "@/features/manifiesto/nuevo/components/";
import { CartaporteListado } from "@/features/carta_porte/listado/interface/listado.interface";
import { FormRegistroDetallesManifiesto } from "@/features/manifiesto/nuevo/components";
import { PuntoSalida } from "@/features/registro/punto_salida/interfaces/puntos_salida.interface";
import { Terceros } from "@/features/registro/terceros/interface/terceros.interface";
import { Departamentos } from "@/features/registro/departamentos/interfaces/departamentos.interfaces";

interface FormRegistroManifiestoProps {
  empresa: EmpresaFind;
  imageDataUrl: string | null;
  vehiculos: Vehiculos[];
  methods: any;
  conductores: Conductores[];
  municipios: Municipios[];
  paises: Pais[];
  findCartaporte: (id: number) => void;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption: string;
  currentCartaporte: CartaporteListado;
  handleClose: () => void;
  terceros: Terceros[];
  puntosSalida: PuntoSalida[];
  departamentos: Departamentos[];
}

const FormRegistroManifiesto = ({
  empresa,
  imageDataUrl,
  vehiculos,
  methods,
  conductores,
  municipios,
  paises,
  handleOptionChange,
  selectedOption,
  findCartaporte,
  currentCartaporte,
  handleClose,
  terceros,
  puntosSalida,
  departamentos,
}: FormRegistroManifiestoProps) => {
  // Punto salida
  const formatPuntoSalida = puntosSalida.map((p) => ({
    value: p.id,
    label: p.nombre,
  }));

  /* Paises */
  const formatPaises = paises.map((p) => ({
    value: p.id,
    label: p.nombre,
  }));

  /* Remitentes */
  const remitentes = terceros.filter((t) => t.remitente === true);

  const formatRemitentes = remitentes.map((r) => ({
    value: r.id,
    label: r.razon_social,
  }));

  const consignatario = terceros.filter((t) => t.destinatario === true);

  const fromatConsignatario = consignatario.map((c) => ({
    value: c.id,
    label: c.razon_social,
  }));

  const conductoPrincipal = conductores.filter((t) => t.id !== 1);

  const formatConductorPrincipal = conductoPrincipal.map((c) => ({
    value: c.id,
    label: c.nombre,
  }));

  const formatConductores = conductores.map((c) => ({
    value: c.id,
    label: c.nombre,
  }));

  // Vehiculos habilitados ids -> 1, 3, 5
  const vehiculosHabilitados = vehiculos.filter(
    (v) =>
      v.id_tipo_vehiculo === 1 ||
      v.id_tipo_vehiculo === 3 ||
      v.id_tipo_vehiculo === 5
  );

  const formatVehiculosHabilitados = vehiculosHabilitados.map((v) => ({
    value: v.id,
    label: v.placa,
  }));

  // Vehiculos carga ids -> 2, 4, 6
  const vehiculosCarga = vehiculos.filter(
    (v) =>
      v.id_tipo_vehiculo === 2 ||
      v.id_tipo_vehiculo === 4 ||
      v.id_tipo_vehiculo === 6
  );

  const formatVehiculosCarga = vehiculosCarga.map((v) => ({
    value: v.id,
    label: v.placa,
  }));

  /* Info habilitado */
  const infoPlacaHabilitado = vehiculosHabilitados.find(
    (vehiculo) => vehiculo.id === methods.watch("trailer")?.value
  );

  /* Info carga */
  const infoPlacaCarga = vehiculosCarga.find(
    (v) => v.id === methods.watch("remolque")?.value
  );

  /* Info conductor */
  const infoConductorPrincipal = conductores.find(
    (c) => c.id === methods.watch("conductorprincipal")?.value
  );

  /* Info conducto aux */
  const infoConductorAuxiliar = conductores.find(
    (c) => c.id === methods.watch("conductorauxiliar")?.value
  );

  /* Carga */

  const dptoByPaisCarga = departamentos.filter(
    (d) => d.id_pais === methods.watch("pais_carga")?.value
  );

  const formatDptoByPaisCarga = dptoByPaisCarga.map((d) => ({
    value: d.id,
    label: d.nombre,
  }));

  const munByCountrieCarga = municipios.filter(
    (m) => m.id_departamento === methods.watch("dpto_carga")?.value
  );

  const formatMunByCountrieCarga = munByCountrieCarga.map((m) => ({
    value: m.id,
    label: m.nombre,
  }));

  /* Descarga */
  const dptoByPaisDescarga = departamentos.filter(
    (d) => d.id_pais === methods.watch("pais_descarga")?.value
  );

  const formatDptoByPaisDescarga = dptoByPaisDescarga.map((d) => ({
    value: d.id,
    label: d.nombre,
  }));

  const munByCountrieDescarga = municipios.filter(
    (m) => m.id_departamento === methods.watch("dpto_descarga")?.value
  );

  const formatMunByCountrieDescarga = munByCountrieDescarga.map((m) => ({
    value: m.id,
    label: m.nombre,
  }));

  /* Aduana cruce */

  const dptoByPaisCruce = departamentos.filter(
    (d) => d.id_pais === methods.watch("pais_cruce")?.value
  );

  const formatDptoByPaisCruce = dptoByPaisCruce.map((d) => ({
    value: d.id,
    label: d.nombre,
  }));

  const munByDptoCruce = municipios.filter(
    (m) => m.id_departamento === methods.watch("dpto_cruce")?.value
  );

  const formatMunByDptoCruce = munByDptoCruce.map((m) => ({
    value: m.id,
    label: m.nombre,
  }));

  /* Aduana destino */
  const dptoByPaisDestino = departamentos.filter(
    (d) => d.id_pais === methods.watch("pais_destino")?.value
  );

  const formatDptoByPaisDestino = dptoByPaisDestino.map((d) => ({
    value: d.id,
    label: d.nombre,
  }));

  const munByDptoDestino = municipios.filter(
    (m) => m.id_departamento === methods.watch("dpto_destino")?.value
  );

  const formatMunByDptoDestino = munByDptoDestino.map((m) => ({
    value: m.id,
    label: m.nombre,
  }));

  return (
    <Fragment>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
        sx={{
          my: 2,
          p: 0,
          "& .MuiGrid-root": {
            padding: 0,
          },
        }}
      >
        {/* IDENTIFICACION DE TRANSPORTISTA AUTORIZADO */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderBottom: "none",
              p: "0.75rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              IDENTIFICACION DE TRANSPORTISTA AUTORIZADO
            </Typography>
          </Box>
        </Grid>

        {/* 1. Denominacion o Razon social y direccion del transportista autorizado */}
        <Grid
          item
          xs={12}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderBottom: "none",
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
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                width: "50%",
                maxHeight: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                  paddingLeft: "0.75rem",
                  paddingTop: "0.3rem",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                >
                  1. Denominacion o Razon social y direccion del transportista
                  autorizado
                </Typography>
              </Box>
              <Box>
                {imageDataUrl ? (
                  <img
                    src={imageDataUrl}
                    alt="Logo empresa"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                ) : (
                  <img
                    src={image}
                    alt="Logo empresa"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                borderRight: "none",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                    paddingLeft: "0.75rem",
                    paddingTop: "0.3rem",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "1rem",
                    }}
                  >
                    2. Certificado de idoneidad de servicios Nos.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: "0.75rem",
                  }}
                >
                  <input
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Certificado de idoneidad de servicios Nos."
                    value={empresa.codigoci || ""}
                    disabled
                  />
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                    paddingLeft: "0.75rem",
                    paddingTop: "0.3rem",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                  >
                    3. Permisos de presentación de servicios Nos.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: "0.75rem",
                  }}
                >
                  <input
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Permisos de presentación de servicios Nos."
                    value={empresa.codigopps || ""}
                    disabled
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* IDENTIFICACION DEL VEHICULO O HABILITADO (CAMION O TRACTO CAMION) */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              p: "0.75rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              IDENTIFICACION DEL VEHICULO O HABILITADO (CAMION O TRACTO CAMION)
            </Typography>
          </Box>
        </Grid>

        {/* 4. Marca 5. Año de fabricación 6. Placa y país 7. Número o serie del chasis */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                4. Marca
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                5. Año de fabricación
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                6. Placa y país
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                7. Número o serie del chasis
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Marca */}
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
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Marca"
                value={infoPlacaHabilitado?.marca || ""}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Año de fabricación"
                value={infoPlacaHabilitado?.modelo || ""}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="trailer"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatVehiculosHabilitados}
                      placeholder="Placa"
                    />
                    {methods.formState.errors.trailer ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Pais"
                value={infoPlacaHabilitado?.pais || ""}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Numero serie o chasis"
                value={infoPlacaHabilitado?.numchasis || ""}
                disabled
              />
            </Box>
          </Box>
        </Grid>

        {/* 8. Certificados de habilitación Nos */}
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              paddingLeft: "0.75rem",
              paddingTop: "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              8. Certificados de habilitación Nos
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              p: "0.75rem",
            }}
          >
            <input
              type="text"
              className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
              placeholder="Certificados de habilitación Nos"
              value={infoPlacaHabilitado?.numerohabilitacion || ""}
              disabled
            />
          </Box>
        </Grid>

        {/* IDENTIFICACION DE LA UNIDAD DE CARGA (REMOLQUE O SEMI-REMOLQUE) */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              p: "0.75rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              IDENTIFICACION DE LA UNIDAD DE CARGA (REMOLQUE O SEMI-REMOLQUE)
            </Typography>
          </Box>
        </Grid>

        {/* 9. Marca 10. Año de fabricación 11. Placa y país 12. Número o serie del chasis */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                9. Marca
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                10. Año de fabricación
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                11. Placa y país
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                12. Número o serie del chasis
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Marca */}
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
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Marca"
                value={infoPlacaCarga?.marca || ""}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Año de fabricación"
                value={infoPlacaCarga?.modelo || ""}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="remolque"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatVehiculosCarga}
                      placeholder="Placa"
                    />
                    {methods.formState.errors.remolque ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Pais"
                value={infoPlacaCarga?.pais || ""}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                placeholder="Numero serie o chasis"
                value={infoPlacaCarga?.numchasis || ""}
                disabled
              />
            </Box>
          </Box>
        </Grid>

        {/* IDENTIFICACION DE LA TRIPULACION */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              p: "0.75rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              IDENTIFICACION DE LA TRIPULACION
            </Typography>
          </Box>
        </Grid>

        {/* 13. CONDUCTOR PRINCIPAL: Nombres y Apellidos 18 CONDUCTOR AUXILIAR: Nombres y Apellidos */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                13. CONDUCTOR PRINCIPAL: Nombres y Apellidos
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                18 CONDUCTOR AUXILIAR: Nombres y Apellidos
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 13. CONDUCTOR PRINCIPAL: Nombres y Apellidos */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "50%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="conductorprincipal"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatConductorPrincipal}
                      placeholder="Conductor"
                    />
                    {methods.formState.errors.conductorprincipal ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "50%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="conductorauxiliar"
                control={methods.control}
                defaultValue={1}
                render={({ field }) => (
                  <Select
                    {...field}
                    classNamePrefix="react-select"
                    options={formatConductores}
                    placeholder="Conductor"
                    value={formatConductores.find((c) => c.value === 1)}
                    DefaultSelect={formatConductores.find(c => c.value === 1)}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 14. Documento de Identidad No.  15. Nacionalidad  19. Documento de Identidad No.  20. Nacionalidad*/}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                14. Documento de Identidad No.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                15. Nacionalidad
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                19. Documento de Identidad No.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                20. Nacionalidad
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 14. Documento de Identidad No. */}
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
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorPrincipal?.numero_documento || "XXXXXX"}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorPrincipal?.nacionalidad || "XXXXXX"}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorAuxiliar?.numero_documento || "XXXXXX"}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorAuxiliar?.nacionalidad || "XXXXXX"}
                disabled
              />
            </Box>
          </Box>
        </Grid>

        {/* 16. Licencia de conducir No.  17. Libreta de tripulante terrestre No.  21. Licencia de conducir No.  22. Libreta de tripulante terrestre No.*/}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                16. Licencia de conducir No.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                17. Libreta de tripulante terrestre No.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                21. Licencia de conducir No.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                22. Libreta de tripulante terrestre No.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 16. Licencia de conducir No. */}
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
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorPrincipal?.licencia || "XXXXXX"}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorPrincipal?.libreta || "XXXXXX"}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorAuxiliar?.licencia || "XXXXXX"}
                disabled
              />
            </Box>
            <Box
              sx={{
                width: "25%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <input
                type="text"
                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                value={infoConductorAuxiliar?.libreta || "XXXXXX"}
                disabled
              />
            </Box>
          </Box>
        </Grid>

        {/* DATOS SOBRE LA CARGA */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              p: "0.75rem",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              DATOS SOBRE LA CARGA
            </Typography>
          </Box>
        </Grid>

        {/* 23. Lugar y país de carga 24. Lugar y país de descarga */}
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                23. Lugar y país de carga
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                24. Lugar y país de descarga
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 23. Lugar y país de carga 24. Lugar y país de descarga */}
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
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="pais_carga"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Pais"
                    />
                    {methods.formState.errors.pais_carga ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="dpto_carga"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDptoByPaisCarga}
                      placeholder="Departamento"
                    />
                    {methods.formState.errors.dpto_recibio ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="lugarcarga"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatMunByCountrieCarga}
                      placeholder="Municipio"
                    />
                    {methods.formState.errors.lugarcarga ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="pais_descarga"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Pais"
                    />
                    {methods.formState.errors.pais_descarga ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="dpto_descarga"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDptoByPaisDescarga}
                      placeholder="Departamento"
                    />
                    {methods.formState.errors.dpto_recibio ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="lugardescarga"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatMunByCountrieDescarga}
                      placeholder="Municipio"
                    />
                    {methods.formState.errors.lugardescarga ? (
                      <span className="text-xs text-red-500 dark:text-red-300">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 25. NATURALEZA DE LA CARGA */}
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              paddingLeft: "0.75rem",
              paddingTop: "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              25. NATURALEZA DE LA CARGA
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              p: "0.75rem",
            }}
          >
            <div className="flex flex-row">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-primary focus:ring-primary"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={handleOptionChange}
                />
                <span className="ml-2">Peligrosa</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-primary focus:ring-primary"
                  value="2"
                  checked={selectedOption === "2"}
                  onChange={handleOptionChange}
                />
                <span className="ml-2">Sustancias químicas o precursoras</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  className="form-radio text-primary focus:ring-primary"
                  value="3"
                  checked={selectedOption === "3"}
                  onChange={handleOptionChange}
                />
                <span className="ml-2">P.Recibio</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary focus:ring-primary"
                  value="4"
                  checked={selectedOption === "4"}
                  onChange={handleOptionChange}
                />
                <span className="mx-2">Otra</span>
              </label>
            </div>
            <Controller
              name="4"
              control={methods.control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`py-2 px-3 block w-1/2 border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  placeholder="Especificar"
                  defaultValue="XXXXXX"
                  disabled={selectedOption !== "4"}
                />
              )}
            />
          </Box>
        </Grid>

        {/* 26. 27 */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                26 Número de identificación de los contenedores y su capacidad
                (indicar si son de 20 ó 40 pies u otra)
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                height: "40px",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderTop: "none",
                p: "0.75rem",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                27. Número(s) de los precintos aduaneros
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 26.  27.  */}
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
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "50%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="numeroicontenedores"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Número de identificación de los contenedores y su capacidad"
                  />
                )}
              />
              {methods.formState.errors.numeroicontenedores ? (
                <span className="text-xs text-red-500 dark:text-red-300">
                  Campo requerido
                </span>
              ) : null}
            </Box>
            <Box
              sx={{
                width: "50%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="numeroprecinto"
                control={methods.control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Número(s) de los precintos aduaneros"
                  />
                )}
              />
              {methods.formState.errors.numeroprecinto ? (
                <span className="text-xs text-red-500 dark:text-red-300">
                  campo requerido
                </span>
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* IDENTIFICACION DE TRANSPORTISTA AUTORIZADO */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              p: "0.75rem",
              display: "flex",
              gap: 2,
              backgroundColor: "#f5f5f5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              SELECCIONAR CARTAPORTE
            </Typography>
            <button
              type="button"
              className="hs-dropdown-toggle ti-btn ti-btn-primary"
              data-hs-overlay="#hs-focus-management-modal-manifiesto"
            >
              Seleccionar cartaporte
            </button>
          </Box>
        </Grid>

        {/* 28-33 */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "16.6%",
                backgroundColor: "#f5f5f5",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                paddingLeft: "0.75rem",
                paddingTop: "0.75rem",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                28. Carta de porte No.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "16.6%",
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
                29. Descripción de las mercancias.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "16.6%",
                backgroundColor: "#f5f5f5",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderLeft: "none",
                borderTop: "none",
                paddingLeft: "0.75rem",
                paddingTop: "0.75rem",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                30. Cantidad de los bultos
              </Typography>
            </Box>
            <Box
              sx={{
                width: "16.6%",
                backgroundColor: "#f5f5f5",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderLeft: "none",
                borderTop: "none",
                paddingLeft: "0.75rem",
                paddingTop: "0.75rem",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                31. Clases y marcas de los bultos
              </Typography>
            </Box>
            <Box
              sx={{
                width: "37%",
                backgroundColor: "#f5f5f5",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderLeft: "none",
                borderTop: "none",
              }}
            >
              <Box
                sx={{
                  paddingLeft: "0.75rem",
                  paddingTop: "0.75rem",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                >
                  32. Peso en kilogramos
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "50%",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderLeft: "none",
                    borderBottom: "none",
                    p: "0.75rem",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                  >
                    Neto
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderRight: "none",
                    borderLeft: "none",
                    borderBottom: "none",
                    p: "0.75rem",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                  >
                    Bruto
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "50%",
                    border: "1px solid rgba(0, 0, 0, 0.2)",
                    borderRight: "none",
                    borderBottom: "none",
                    p: "0.75rem",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", marginBottom: "1rem" }}
                  >
                    Precio
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        <FormRegistroDetallesManifiesto
          current={currentCartaporte}
          empresa={empresa}
        />

        {/* 35. Observaciones de la Aduana de Partida */}
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              paddingLeft: "0.75rem",
              paddingTop: "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              35. Observaciones de la Aduana de Partida
            </Typography>
          </Box>
        </Grid>

        {/* 37. Observaciones de la Aduana de Partida */}
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "50%",
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
                37. Aduana(s) de Cruce de Frontera
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
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
                38. Aduana de Destino
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Observaciones */}
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              height: "100%",
              p: "0.75rem",
            }}
          >
            <Controller
              name="observacionaduana"
              control={methods.control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  placeholder="Observaciones"
                  rows={3}
                  style={{ resize: "none" }}
                />
              )}
            />
            {methods.formState.errors.observacionaduana ? (
              <span className="text-xs text-red-500 dark:text-red-300">
                Campo requerido
              </span>
            ) : null}
          </Box>
        </Grid>

        {/* Pais cruce frontera */}
        <Grid
          item
          xs={8}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: 1,
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItemsL: "center",
                }}
              >
                <Controller
                  name="pais_cruce"
                  control={methods.control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatPaises}
                        placeholder="Pais"
                      />
                      {methods.formState.errors.pais_cruce ? (
                        <span className="text-xs text-red-500 dark:text-red-300">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
                <Controller
                  name="dpto_cruce"
                  control={methods.control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatDptoByPaisCruce}
                        placeholder="Departamento"
                      />
                      {methods.formState.errors.dpto_recibio ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
                <Controller
                  name="aduanacrucefrontera"
                  control={methods.control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatMunByDptoCruce}
                        placeholder="Municipio"
                      />
                      {methods.formState.errors.aduanacrucefrontera ? (
                        <span className="text-xs text-red-500 dark:text-red-300">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="puntoaduanafrontera"
                  control={methods.control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatPuntoSalida}
                        placeholder="Punto aduana de frontera"
                      />
                      {methods.formState.errors.puntoaduanafrontera ? (
                        <span className="text-xs text-red-500 dark:text-red-300">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                gap: 1,
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Controller
                  name="pais_destino"
                  control={methods.control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatPaises}
                        placeholder="Pais"
                      />
                      {methods.formState.errors.pais_destino ? (
                        <span className="text-xs text-red-500 dark:text-red-300">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
                <Controller
                  name="dpto_destino"
                  control={methods.control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatDptoByPaisDestino}
                        placeholder="Departamento"
                      />
                      {methods.formState.errors.dpto_recibio ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
                <Controller
                  name="aduanadestino"
                  control={methods.control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatMunByDptoDestino}
                        placeholder="Municipio"
                      />
                      {methods.formState.errors.aduanadestino ? (
                        <span className="text-xs text-red-500 dark:text-red-300">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
              </Box>
              <Box>
                <Controller
                  name="puntoaduanadestino"
                  control={methods.control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatPuntoSalida}
                        placeholder="Punto aduana de destino"
                      />
                      {methods.formState.errors.puntoaduanadestino ? (
                        <span className="text-xs text-red-500 dark:text-red-300">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* 40. Fecha emision */}
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              paddingLeft: "0.75rem",
              paddingTop: "0.75rem",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: "bold", marginBottom: "1rem" }}
            >
              40. Fecha de emisión
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              p: "0.75rem",
            }}
          >
            <Controller
              name="fecha_emision"
              control={methods.control}
              defaultValue={new Date().toISOString().split("T")[0]}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  placeholder="Fecha de emisión"
                />
              )}
            />
            {methods.formState.errors.fecha_emision ? (
              <span className="text-xs text-red-500 dark:text-red-300">
                Campo requerido
              </span>
            ) : null}
          </Box>
        </Grid>

        {/* 41. Remitente */}
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
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
              41. Remitente
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              borderLeft: "none",
              p: "0.75rem",
            }}
          >
            <Controller
              name="remitente"
              control={methods.control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <div className="w-full">
                  <Select
                    {...field}
                    classNamePrefix="react-select"
                    options={formatRemitentes}
                    placeholder="Remitente"
                  />
                  {methods.formState.errors.remitente ? (
                    <span className="text-xs text-red-500 dark:text-red-300">
                      Campo requerido
                    </span>
                  ) : null}
                </div>
              )}
            />
          </Box>
        </Grid>

        {/* 42. Destinatario */}
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
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
              42. Destinatario
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderTop: "none",
              borderLeft: "none",
              p: "0.75rem",
            }}
          >
            <Controller
              name="destinatario"
              control={methods.control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <div className="w-full">
                  <Select
                    {...field}
                    classNamePrefix="react-select"
                    options={fromatConsignatario}
                    placeholder="Destinatario"
                  />
                  {methods.formState.errors.destinatario ? (
                    <span className="text-xs text-red-500 dark:text-red-300">
                      Campo requerido
                    </span>
                  ) : null}
                </div>
              )}
            />
          </Box>
        </Grid>
      </Grid>

      <ModalListadoCartaportes
        handleClose={handleClose}
        findCartaporte={findCartaporte}
        current={currentCartaporte}
      />
    </Fragment>
  );
};

export default FormRegistroManifiesto;
