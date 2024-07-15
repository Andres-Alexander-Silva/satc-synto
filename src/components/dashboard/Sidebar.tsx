import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePermissions } from "@/features/usuarios/hooks";
import { TransformedMenuItem } from "@/features/usuarios/interfaces/usuario.interface";
import {
  AiFillHome,
  AiFillFileText,
  AiFillFileMarkdown,
  AiFillBook,
  AiFillSetting,
  AiFillDatabase,
} from "react-icons/ai";
import { IconType } from "react-icons";
import Logo from "@/assets/images/llogo.png";

let history: string[] = [];

interface IconMap {
  [key: string]: IconType;
}

const iconMap: IconMap = {
  AiFillHome: AiFillHome,
  AiFillFileText: AiFillFileText,
  AiFillFileMarkdown: AiFillFileMarkdown,
  AiFillBook: AiFillBook,
  AiFillSetting: AiFillSetting,
  AiFillDatabase: AiFillDatabase,
};

const RenderIcon = (icono: any) => {
  const IconComponent = iconMap[icono.icono];

  if (IconComponent) {
    return <IconComponent />;
  } else {
    return <div>Icono no encontrado</div>;
  }
};

const Sidebar = () => {
  const { permissions } = usePermissions();
  const [menuitems, setMenuitems] =
    useState<TransformedMenuItem[]>(permissions);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  useEffect(() => {
    if (permissions.length > 0 && !permissionsLoaded) {
      setMenuitems(permissions);
      setPermissionsLoaded(true);
    }
  }, [permissions, permissionsLoaded]);

  useEffect(() => {
    history.push(location.pathname);
    if (history.length > 2) {
      history.shift();
    }
    if (history[0] !== history[1]) {
      setSidemenu("");
    }
    let mainContent = document.querySelector(".main-content") as Element;
    mainContent.addEventListener("click", mainContentClickFn);
    return () => {
      mainContent.removeEventListener("click", mainContentClickFn);
    };
  }, [location, setSidemenu]);

  useEffect(() => {
    const html = document.documentElement;
    if (
      html.getAttribute("data-nav-layout") === "horizontal" &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
  }, []);

  function mainContentClickFn() {
    const html = document.documentElement;
    if (
      html.getAttribute("data-nav-layout") === "horizontal" &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
  }

  function setSidemenu(list: any) {
    let dd = list ? list.path + "/" : location.pathname;
    if (menuitems) {
      menuitems.filter((mainlevel) => {
        if (mainlevel.Items) {
          mainlevel.Items.filter((items: any) => {
            items.active = false;
            items.selected = false;

            if (dd === "/") {
              dd = "/main/inicio/";
            }
            if (dd === items.path + "/") {
              items.active = true;
              items.selected = true;
            }
            if (items.children) {
              items.children.filter((submenu: any) => {
                submenu.active = false;
                submenu.selected = false;
                if (dd === submenu.path + "/") {
                  items.active = true;
                  items.selected = true;
                  submenu.active = true;
                  submenu.selected = true;
                }
                if (submenu.children) {
                  submenu.children.filter((submenu1: any) => {
                    submenu1.active = false;
                    submenu1.selected = false;
                    if (dd === submenu1.path + "/") {
                      items.active = true;
                      items.selected = true;
                      submenu.active = true;
                      submenu.selected = true;
                      submenu1.active = true;
                      submenu1.selected = true;
                    }
                    return submenu1;
                  });
                }
                return submenu;
              });
            }
            return items;
          });
        }
        setMenuitems((arr) => [...arr]);
        return mainlevel;
      });
    }
  }

  function toggleSidemenu(item: any) {
    {
      // To show/hide the menu
      if (!item.active) {
        menuitems.filter((mainlevel) => {
          if (mainlevel.Items) {
            mainlevel.Items.filter((sublevel: any) => {
              sublevel.active = false;
              if (item === sublevel) {
                sublevel.active = true;
              }
              if (sublevel.children) {
                sublevel.children.filter((sublevel1: any) => {
                  sublevel1.active = false;
                  if (item === sublevel1) {
                    sublevel.active = true;
                    sublevel1.active = true;
                  }
                  if (sublevel1.children) {
                    sublevel1.children.filter((sublevel2: any) => {
                      sublevel2.active = false;
                      if (item === sublevel2) {
                        sublevel.active = true;
                        sublevel1.active = true;
                        sublevel2.active = true;
                      }
                      if (sublevel2.children) {
                        sublevel2.children.filter((sublevel3: any) => {
                          sublevel3.active = false;
                          if (item === sublevel3) {
                            sublevel.active = true;
                            sublevel1.active = true;
                            sublevel2.active = true;
                            sublevel3.active = true;
                          }
                          return sublevel2;
                        });
                      }
                      return sublevel2;
                    });
                  }
                  return sublevel1;
                });
              }
              return sublevel;
            });
          }
          return mainlevel;
        });
      } else {
        item.active = !item.active;
      }
    }

    setMenuitems((arr) => [...arr]);
  }

  function clearMenuActive() {
    permissions.filter((mainlevel: any) => {
      if (mainlevel.Items) {
        mainlevel.Items.filter((sublevel: any) => {
          sublevel.active = false;
          if (sublevel.children) {
            sublevel.children.filter((sublevel1: any) => {
              sublevel1.active = false;
              if (sublevel1.children) {
                sublevel1.children.filter((sublevel2: any) => {
                  sublevel2.active = false;
                  return sublevel2;
                });
              }
              return sublevel1;
            });
          }
          return sublevel;
        });
      }
      return mainlevel;
    });
    setMenuitems((arr) => [...arr]);
  }

  function Onhover() {
    let html = document.querySelector("html") as HTMLElement;
    html.setAttribute("icon-overlay", "open");
  }

  function Outhover() {
    let html = document.querySelector("html") as HTMLElement;
    html.removeAttribute("icon-overlay");
  }

  function Clickhandelar() {
    if (localStorage.getItem("Syntoverticalstyles") == "icontext") {
      document.querySelector("html")?.setAttribute("icon-text", "open");
    }
    if (
      document.querySelector("html")?.getAttribute("data-vertical-style") ==
      "doublemenu"
    ) {
      document
        .querySelector("html")
        ?.setAttribute(
          "toggled",
          document.querySelector("html")?.getAttribute("toggled") ==
            "double-menu-open"
            ? ""
            : "double-menu-open"
        );
    }
  }

  function menuClose() {
    let html = document.querySelector("html") as HTMLElement;
    html.setAttribute("toggled", "close");
    document.querySelector("#responsive-overlay")?.classList.remove("active");
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      let mainContent = document.querySelector(".main-content") as HTMLElement;
      setTimeout(() => {
        if (window.innerWidth <= 992) {
          mainContent.addEventListener("click", menuClose);
        } else {
          mainContent.removeEventListener("click", menuClose);
        }
      }, 100);
    });
  }, []);

  const switcherArrowFn = () => {
    function slideClick() {
      const slide = document.querySelectorAll<HTMLElement>(".slide");
      const slideMenu = document.querySelectorAll<HTMLElement>(".slide-menu");
      slide.forEach((element) => {
        if (element.classList.contains("is-expanded")) {
          element.classList.remove("is-expanded");
        }
      });
      slideMenu.forEach((element) => {
        if (element.classList.contains("open")) {
          element.classList.remove("open");
          element.style.display = "none";
        }
      });
    }

    slideClick();
  };

  let slideRight = () => {
    let menuNav: any = document.querySelector(".main-menu");
    let mainContainer1: any = document.querySelector(".main-sidebar");
    if (menuNav && mainContainer1) {
      const isRTL =
        document.querySelector("html")?.getAttribute("dir") === "rtl";
      const menuNavStyle = getComputedStyle(menuNav);
      let marginLeftValue = Math.ceil(
        Number(menuNavStyle.marginLeft.split("px")[0])
      );
      let marginRightValue = Math.ceil(
        Number(menuNavStyle.marginRight.split("px")[0])
      );
      let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;

      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!isRTL) {
          if (Math.abs(check) > Math.abs(marginLeftValue)) {
            menuNav.style.marginRight = "0px";
            if (
              !(
                Math.abs(check) >
                Math.abs(marginLeftValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
              document.querySelector("#slide-right")?.classList.add("hidden");
            }
            menuNav.style.marginLeft =
              Number(menuNav.style.marginLeft.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";
            document.querySelector("#slide-right")?.classList.remove("hidden");
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginLeft = "0px";
            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              document.querySelector("#slide-right")?.classList.add("hidden");
            }
            menuNav.style.marginRight =
              Number(menuNav.style.marginRight.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";
            document.querySelector("#slide-left")?.classList.remove("hidden");
          }
        }
      }
      let element: any = document.querySelector(".main-menu > .slide.open");
      let element1: any = document.querySelector(
        ".main-menu > .slide.open > ul"
      );
      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
  };

  let slideLeft = () => {
    let menuNav: any = document.querySelector(".main-menu");
    let mainContainer1: any = document.querySelector(".main-sidebar");
    if (menuNav && mainContainer1) {
      let marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginLeft.split("px")[0])
      );
      let marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginRight.split("px")[0])
      );
      let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      let mainContainer1Width = mainContainer1.offsetWidth;
      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        if (!(document.querySelector("html")?.getAttribute("dir") === "rtl")) {
          if (Math.abs(check) <= Math.abs(marginLeftValue)) {
            menuNav.style.marginLeft = "0px";
          }
        } else {
          if (Math.abs(check) > Math.abs(marginRightValue)) {
            menuNav.style.marginLeft = 0;
            if (
              !(
                Math.abs(check) >
                Math.abs(marginRightValue) + mainContainer1Width
              )
            ) {
              mainContainer1Width =
                Math.abs(check) - Math.abs(marginRightValue);
              document.querySelector("#slide-right")?.classList.add("hidden");
            }
            menuNav.style.marginRight =
              Number(menuNav.style.marginRight.split("px")[0]) -
              Math.abs(mainContainer1Width) +
              "px";
            document.querySelector("#slide-left")?.classList.remove("hidden");
          }
        }
      }
      let element: any = document.querySelector(".main-menu > .slide.open");
      let element1: any = document.querySelector(
        ".main-menu > .slide.open >ul"
      );
      if (element) {
        element.classList.remove("active");
      }
      if (element1) {
        element1.style.display = "none";
      }
    }

    switcherArrowFn();
    return;
  };

  return (
    <Fragment>
      <aside
        className="app-sidebar"
        id="sidebar"
        onMouseOver={() => Onhover()}
        onMouseOut={() => Outhover()}
      >
        <div className="main-sidebar-header">
          <Link to="inicio" className="header-logo">
            <img
              src={Logo}
              alt="logo"
              className="main-logo desktop-logo w-48 h-36"
            />
            <img
              src={Logo}
              alt="logo"
              className="main-logo toggle-logo w-48 h-36"
            />
            <img
              src={Logo}
              alt="logo"
              className="main-logo desktop-dark w-48 h-36"
            />
            <img
              src={Logo}
              alt="logo"
              className="main-logo toggle-dark w-48 h-36"
            />
          </Link>
        </div>

        <div className="main-sidebar" id="sidebar-scroll">
          <nav className="main-menu-container nav nav-pills flex-column sub-open">
            <div
              className="slide-left"
              id="slide-left"
              onClick={() => {
                slideLeft();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
            </div>
            <ul className="main-menu">
              {menuitems.map((firstlayer: any) => {
                return (
                  <Fragment key={Math.random()}>
                    {firstlayer.Items.map((secondlayer: any) =>
                      secondlayer.type === "link" ? (
                        <li
                          className={`slide ${
                            secondlayer.active ? "active" : ""
                          }`}
                          key={Math.random()}
                        >
                          <Link
                            onClick={(_event) => {
                              setSidemenu(secondlayer);
                            }}
                            to={secondlayer.path + "/"}
                            className={`side-menu__item ${
                              secondlayer.selected ? "active" : ""
                            }`}
                          >
                            {secondlayer.icon}{" "}
                            <span className="side-menu__label">
                              {secondlayer.title}
                            </span>
                          </Link>
                        </li>
                      ) : secondlayer.type === "sub" ? (
                        <li
                          onClick={() => {
                            Clickhandelar();
                          }}
                          className={`slide has-sub ${
                            secondlayer.active ? "open" : ""
                          }`}
                          key={Math.random()}
                        >
                          <Link
                            to="#"
                            className={`side-menu__item ${
                              secondlayer.selected ? "active" : ""
                            }`}
                            onClick={(event) => {
                              event.preventDefault();
                              toggleSidemenu(secondlayer);
                            }}
                          >
                            <RenderIcon icono={secondlayer.icon} />
                            <span className="side-menu__label">
                              {secondlayer.title}
                            </span>
                            <i className="ri ri-arrow-right-s-line side-menu__angle"></i>
                          </Link>
                          <ul
                            className={`slide-menu child1 ${
                              secondlayer.active ? "!block" : ""
                            }`}
                          >
                            <li className="slide side-menu__label1">
                              <Link to="#">{secondlayer.title}</Link>
                            </li>
                            {secondlayer.children.map((thirdlayer: any) => (
                              <Fragment key={Math.random()}>
                                {thirdlayer.type === "link" ? (
                                  <li
                                    className={`slide ${
                                      thirdlayer.active ? "active" : ""
                                    }`}
                                  >
                                    <Link
                                      onClick={(_event) => {
                                        setSidemenu(thirdlayer);
                                      }}
                                      to={thirdlayer.path + "/"}
                                      className={`side-menu__item ${
                                        thirdlayer.selected ? "active" : ""
                                      }`}
                                    >
                                      {thirdlayer.icon}
                                      {thirdlayer.title}
                                    </Link>
                                  </li>
                                ) : thirdlayer.type === "sub" ? (
                                  <li
                                    className={`slide has-sub ${
                                      secondlayer.active ? "open" : ""
                                    }`}
                                  >
                                    <Link
                                      to="#"
                                      className="side-menu__item"
                                      onClick={(evnt) => {
                                        evnt.preventDefault();
                                        toggleSidemenu(thirdlayer);
                                      }}
                                    >
                                      {thirdlayer.icon}{" "}
                                      <span className="">
                                        {thirdlayer.title}
                                      </span>
                                      <i className="ri ri-arrow-right-s-line side-menu__angle"></i>
                                    </Link>
                                    <ul
                                      className={`slide-menu child2 ${
                                        thirdlayer.active ? "!block" : ""
                                      }`}
                                    >
                                      {thirdlayer.children.map(
                                        (fourthlayer: any) => (
                                          <Fragment key={Math.random()}>
                                            {fourthlayer.type === "link" ? (
                                              <li
                                                className={`slide ${
                                                  fourthlayer.active
                                                    ? "active"
                                                    : ""
                                                }`}
                                              >
                                                <Link
                                                  onClick={(_event) => {
                                                    setSidemenu(fourthlayer);
                                                  }}
                                                  to={fourthlayer.path + "/"}
                                                  className={`side-menu__item ${
                                                    fourthlayer.selected
                                                      ? "active"
                                                      : ""
                                                  }`}
                                                >
                                                  {fourthlayer.icon}
                                                  {fourthlayer.title}
                                                </Link>
                                              </li>
                                            ) : fourthlayer.type === "sub" ? (
                                              <li
                                                className={`slide has-sub ${
                                                  fourthlayer.active
                                                    ? "open"
                                                    : ""
                                                }`}
                                              >
                                                <Link
                                                  to="#"
                                                  className="side-menu__item"
                                                  onClick={(evnt) => {
                                                    evnt.preventDefault();
                                                    toggleSidemenu(fourthlayer);
                                                  }}
                                                >
                                                  {fourthlayer.icon}{" "}
                                                  <span className="">
                                                    {fourthlayer.title}
                                                  </span>
                                                  <i className="ri ri-arrow-right-s-line side-menu__angle"></i>
                                                </Link>

                                                <ul
                                                  className={`slide-menu child3 ${
                                                    fourthlayer.active
                                                      ? "!block"
                                                      : ""
                                                  }`}
                                                >
                                                  {fourthlayer.children.map(
                                                    (fivthlayer: any) => (
                                                      <Fragment
                                                        key={Math.random()}
                                                      >
                                                        {fivthlayer.type ===
                                                        "link" ? (
                                                          <li className="slide">
                                                            <Link
                                                              to={
                                                                fourthlayer.path +
                                                                "/"
                                                              }
                                                              className="side-menu__item"
                                                            >
                                                              {fivthlayer.icon}{" "}
                                                              {fivthlayer.title}
                                                            </Link>
                                                          </li>
                                                        ) : (
                                                          <Link
                                                            to="#"
                                                            className="side-menu__item"
                                                            onClick={(evnt) => {
                                                              evnt.preventDefault();
                                                              toggleSidemenu(
                                                                fivthlayer
                                                              );
                                                            }}
                                                          >
                                                            {fivthlayer.icon}{" "}
                                                            <span className="">
                                                              {fivthlayer.title}
                                                            </span>
                                                            <i className="ri ri-arrow-right-s-line side-menu__angle"></i>
                                                          </Link>
                                                        )}
                                                      </Fragment>
                                                    )
                                                  )}
                                                </ul>
                                              </li>
                                            ) : (
                                              ""
                                            )}
                                          </Fragment>
                                        )
                                      )}
                                    </ul>
                                  </li>
                                ) : (
                                  ""
                                )}
                              </Fragment>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        ""
                      )
                    )}
                  </Fragment>
                );
              })}
            </ul>
            <div
              className="slide-right"
              onClick={() => {
                slideRight();
              }}
              id="slide-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
              </svg>
            </div>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
};

export default Sidebar;
