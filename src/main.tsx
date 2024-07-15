import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";

import { HelmetProvider } from "react-helmet-async";
import { App } from "@/components/";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { Login } from "@/features/auth/pages";
import { Nueva } from "@/features/carta_porte/nueva/pages";
import { NuevoManifiesto } from "@/features/manifiesto/nuevo/pages";
import { ListadoManifiestos } from "@/features/manifiesto/listado/pages";
import { Listado } from "@/features/carta_porte/listado/pages";
import { Loginlayout } from "@/features/auth/components";
import { Home } from "@/features/home/pages";
import { UsuariosProvider } from "@/features/usuarios/context/UsuariosContext";
import { Private, Public } from "@/routes/PrivatizationRoutes";
import ScrollToTop from "./ScrollToTop/ScrolltoTop";
import { Paises } from "@/features/registro/paises/pages";
import { Departamentos } from "@/features/registro/departamentos/pages";
import { DepartamentosProvider } from "@/features/registro/departamentos/context/DepartamentosContext";
import { PaisProvider } from "@/features/registro/paises/context/PaisContext";
import { Municipios } from "@/features/registro/municipios/pages";
import { MunicipiosProvider } from "@/features/registro/municipios/context/MunicipiosContext";
import { Opciones } from "@/features/sistema/opciones/pages";
import { OpcionesProvider } from "@/features/sistema/opciones/context/OpcionesContext";
import { Menu } from "@/features/sistema/menus/pages";
import { MenuProvider } from "@/features/sistema/menus/context/MenuContext";
import { Roles } from "@/features/sistema/roles/pages";
import { RolesProvider } from "@/features/sistema/roles/context/RolesContext";
import { TipoDocumentoProvider } from "@/features/configuracion/tipo_documentos/context/TipoDocumentoContext";
import { TipoDocumentos } from "@/features/configuracion/tipo_documentos/pages";
import { EmpresaProvider } from "@/features/configuracion/empresas/context/EmpresaContext";
import { Empresa } from "@/features/configuracion/empresas/pages";
import { UsuariosProvider as UserProvider } from "@/features/configuracion/usuarios/context/UsuariosContext";
import { Usuarios } from "@/features/configuracion/usuarios/pages";
import { Icoterms } from "@/features/registro/iconterms/pages";
import { IcotermsProvider } from "@/features/registro/iconterms/context/IcotermsContext";
import { Clase } from "@/features/registro/clase/pages";
import { ClaseProvider } from "@/features/registro/clase/context/ClaseContext";
import { Marcas } from "@/features/registro/marca/pages";
import { MarcasProvider } from "@/features/registro/marca/context/MarcasContext";
import { TiposVehiculos } from "@/features/registro/tipo_vehiculo/pages";
import { TiposVehiculosProvider } from "@/features/registro/tipo_vehiculo/context/TiposVehiculosContext";
import { Conductores } from "@/features/registro/conductores/pages";
import { ConductoresProvider } from "@/features/registro/conductores/context/ConductoresContext";
import { Terceros } from "@/features/registro/terceros/pages";
import { TercerosProvider } from "@/features/registro/terceros/context/TercerosContext";
import { Vehiculos } from "@/features/registro/vehiculos/pages";
import { VehiculosProvider } from "@/features/registro/vehiculos/context/VehiculosContext";
import { ListadoCartaporteProvider } from "@/features/carta_porte/listado/context/ListadoCartaporteContext";
import "@/api/axiosInterceptors";
import { ListadoManifiestoProvider } from "@/features/manifiesto/listado/context/ListadoManifiestoContext";
import { NuevaCartaPorteProvider } from "@/features/carta_porte/nueva/context/NuevaCartaPorteContext";
import { PuntoSalidaProvider } from "@/features/registro/punto_salida/context/PuntosSalidaContext";
import { PuntosSalida } from "@/features/registro/punto_salida/pages";
import { NuevoManifiestoProvider } from "./features/manifiesto/nuevo/context/NuevoManifiestoContext";

