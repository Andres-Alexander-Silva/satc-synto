import { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "@/features/auth/context/AuthContext";
import { Link } from "react-router-dom";
import ALLImages from "../../common/imagesdata";
import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/Action";
import store from "../../redux/store";
import {
  Closedmenu,
  Defaultmenu,
  DetachedFn,
  DoubletFn,
  iconOverayFn,
  iconText,
} from "../../common/switcherdata";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface datatype {
  local_varaiable: any;
  ThemeChanger: any;
}

const Navbar = ({ local_varaiable, ThemeChanger }: datatype) => {
  const { logout } = useContext(AuthContext);
  const username = cookies.get("user");

  const handleLogout = () => {
    const token = cookies.get("token");
    if (token !== null) {
      logout(token);
    }
  };
  useEffect(() => {
    function debounce<T extends (...args: any[]) => void>(
      func: T,
      delay: number
    ): (...args: Parameters<T>) => void {
      let timeoutId: ReturnType<typeof setTimeout>;

      const debounced: (...args: Parameters<T>) => void = function (
        this: ThisParameterType<T>,
        ...args: Parameters<T>
      ): void {
        const context = this;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          func.apply(context, args);
        }, delay);
      };

      return debounced;
    }

    const handleResize = () => {
      const windowObject = window;
      if (windowObject.innerWidth <= 991) {
        const theme = store.getState();
        ThemeChanger({ ...theme, toggled: "close" });
      } else {
        if (localStorage.Syntoverticalstyles) {
          let verticalStyles = localStorage.getItem("Syntoverticalstyles");
          switch (verticalStyles) {
            case "default":
              Defaultmenu(ThemeChanger);
              break;
            case "closed":
              Closedmenu(ThemeChanger);
              break;
            case "icontext":
              iconText(ThemeChanger);
              break;
            case "overlay":
              iconOverayFn(ThemeChanger);
              break;
            case "detached":
              DetachedFn(ThemeChanger);
              break;
            case "doublemenu":
              DoubletFn(ThemeChanger);
              break;
          }
        } else {
          const theme = store.getState();
          ThemeChanger({
            ...theme,
            toggled: `${
              localStorage.SyntodataToggle == "menu-click-closed"
                ? "menu-click-closed"
                : ""
            }`,
            // "dataVerticalStyle":"default"
          });
        }
      }
    };
    handleResize(); // Check on component mount
    const debouncedResize = debounce(handleResize, 300);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  function menuClose() {
    const theme = store.getState();

    ThemeChanger({ ...theme, toggled: "close" });
  }

  const toggleSidebar = () => {
    const theme = store.getState();
    let sidemenuType = theme.dataNavLayout;

    if (window.innerWidth >= 992) {
      ThemeChanger({
        ...theme,
        toggled:
          theme.toggled === ""
            ? localStorage.Syntonavstyles === "menu-click"
              ? "menu-click-closed"
              : localStorage.Syntonavstyles === "icon-click"
              ? "icon-click-closed"
              : localStorage.Syntonavstyles === "menu-hover"
              ? "menu-hover-closed"
              : localStorage.Syntonavstyles === "icon-hover"
              ? "icon-hover-closed"
              : ""
            : "",
      });

      if (sidemenuType === "vertical") {
        let verticalStyle = theme.dataVerticalStyle;
        switch (verticalStyle) {
          // closed
          case "closed":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "close-menu-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "close-menu-close" });
            }
            break;
          // icon-overlay
          case "overlay":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-overlay-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              if (window.innerWidth >= 992) {
                ThemeChanger({ ...theme, toggled: "icon-overlay-close" });
              }
            }
            break;
          // icon-text
          case "icontext":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "icon-text-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "icon-text-close" });
            }
            break;
          // doublemenu
          case "doublemenu":
            ThemeChanger({ ...theme, dataNavStyle: "" });
            if (theme.toggled === "double-menu-open") {
              ThemeChanger({ ...theme, toggled: "double-menu-close" });
            } else {
              let sidemenu = document.querySelector(".side-menu__item.active");
              if (sidemenu) {
                ThemeChanger({ ...theme, toggled: "double-menu-open" });
                if (sidemenu.nextElementSibling) {
                  sidemenu.nextElementSibling.classList.add(
                    "double-menu-active"
                  );
                } else {
                  ThemeChanger({ ...theme, toggled: "" });
                }
              }
            }

            break;
          // detached
          case "detached":
            if (theme.toggled === "detached-close") {
              ThemeChanger({ ...theme, toggled: "" });
            } else {
              ThemeChanger({ ...theme, toggled: "detached-close" });
            }
            break;
          // default
          case "default":
            ThemeChanger({ ...theme, toggled: "" });
        }
      }
    } else {
      const theme = store.getState();
      if (theme.toggled === "close") {
        ThemeChanger({ ...theme, toggled: "open" });
        setTimeout(() => {
          if (theme.toggled == "open") {
            document
              .querySelector("#responsive-overlay")
              ?.classList.add("active");
            document
              .querySelector("#responsive-overlay")
              ?.addEventListener("click", () => {
                document
                  .querySelector("#responsive-overlay")
                  ?.classList.remove("active");
                menuClose();
              });
          }
          window.addEventListener("resize", () => {
            if (window.screen.width >= 992) {
              document
                .querySelector("#responsive-overlay")
                ?.classList.remove("active");
            }
          });
        }, 100);
      } else {
        ThemeChanger({ ...theme, toggled: "close" });
      }
    }
  };

  //Dark Model
  const ToggleDark = () => {
    ThemeChanger({
      ...local_varaiable,
      class: local_varaiable.class == "dark" ? "light" : "dark",
      dataHeaderStyles:
        local_varaiable.dataHeaderStyles == "dark" ? "light" : "dark",
      dataMenuStyles:
        local_varaiable.dataNavLayout == "horizontal" ? "dark" : "dark",
    });
    const theme = store.getState();

    if (theme.class != "dark") {
      ThemeChanger({ ...theme, bodyBg: "", darkBg: "", darkBgRGB: "" });
      localStorage.setItem("Syntolighttheme", "light");
      localStorage.removeItem("Syntodarktheme");
    } else {
      localStorage.setItem("Syntodarktheme", "dark");
      localStorage.removeItem("Syntolighttheme");
    }
  };

  //full screen
  let elem = document.documentElement;
  let [i, seti] = useState(true);
  const Fullscreen = (vale: any) => {
    switch (vale) {
      case true:
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          elem.msRequestFullscreen();
        }
        seti(false);
        break;
      case false:
        document.exitFullscreen();
        seti(true);
        break;
    }
  };

  useEffect(() => {
    const navbar = document.querySelector(".header") as HTMLElement;
    const navbar1 = document.querySelector(".app-sidebar") as HTMLElement;
    const sticky = navbar.clientHeight;
    // const sticky1 = navbar1.clientHeight;

    function stickyFn() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky-pin");
        navbar1.classList.add("sticky-pin");
      } else {
        navbar.classList.remove("sticky-pin");
        navbar1.classList.remove("sticky-pin");
      }
    }

    window.addEventListener("scroll", stickyFn);
    window.addEventListener("DOMContentLoaded", stickyFn);

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", stickyFn);
      window.removeEventListener("DOMContentLoaded", stickyFn);
    };
  }, []);

  return (
    <Fragment>
      <header className="header custom-sticky !top-0 !w-full">
        <nav className="main-header" aria-label="Global">
          <div className="header-content">
            <div className="header-left">
              <div className="">
                <button
                  type="button"
                  className="sidebar-toggle"
                  onClick={() => toggleSidebar()}
                >
                  <span className="sr-only">Toggle Navigation</span>
                  <i className="ri-arrow-right-circle-line header-icon"></i>
                </button>
              </div>
            </div>

            <div className="responsive-logo">
              <Link
                className="responsive-logo-dark"
                to={`${import.meta.env.BASE_URL}dashboards/sales`}
                aria-label="Brand"
              >
                <img src={ALLImages("logo")} alt="logo" className="mx-auto" />
              </Link>
              <Link
                className="responsive-logo-light"
                to={`${import.meta.env.BASE_URL}dashboards/sales`}
                aria-label="Brand"
              >
                <img
                  src={ALLImages("desktoplight")}
                  alt="logo1"
                  className="mx-auto"
                />
              </Link>
            </div>

            <div className="header-right">
              <div className="responsive-headernav">
                <div className="header-nav-right">
                  <div
                    className="header-theme-mode hidden sm:block"
                    onClick={() => ToggleDark()}
                  >
                    <Link
                      aria-label="anchor"
                      className="hs-dark-mode-active:hidden flex hs-dark-mode group flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                      to="#"
                      data-hs-theme-click-value="dark"
                    >
                      <i className="ri-moon-line header-icon"></i>
                    </Link>
                    <Link
                      aria-label="anchor"
                      className="hs-dark-mode-active:flex hidden hs-dark-mode group flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                      to="#"
                      data-hs-theme-click-value="light"
                    >
                      <i className="ri-sun-line header-icon"></i>
                    </Link>
                  </div>
                  <div
                    className="header-fullscreen hidden lg:block"
                    onClick={() => Fullscreen(i)}
                  >
                    <Link
                      aria-label="anchor"
                      to="#"
                      className="inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-gray-100 hover:bg-gray-200 text-gray-500 align-middle focus:outline-none focus:ring-0 focus:ring-gray-400 focus:ring-offset-0 focus:ring-offset-white transition-all text-xs dark:bg-bgdark dark:hover:bg-black/20 dark:text-white/70 dark:hover:text-white dark:focus:ring-white/10 dark:focus:ring-offset-white/10"
                    >
                      <i className="ri-fullscreen-line header-icon full-screen-open"></i>
                      <i className="ri-fullscreen-line header-icon fullscreen-exit-line hidden"></i>
                    </Link>
                  </div>
                  <div
                    className="header-profile hs-dropdown ti-dropdown"
                    data-hs-dropdown-placement="bottom-right"
                  >
                    <button
                      id="dropdown-profile"
                      type="button"
                      className="hs-dropdown-toggle ti-dropdown-toggle gap-2 p-0 flex-shrink-0 h-8 w-8 rounded-full border-0 shadow-none focus:ring-gray-400 text-xs dark:focus:ring-white/10"
                    >
                      <img
                        className="inline-block rounded-full ring-2 ring-white dark:ring-white/10"
                        src="https://fastly.picsum.photos/id/728/128/128.jpg?hmac=mukGUHSMSXAbGJcAiZ3fx-BsUjNGhnFrGAoINxDcog0"
                        alt="Image Description"
                      />
                    </button>
                    <div
                      className="hs-dropdown-menu ti-dropdown-menu border-0 w-[20rem]"
                      aria-labelledby="dropdown-profile"
                    >
                      <div className="ti-dropdown-header !bg-primary flex items-center">
                        <div className="ltr:mr-3 rtl:ml-3">
                          <img
                            className="avatar shadow-none rounded-full !ring-transparent"
                            src="https://fastly.picsum.photos/id/728/128/128.jpg?hmac=mukGUHSMSXAbGJcAiZ3fx-BsUjNGhnFrGAoINxDcog0"
                            alt="profile-img"
                          />
                        </div>
                        <div>
                          <p className="ti-dropdown-header-title !text-white">
                            {username}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 ti-dropdown-divider">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="ti-dropdown-item"
                        >
                          <i className="ti ti-logout  text-lg"></i>
                          Cerrar sesion
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { ThemeChanger })(Navbar);
