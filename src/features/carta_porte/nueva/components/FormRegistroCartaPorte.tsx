import { Controller } from "react-hook-form";
import { Fragment } from "react";
import { Terceros } from "@/features/registro/terceros/interface/terceros.interface";
import { Icoterms } from "@/features/registro/iconterms/interfaces/icoterms.interface";
import { Pais } from "@/features/registro/paises/interfaces/pais.interface";
import { Municipios } from "@/features/registro/municipios/interface/municipios.interface";
import { Departamentos } from "@/features/registro/departamentos/interfaces/departamentos.interfaces";
import { EmpresaFind } from "@/features/configuracion/empresas/interfaces/empresas.interface";
import { Box, Grid } from "@mui/material";
import Select from "react-select";
import image from "@/assets/images/no-image.png";

interface FormRegistroCartaPorteProps {
  methods: any;
  terceros: Terceros[];
  icoterms: Icoterms[];
  paises: Pais[];
  municipios: Municipios[];
  imageDataUrl: string | null;
  empresa: EmpresaFind;
  handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedOption: string;
  formatNumber: (value: string) => string;
  totalDestinatario: string;
  totalRemitente: string;
  departamentos: Departamentos[];
}

const FormRegistroCartaPorte = ({
  methods,
  terceros,
  icoterms,
  paises,
  municipios,
  imageDataUrl,
  empresa,
  handleOptionChange,
  selectedOption,
  formatNumber,
  totalDestinatario,
  totalRemitente,
  departamentos,
}: FormRegistroCartaPorteProps) => {
  /* Countries active */
  const countriesActive = paises.filter((pais) => pais.estado === true);

  const formatPaises = countriesActive.map((pais) => ({
    value: pais.id,
    label: pais.nombre,
  }));

  /* Remitentes */
  const remitentes = terceros.filter((t) => t.remitente === true);

  const formatRemitentes = remitentes.map((tercero) => ({
    value: tercero.id,
    label: tercero.razon_social,
  }));

  /* Direccion remitente */
  const direccionRemitente = terceros.find(
    (tercero) => tercero.id === methods.watch("remitente")?.value
  )?.direccion;

  /* Notificara */
  const notificara = terceros.filter((t) => t.notificara === true);

  const formatNotificara = notificara.map((tercero) => ({
    value: tercero.id,
    label: tercero.razon_social,
  }));

  /* Agencia */
  const agencia = terceros.filter((t) => t.agencia === true);

  const formatAgencia = agencia.map((tercero) => ({
    value: tercero.id,
    label: tercero.razon_social,
  }));

  /* Consignatario */
  const consignatario = terceros.filter((t) => t.consignatario === true);

  const formatConsignatario = consignatario.map((tercero) => ({
    value: tercero.id,
    label: tercero.razon_social,
  }));

  /* Direccion consignatario */
  const direccionConsignatario = terceros.find(
    (tercero) => tercero.id === methods.watch("consignatario")?.value
  )?.direccion;

  /* Recibido */

  const deptosByCountri = departamentos.filter(
    (dpto) => dpto.id_pais === methods.watch("pais_recibio")?.value
  );

  const formatDptosByCountri = deptosByCountri.map((dpto) => ({
    value: dpto.id,
    label: dpto.nombre,
  }));

  const municipiosByCountrieRecibio = municipios.filter(
    (mun) => mun.id_departamento === methods.watch("dpto_recibio")?.value
  );

  const formatMunicipiosByCountrieRecibio = municipiosByCountrieRecibio.map(
    (mun) => ({
      value: mun.id,
      label: mun.nombre,
    })
  );

  /* Embargue */

  const deptosByCountriEmbargue = departamentos.filter(
    (dpto) => dpto.id_pais === methods.watch("pais_embargue")?.value
  );

  const formatDptosByCountriEmbargue = deptosByCountriEmbargue.map((dpto) => ({
    value: dpto.id,
    label: dpto.nombre,
  }));

  const municipiosByDptoEmbargue = municipios.filter(
    (mun) => mun.id_departamento === methods.watch("dpto_embargue")?.value
  );

  const formatMunicipiosByCountrieEmbargue = municipiosByDptoEmbargue.map(
    (mun) => ({
      value: mun.id,
      label: mun.nombre,
    })
  );

  /* Entrega */

  const deptosByCountriEntrega = departamentos.filter(
    (dpto) => dpto.id_pais === methods.watch("pais_entrega")?.value
  );

  const formatDptosByCountriEntrega = deptosByCountriEntrega.map((dpto) => ({
    value: dpto.id,
    label: dpto.nombre,
  }));

  const municipiosByCountrieEntrega = municipios.filter(
    (mun) => mun.id_departamento === methods.watch("dpto_entrega")?.value
  );

  const formatMunicipiosByCountrieEntrega = municipiosByCountrieEntrega.map(
    (mun) => ({
      value: mun.id,
      label: mun.nombre,
    })
  );

  /* Destinatario */
  const destinatario = terceros.filter((t) => t.destinatario === true);

  const formatDestinatario = destinatario.map((tercero) => ({
    value: tercero.id,
    label: tercero.razon_social,
  }));

  /* Direccion destinatario */
  const direccionDestinatario = terceros.find(
    (tercero) => tercero.id === methods.watch("destinatario")?.value
  )?.direccion;

  /* Iconterms */
  const formatIcoterms = icoterms.map((icoterms) => ({
    value: icoterms.id,
    label: icoterms.codigo,
  }));

  const dptosByCountriIcoterm = departamentos.filter(
    (dpto) => dpto.id_pais === methods.watch("pais_icoterm")?.value
  );

  const formatDptosByCountriIcoterm = dptosByCountriIcoterm.map((dpto) => ({
    value: dpto.id,
    label: dpto.nombre,
  }));

  const municipisByCountriesIcoterm = municipios.filter(
    (mun) => mun.id_departamento === methods.watch("dpto_icoterm")?.value
  );

  const formatMunicipiosByCountriesIcoterm = municipisByCountriesIcoterm.map(
    (mun) => ({
      value: mun.id,
      label: mun.nombre,
    })
  );

  /* Emision */

  const dptos = departamentos.filter(
    (dpto) => dpto.id_pais === methods.watch("pais_emision")?.value
  );

  const formatDptosByCountriEmision = dptos.map((dpto) => ({
    value: dpto.id,
    label: dpto.nombre,
  }));

  const municipiosByCountriesEmision = municipios.filter(
    (mun) => mun.id_departamento === methods.watch("dpto_emision")?.value
  );

  const formatMunicipiosByCountriesEmision = municipiosByCountriesEmision.map(
    (mun) => ({
      value: mun.id,
      label: mun.nombre,
    })
  );

  /* Required */
  const isCampoRequerido = () => {
    return (
      selectedOption === "3" &&
      methods.getValues("valorfleteremitente") === "" &&
      methods.getValues("valorfletedestinatario") === "" &&
      methods.getValues("valorseguroremitente") === "" &&
      methods.getValues("valorsegurodestinatario") === "" &&
      methods.getValues("valorotrogastosremitente") === "" &&
      methods.getValues("valorotrosgastosdestinatario") === ""
    );
  };

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
        {/* 1 5 6 */}
        <Grid
          item
          xs={12}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderBottom: "none",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
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
                <p className="block text-sm mb-2 dark:text-white">
                  1. Denominacion o Razon social y direccion del transportista
                  autorizado
                </p>
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
                  <p className="block text-sm mb-2 dark:text-white">
                    5. Notificar a:
                  </p>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    p: "0.75rem",
                  }}
                >
                  <Controller
                    name="notificara"
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatNotificara}
                        placeholder="Selecciona el notificara"
                      />
                    )}
                  />
                  {methods.formState.errors.notificara ? (
                    <span className="text-xs text-red-500">
                      Campo requerido
                    </span>
                  ) : null}
                  <Controller
                    name="agencia"
                    control={methods.control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatAgencia}
                        placeholder="Selecciona la agencia"
                      />
                    )}
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
                  <p className="block text-sm mb-2 dark:text-white">
                    6. País, Lugar y Fecha en que El Transportista Recibe la
                    Mercancia
                  </p>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: "0.75rem",
                  }}
                >
                  <Controller
                    name="pais_recibio"
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="w-full">
                        <Select
                          {...field}
                          classNamePrefix="react-select"
                          options={formatPaises}
                          placeholder="Pais"
                        />
                        {methods.formState.errors.pais_recibio ? (
                          <span className="text-xs text-red-500">
                            Campo requerido
                          </span>
                        ) : null}
                      </div>
                    )}
                  />
                  <Controller
                    name="dpto_recibio"
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="w-full">
                        <Select
                          {...field}
                          classNamePrefix="react-select"
                          options={formatDptosByCountri}
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
                    name="lugarrecibio"
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="w-full">
                        <Select
                          {...field}
                          classNamePrefix="react-select"
                          options={formatMunicipiosByCountrieRecibio}
                          placeholder="Municipio"
                        />
                        {methods.formState.errors.lugarrecibio ? (
                          <span className="text-xs text-red-500">
                            Campo requerido
                          </span>
                        ) : null}
                      </div>
                    )}
                  />
                  <Controller
                    name="fecharecibido"
                    control={methods.control}
                    rules={{ required: true }}
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className={`py-2 px-3 block w-1/2 border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                          methods.formState.errors.fecharecibido
                            ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                            : ""
                        }`}
                        autoFocus
                      />
                    )}
                  />
                  {methods.formState.errors.fecharecibido ? (
                    <span className="text-xs text-red-500">
                      Campo requerido
                    </span>
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* 2  Nombres y Dirección del Remitente */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderTop: "none",
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                2. Nombres y Dirección del Remitente.
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="remitente"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    classNamePrefix="react-select"
                    options={formatRemitentes}
                    placeholder="Selecciona el remitente"
                  />
                )}
              />
              {methods.formState.errors.remitente ? (
                <span className="text-xs text-red-500">Campo requerido</span>
              ) : null}
              <Controller
                name="direccion_remitente"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70`}
                    placeholder="Direccion remitente"
                    value={direccionRemitente || ""}
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 7 Lugar, País y Fecha de Embarque la Mercancia. */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            borderLeft: "none",
            borderTop: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                7. País, Lugar y Fecha de Embarque la Mercancia.
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="pais_embargue"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Pais"
                    />
                    {methods.formState.errors.pais_embargue ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="dpto_embargue"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDptosByCountriEmbargue}
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
                name="lugarembarque"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatMunicipiosByCountrieEmbargue}
                      placeholder="Municipio"
                    />
                    {methods.formState.errors.lugarembarque ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="fechaembarque"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className={`py-2 px-3 block w-1/2 border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                      methods.formState.errors.fechaembarque
                        ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                        : ""
                    }`}
                    autoFocus
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 3 Nombre direccion destinatario */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            borderTop: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                3. Nombre y Dirección del Destinatario
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="destinatario"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDestinatario}
                      placeholder="Selecciona el destinatario"
                    />
                    {methods.formState.errors.destinatario ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="direccion_destinatario"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70`}
                    placeholder="Direccion destinatario"
                    value={direccionDestinatario || ""}
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 8 País, Lugar y Fecha Convenida Para La Entrega De Las Mercancias */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            borderLeft: "none",
            borderTop: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                8. Lugar, País y Fecha Convenida Para La Entrega De Las
                Mercancias.
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="pais_entrega"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Pais"
                    />
                    {methods.formState.errors.pais_entrega ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="dpto_entrega"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDptosByCountriEntrega}
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
                name="lugarentrega"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatMunicipiosByCountrieEntrega}
                      placeholder="Municipio-"
                    />
                    {methods.formState.errors.lugarentrega ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="fechadeentrega"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className={`py-2 px-3 block w-1/2 border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                      methods.formState.errors.fechadeentrega
                        ? "focus:border-red-500 focus:red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:red-500 border-red-500"
                        : ""
                    }`}
                    autoFocus
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 4 Nombre direccion consignatario */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            borderTop: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                4. Nombre y Dirección del Consignatario.
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="consignatario"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatConsignatario}
                      placeholder="Selecciona el consignatario"
                    />
                    {methods.formState.errors.consignatario ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="direccion_consignatario"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70`}
                    placeholder="Direccion consignatario"
                    value={direccionConsignatario || ""}
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 9 Condiciones del Transporte y Condiciones de Pago */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2) ",
            backgroundColor: "#fff",
            borderLeft: "none",
            borderTop: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                9. Condiciones del Transporte y Condiciones de Pago
              </p>
            </Box>
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="condiciones_transporte_pago"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70`}
                    placeholder="Condiciones del transporte y condiciones de pago"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
              {methods.formState.errors.condiciones_transporte_pago ? (
                <span className="text-xs text-red-500">Campo requerido</span>
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* 13 Peso en kilogramos */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              p: "0.75rem",
              borderTop: "none",
              backgroundColor: "#f5f5f5",
            }}
          >
            <p className="block text-sm mb-2 dark:text-white">
              13. PESO EN KILOGRAMOS
            </p>
          </Box>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                p: "0.75rem",
                borderLeft: "none",
                borderBottom: "none",
                width: "50%",
                borderTop: "none",
                backgroundColor: "#f5f5f5",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">Neto</p>
            </Box>
            <Box
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderLeft: "none",
                borderBottom: "none",
                p: "0.75rem",
                width: "50%",
                borderTop: "none",
                backgroundColor: "#f5f5f5",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">Bruto</p>
            </Box>
          </Box>
        </Grid>

        {/* Neto */}
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderRight: "none",
              borderTop: "none",
              height: "100%",
            }}
          >
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="pesoneto"
                control={methods.control}
                rules={{
                  required: true,
                  validate: (value) => {
                    const formatValue = value
                      .toString()
                      .replace(/[.]/g, "")
                      .replace(",", ".");
                    const valueFloat = parseFloat(formatValue);
                    const bruto = methods.getValues("pesobruto");
                    const formatBruto = bruto
                      .toString()
                      .replace(/[.]/g, "")
                      .replace(",", ".");
                    const brutoFloat = parseFloat(formatBruto);
                    if (value && bruto) {
                      if (valueFloat > brutoFloat) {
                        return "El peso neto no puede ser mayor al peso bruto";
                      }
                    }
                    return true;
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Neto"
                    onChange={(e) => {
                      const formattedValue = formatNumber(e.target.value);
                      console.log(formattedValue);
                      e.target.value = formattedValue;
                      field.onChange(e);
                    }}
                    onBlur={() => methods.trigger("pesoneto")}
                  />
                )}
              />
              {methods.formState.errors.pesoneto ? (
                methods.formState.errors.pesoneto.type === "required" ? (
                  <span className="text-xs text-red-500">Campo requerido</span>
                ) : (
                  <span className="text-xs text-red-500">
                    {methods.formState.errors.pesoneto.message}
                  </span>
                )
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* Bruto */}
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              height: "100%",
            }}
          >
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="pesobruto"
                control={methods.control}
                rules={{
                  required: true,
                  validate: (value) => {
                    const formatValue = value
                      .toString()
                      .replace(/[.]/g, "")
                      .replace(",", ".");
                    const valueFloat = parseFloat(formatValue);
                    const neto = methods.getValues("pesoneto");
                    const formatNeto = neto
                      .toString()
                      .replace(/[.]/g, "")
                      .replace(",", ".");
                    const netoFloat = parseFloat(formatNeto);
                    if (value && neto) {
                      if (valueFloat < netoFloat) {
                        return "El peso bruto no puede ser menor al peso neto";
                      }
                    }
                    return true;
                  },
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Neto"
                    onChange={(e) => {
                      const formattedValue = formatNumber(e.target.value);
                      e.target.value = formattedValue;
                      field.onChange(e);
                    }}
                    onBlur={() => methods.trigger("pesobruto")}
                  />
                )}
              />
              {methods.formState.errors.pesobruto ? (
                methods.formState.errors.pesobruto.type === "required" ? (
                  <span className="text-xs text-red-500">Campo requerido</span>
                ) : (
                  <span className="text-xs text-red-500">
                    {methods.formState.errors.pesobruto.message}
                  </span>
                )
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* 14 Volumen mts cubicos */}
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              height: "100%",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                14. Volumen en metros cúbicos
              </p>
            </Box>
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="volumen"
                control={methods.control}
                rules={{
                  required: true,
                  maxLength: 20,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Volumen"
                  />
                )}
              />
              {methods.formState.errors.volumen ? (
                methods.formState.errors.volumen.type === "required" ? (
                  <span className="text-xs text-red-500">Campo requerido</span>
                ) : (
                  <span className="text-xs text-red-500">
                    {methods.formState.errors.volumen.message}
                  </span>
                )
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* 15 Otras unidades de medida */}
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
              borderLeft: "none",
              height: "100%",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                15. Otras unidades de medida
              </p>
            </Box>
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="otras_unidades"
                control={methods.control}
                rules={{ maxLength: 20 }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Otras unidades"
                  />
                )}
              />
              {methods.formState.errors.otras_unidades ? (
                methods.formState.errors.otras_unidades.type === "required" ? (
                  <span className="text-xs text-red-500">Campo requerido</span>
                ) : (
                  <span className="text-xs text-red-500">
                    Maximo 20 caracteres
                  </span>
                )
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* 16 Icoterms */}
        <Grid
          item
          xs={8}
          sx={{
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderLeft: "none",
              borderTop: "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                16. Precio de las mercancías (INCOTERMS 2000) y tipo de moneda
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="terminosincoterms"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-1/2">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatIcoterms}
                      placeholder="Termino"
                    />
                    {methods.formState.errors.terminosincoterms ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="preciomercancia"
                control={methods.control}
                rules={{
                  required: true,
                  maxLength: 20,
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      placeholder="Precio mercancia"
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                      onBlur={() => methods.trigger("preciomercancia")}
                    />
                    {methods.formState.errors.preciomercancia ? (
                      <span className="text-xs text-red-500">
                        {methods.formState.errors.preciomercancia.message}
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="moneda_mercancia"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={`py-2 px-3 block w-1/3 border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Moneda mercancia"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="pais_icoterm"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Pais"
                    />
                    {methods.formState.errors.pais_icoterm ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="dpto_icoterm"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDptosByCountriIcoterm}
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
                name="municipioIcoterm"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatMunicipiosByCountriesIcoterm}
                      placeholder="Municipio"
                    />
                    {methods.formState.errors.municipioIcoterm ? (
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

        {/* Gastos a pagar */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.2) ",
              borderTop: "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                p: "0.75rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                17. GASTOS A PAGAR
              </p>
              <div className="flex space-x-2 items-center">
                <input
                  type="radio"
                  id="remitente"
                  name="pagoPor"
                  value="1"
                  onChange={handleOptionChange}
                  checked={selectedOption === "1"}
                  className="form-radio text-primary focus:ring-primary"
                />
                <label
                  htmlFor="remitente"
                  className="text-sm text-gray-800 dark:text-white"
                >
                  Remitente
                </label>

                <input
                  type="radio"
                  id="destinatario"
                  name="pagoPor"
                  value="2"
                  onChange={handleOptionChange}
                  checked={selectedOption === "2"}
                  className="form-radio text-primary focus:ring-primary"
                />
                <label
                  htmlFor="destinatario"
                  className="text-sm text-gray-800 dark:text-white"
                >
                  Destinatario
                </label>

                <input
                  type="radio"
                  id="ambos"
                  name="pagoPor"
                  value="3"
                  onChange={handleOptionChange}
                  checked={selectedOption === "3"}
                  className="form-radio text-primary focus:ring-primary"
                />
                <label
                  htmlFor="ambos"
                  className="text-sm text-gray-800 dark:text-white"
                >
                  Ambos
                </label>
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "20%",
                  height: "40px",
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderLeft: "none",
                  borderBottom: "none",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">CONCEPTO</p>
              </Box>
              <Box
                sx={{
                  width: "25%",
                  height: "40px",
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderLeft: "none",
                  borderBottom: "none",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  MONTO A CARGO REMITENTE
                </p>
              </Box>
              <Box
                sx={{
                  width: "15%",
                  height: "40px",
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderLeft: "none",
                  borderBottom: "none",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  TIPO DE MONEDA
                </p>
              </Box>
              <Box
                sx={{
                  width: "25%",
                  height: "40px",
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderLeft: "none",
                  borderBottom: "none",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  MONTO A CARGO DESTINATARIO
                </p>
              </Box>
              <Box
                sx={{
                  width: "15%",
                  height: "40px",
                  border: "1px solid rgba(0, 0, 0, 0.2) ",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  p: "0.75rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <p className="block text-sm mb-2 dark:text-white">
                  TIPO DE MONEDA
                </p>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Valor flete */}
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
                width: "20%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">Valor flete</p>
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
              <Controller
                name="valorfleteremitente"
                control={methods.control}
                rules={{
                  required: selectedOption === "1" || isCampoRequerido(),
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      disabled={selectedOption === "2"}
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      placeholder="Valor flete"
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                    />
                    {methods.formState.errors.valorfleteremitente ? (
                      methods.formState.errors.valorfleteremitente.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        methods.formState.errors.valorfleteremitente.message
                      )
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="modendafleteremitente"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "2"}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Moneda flete"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
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
              <Controller
                name="valorfletedestinatario"
                control={methods.control}
                rules={{
                  required: selectedOption === "2" || isCampoRequerido(),
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      disabled={selectedOption === "1"}
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      placeholder="Valor flete"
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                    />
                    {methods.formState.errors.valorfletedestinatario ? (
                      methods.formState.errors.valorfletedestinatario.type ===
                      "required" ? (
                        <span>Campo requerido</span>
                      ) : (
                        methods.formState.errors.valorfletedestinatario.message
                      )
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedafletedestinatario"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "1"}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Moneda flete"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* Seguro */}
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
                width: "20%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">Seguro</p>
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
              <Controller
                name="valorseguroremitente"
                control={methods.control}
                rules={{
                  required: selectedOption === "1" || isCampoRequerido(),
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      disabled={selectedOption === "2"}
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      placeholder="Valor seguro remitente"
                    />
                    {methods.formState.errors.valorseguroremitente ? (
                      methods.formState.errors.valorseguroremitente.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        methods.formState.errors.valorseguroremitente.message
                      )
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedaseguroremitente"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "2"}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Moneda seguro remitente"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
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
              <Controller
                name="valorsegurodestinatario"
                control={methods.control}
                rules={{
                  required: selectedOption === "2" || isCampoRequerido(),
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      disabled={selectedOption === "1"}
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                      placeholder="Valor seguro destinatario"
                    />
                    {methods.formState.errors.valorsegurodestinatario ? (
                      methods.formState.errors.valorsegurodestinatario.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        methods.formState.errors.valorsegurodestinatario.message
                      )
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedasegurodestinatario"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "1"}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                    placeholder="Moneda seguro destinatario"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* Otros gastos */}
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
                width: "20%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">Otros gastos</p>
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
              <Controller
                name="valorotrogastosremitente"
                control={methods.control}
                rules={{
                  required: selectedOption === "1" || isCampoRequerido(),
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      disabled={selectedOption === "2"}
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                      onBlur={() => methods.trigger("valorotrogastosremitente")}
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                      placeholder="Valor otros gastos remitente"
                    />
                    {methods.formState.errors.valorotrogastosremitente ? (
                      methods.formState.errors.valorotrogastosremitente.type ===
                      "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        methods.formState.errors.valorotrogastosremitente
                          .message
                      )
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedaotrosgastosremitente"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "2"}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                    placeholder="Moneda otros gastos remitente"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
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
              <Controller
                name="valorotrosgastosdestinatario"
                control={methods.control}
                rules={{
                  required: selectedOption === "2" || isCampoRequerido(),
                }}
                defaultValue=""
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      disabled={selectedOption === "1"}
                      onChange={(e) => {
                        const formattedValue = formatNumber(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                      onBlur={() =>
                        methods.trigger("valorotrosgastosdestinatario")
                      }
                      className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                      placeholder="Valor otros gastos destinatario"
                    />
                    {methods.formState.errors.valorotrosgastosdestinatario ? (
                      methods.formState.errors.valorotrosgastosdestinatario
                        .type === "required" ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : (
                        methods.formState.errors.valorotrosgastosdestinatario
                          .message
                      )
                    ) : null}
                  </div>
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedaotrosgastosdestinatario"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "1"}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                    placeholder="Moneda otros gastos destinatario"
                    value={empresa.tipo_moneda || ""}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* Total */}
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
                width: "20%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">Total</p>
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
              <Controller
                name="valortotalremitente"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "2"}
                    value={totalRemitente || ""}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                    placeholder="Valor total remitente"
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedatotalremitete"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "2"}
                    value={empresa.tipo_moneda || ""}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                    placeholder="Moneda total remitente"
                  />
                )}
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
              <Controller
                name="valortotaldestinatari"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "1"}
                    value={totalDestinatario || ""}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                    placeholder="Valor total destinatario"
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                width: "15%",
                border: "1px solid rgba(0, 0, 0, 0.2) ",
                borderTop: "none",
                borderLeft: "none",
                p: "0.75rem",
              }}
            >
              <Controller
                name="monedatotaldestinatario"
                control={methods.control}
                rules={{
                  maxLength: 4,
                }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    disabled={selectedOption === "1"}
                    value={empresa.tipo_moneda || ""}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white dark:text-white/70 `}
                    placeholder="Moneda total destinatario"
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 18 Total doc recibidos */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2) ",
            backgroundColor: "#fff",
            borderTop: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                18. Documentos recibidos del remitente
              </p>
            </Box>
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="documentosrecibidos"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70`}
                    placeholder="Documentos recibidos"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
              {methods.formState.errors.documentosrecibidos ? (
                <span className="text-xs text-red-500">Campo requerido</span>
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* 19 Lugar pais emision */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2) ",
            backgroundColor: "#fff",
            borderTop: "none",
            borderLeft: "none",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                19. Lugar, país y fecha de emisión
              </p>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: "0.75rem",
              }}
            >
              <Controller
                name="pais_emision"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatPaises}
                      placeholder="Pais"
                    />
                    {methods.formState.errors.pais_emision ? (
                      <span className="text-xs text-red-500">
                        Campo requerido
                      </span>
                    ) : null}
                  </div>
                )}
              />
              <Controller
                name="dpto_emision"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <div className="w-full">
                    <Select
                      {...field}
                      classNamePrefix="react-select"
                      options={formatDptosByCountriEmision}
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
                name="lugaremision"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => {
                  return (
                    <div className="w-full">
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={formatMunicipiosByCountriesEmision}
                        placeholder="Municipio"
                      />
                      {methods.formState.errors.lugaremision ? (
                        <span className="text-xs text-red-500">
                          Campo requerido
                        </span>
                      ) : null}
                    </div>
                  );
                }}
              />
              <Controller
                name="fechaemision"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 `}
                  />
                )}
              />
            </Box>
          </Box>
        </Grid>

        {/* 21 Instrucciones transportista */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2) ",
            backgroundColor: "#fff",
            borderTop: "none",
            borderEndStartRadius: "8px",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                21. Instrucciones al Transportista.
              </p>
            </Box>
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="instrucciones_transportista"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white`}
                    placeholder="Instrucciones al transportista"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
              {methods.formState.errors.instrucciones_transportista ? (
                <span className="text-xs text-red-500">Campo requerido</span>
              ) : null}
            </Box>
          </Box>
        </Grid>

        {/* Observaciones transportista */}
        <Grid
          item
          xs={6}
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2) ",
            backgroundColor: "#fff",
            borderTop: "none",
            borderLeft: "none",
            borderEndEndRadius: "8px",
          }}
        >
          <Box>
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                p: "0.75rem",
              }}
            >
              <p className="block text-sm mb-2 dark:text-white">
                22. Observaciones del Transportisita
              </p>
            </Box>
            <Box
              sx={{
                p: "0.75rem",
              }}
            >
              <Controller
                name="observacionestransportista"
                control={methods.control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <textarea
                    {...field}
                    className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white`}
                    placeholder="Observaciones del transportista"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                )}
              />
              {methods.formState.errors.observacionestransportista ? (
                <span className="text-xs text-red-500">Campo requerido</span>
              ) : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default FormRegistroCartaPorte;
