import { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLogin } from "@/features/auth/hooks";
import { Controller } from "react-hook-form";
import { Loader } from "@/components";
import logo from "@/assets/images/Panel.png";

const Login = () => {
  const { methodsAuth, loading, onSubmit } = useLogin();
  useEffect(() => {
    const rootDiv = document.getElementById("root") as HTMLElement;
    if (rootDiv) {
      rootDiv.className = "grid grid-cols-12 gap-6 w-full h-full";
    }
    return () => {
      rootDiv.className = "";
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <html dir="ltr"></html>
        <body className="error-page flex h-full !py-0 bg-white dark:bg-bgdark"></body>
      </Helmet>
      <div className="lg:col-span-6 col-span-12 hidden lg:block relative">
        <div className="cover relative w-full h-full z-[1]">
          <img src={logo} alt="logo" className="h-full w-full" />
        </div>
      </div>
      <div className="lg:col-span-6 col-span-12">
        <div className="authentication-page w-full">
          <main id="content" className="w-full max-w-md mx-auto p-6">
            <div className="mt-7">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Iniciar sesion
                  </h1>
                </div>
                <div className="mt-5">
                  <form onSubmit={methodsAuth.handleSubmit(onSubmit)}>
                    <div className="grid gap-y-4">
                      <Controller
                        name="username"
                        control={methodsAuth.control}
                        rules={{ required: true }}
                        defaultValue=""
                        render={({ field }) => (
                          <div>
                            <label
                              className={`block text-sm mb-2 dark:text-white ${
                                methodsAuth.formState.errors.username
                                  ? "text-red-500"
                                  : ""
                              }`}
                            >
                              Usuario
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="username"
                                className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                                  methodsAuth.formState.errors.username
                                    ? "focus:border-red-500 focus:red-500 border-red-500"
                                    : ""
                                }`}
                                {...field}
                              />
                              {methodsAuth.formState.errors.username && (
                                <span
                                  className="
                                  text-xs text-red-500"
                                >
                                  Este campo es requerido
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      />
                      <div>
                        <Controller
                          control={methodsAuth.control}
                          name="password"
                          rules={{ required: true }}
                          defaultValue=""
                          render={({ field }) => (
                            <div>
                              <label
                                htmlFor="password"
                                className={`block text-sm mb-2 dark:text-white ${
                                  methodsAuth.formState.errors.password
                                    ? "text-red-500"
                                    : ""
                                }`}
                              >
                                Contraseña
                              </label>
                              <div className="relative">
                                <input
                                  type="password"
                                  id="password"
                                  className={`py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70 ${
                                    methodsAuth.formState.errors.password
                                      ? "focus:border-red-500 focus:red-500 border-red-500"
                                      : ""
                                  }`}
                                  {...field}
                                />
                                {methodsAuth.formState.errors.password && (
                                  <span
                                    className="
                                  text-xs text-red-500"
                                  >
                                    Este campo es requerido
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                      >
                        {loading ? <Loader /> : "Iniciar sesion"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