let helmetContext = {};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Fragment>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Public>
                  <Loginlayout />
                </Public>
              }
            >
              <Route path="/" element={<Login />} />
            </Route>
            <Route
              path="/main/*"
              element={
                <Private>
                  <UsuariosProvider>
                    <App />
                  </UsuariosProvider>
                </Private>
              }
            >
              <Route path="inicio" element={<Home />} />
              <Route
                path="carta_porte/nueva"
                element={
                  <PaisProvider>
                    <DepartamentosProvider>
                      <MunicipiosProvider>
                        <IcotermsProvider>
                          <TipoDocumentoProvider>
                            <TercerosProvider>
                              <ClaseProvider>
                                <EmpresaProvider>
                                  <NuevaCartaPorteProvider>
                                    <Nueva />
                                  </NuevaCartaPorteProvider>
                                </EmpresaProvider>
                              </ClaseProvider>
                            </TercerosProvider>
                          </TipoDocumentoProvider>
                        </IcotermsProvider>
                      </MunicipiosProvider>
                    </DepartamentosProvider>
                  </PaisProvider>
                }
              />
              <Route
                path="carta_porte/nueva/:id"
                element={
                  <PaisProvider>
                    <DepartamentosProvider>
                      <MunicipiosProvider>
                        <IcotermsProvider>
                          <TercerosProvider>
                            <ClaseProvider>
                              <EmpresaProvider>
                                <NuevaCartaPorteProvider>
                                  <Nueva />
                                </NuevaCartaPorteProvider>
                              </EmpresaProvider>
                            </ClaseProvider>
                          </TercerosProvider>
                        </IcotermsProvider>
                      </MunicipiosProvider>
                    </DepartamentosProvider>
                  </PaisProvider>
                }
              />
              <Route
                path="carta_porte/listarcartaporte"
                element={
                  <EmpresaProvider>
                    <ListadoCartaporteProvider>
                      <Listado />
                    </ListadoCartaporteProvider>
                  </EmpresaProvider>
                }
              />
              <Route
                path="manifiesto/nuevo"
                element={
                  <PuntoSalidaProvider>
                    <EmpresaProvider>
                      <TercerosProvider>
                        <VehiculosProvider>
                          <ConductoresProvider>
                            <PaisProvider>
                              <DepartamentosProvider>
                                <MunicipiosProvider>
                                  <ListadoCartaporteProvider>
                                    <NuevoManifiestoProvider>
                                      <NuevoManifiesto />
                                    </NuevoManifiestoProvider>
                                  </ListadoCartaporteProvider>
                                </MunicipiosProvider>
                              </DepartamentosProvider>
                            </PaisProvider>
                          </ConductoresProvider>
                        </VehiculosProvider>
                      </TercerosProvider>
                    </EmpresaProvider>
                  </PuntoSalidaProvider>
                }
              />
              <Route
                path="manifiesto/nuevo/:id"
                element={
                  <PuntoSalidaProvider>
                    <EmpresaProvider>
                      <TercerosProvider>
                        <VehiculosProvider>
                          <ConductoresProvider>
                            <PaisProvider>
                              <DepartamentosProvider>
                                <MunicipiosProvider>
                                  <ListadoCartaporteProvider>
                                    <NuevoManifiestoProvider>
                                      <NuevoManifiesto />
                                    </NuevoManifiestoProvider>
                                  </ListadoCartaporteProvider>
                                </MunicipiosProvider>
                              </DepartamentosProvider>
                            </PaisProvider>
                          </ConductoresProvider>
                        </VehiculosProvider>
                      </TercerosProvider>
                    </EmpresaProvider>
                  </PuntoSalidaProvider>
                }
              />
              <Route
                path="manifiesto/listarmanifiesto"
                element={
                  <EmpresaProvider>
                    <ListadoManifiestoProvider>
                      <ListadoManifiestos />
                    </ListadoManifiestoProvider>
                  </EmpresaProvider>
                }
              />
              <Route
                path="registro/vehiculo"
                element={
                  <MarcasProvider>
                    <TiposVehiculosProvider>
                      <PaisProvider>
                        <VehiculosProvider>
                          <Vehiculos />
                        </VehiculosProvider>
                      </PaisProvider>
                    </TiposVehiculosProvider>
                  </MarcasProvider>
                }
              />
              <Route
                path="registro/tercero"
                element={
                  <PaisProvider>
                    <MunicipiosProvider>
                      <TipoDocumentoProvider>
                        <TercerosProvider>
                          <Terceros />
                        </TercerosProvider>
                      </TipoDocumentoProvider>
                    </MunicipiosProvider>
                  </PaisProvider>
                }
              />
              <Route
                path="registro/conductor"
                element={
                  <TipoDocumentoProvider>
                    <ConductoresProvider>
                      <Conductores />
                    </ConductoresProvider>
                  </TipoDocumentoProvider>
                }
              />
              <Route
                path="registro/municipio"
                element={
                  <DepartamentosProvider>
                    <MunicipiosProvider>
                      <Municipios />
                    </MunicipiosProvider>
                  </DepartamentosProvider>
                }
              />
              <Route
                path="registro/departamento"
                element={
                  <PaisProvider>
                    <DepartamentosProvider>
                      <Departamentos />
                    </DepartamentosProvider>
                  </PaisProvider>
                }
              />
              <Route
                path="registro/pais"
                element={
                  <PaisProvider>
                    <Paises />
                  </PaisProvider>
                }
              />
              <Route
                path="registro/tipovehiculo"
                element={
                  <TiposVehiculosProvider>
                    <TiposVehiculos />
                  </TiposVehiculosProvider>
                }
              />
              <Route
                path="registro/marca"
                element={
                  <MarcasProvider>
                    <Marcas />
                  </MarcasProvider>
                }
              />
              <Route
                path="registro/clase"
                element={
                  <ClaseProvider>
                    <Clase />
                  </ClaseProvider>
                }
              />
              <Route
                path="registro/iconterms"
                element={
                  <IcotermsProvider>
                    <Icoterms />
                  </IcotermsProvider>
                }
              />
              <Route
                path="registro/puntosalida"
                element={
                  <PuntoSalidaProvider>
                    <PuntosSalida />
                  </PuntoSalidaProvider>
                }
              />
              <Route
                path="registro/empresa"
                element={
                  <EmpresaProvider>
                    <Empresa />
                  </EmpresaProvider>
                }
              />
              <Route
                path="configuracion/usuarios"
                element={
                  <TipoDocumentoProvider>
                    <EmpresaProvider>
                      <RolesProvider>
                        <UserProvider>
                          <Usuarios />
                        </UserProvider>
                      </RolesProvider>
                    </EmpresaProvider>
                  </TipoDocumentoProvider>
                }
              />
              <Route
                path="configuracion/tipodocumento"
                element={
                  <TipoDocumentoProvider>
                    <TipoDocumentos />
                  </TipoDocumentoProvider>
                }
              />
              <Route
                path="configuracion/rol"
                element={
                  <OpcionesProvider>
                    <RolesProvider>
                      <Roles />
                    </RolesProvider>
                  </OpcionesProvider>
                }
              />
              <Route
                path="sistema/menu"
                element={
                  <MenuProvider>
                    <Menu />
                  </MenuProvider>
                }
              />
              <Route
                path="sistema/opcion"
                element={
                  <MenuProvider>
                    <OpcionesProvider>
                      <Opciones />
                    </OpcionesProvider>
                  </MenuProvider>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </Fragment>
);
