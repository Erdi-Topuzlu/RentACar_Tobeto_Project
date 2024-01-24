import React, { useEffect, useRef, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

import logo from "../../assets/all-images/logo.png";
import mobilLogo from "../../assets/all-images/mobil_logo.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import turkey from "../../assets/all-images/tr.png";
import england from "../../assets/all-images/en.png";
import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/joy";

const langSelect = (eventKey) => {
  i18n.changeLanguage(eventKey);
};

function Header() {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [showUi, setShowUi] = useState(true);
  const { details, status, error } = useSelector((state) => state.userDetail);
  const [token, setToken] = useState("");

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  const { t } = useTranslation();

  const navLinks = [
    {
      path: "/home",
      display: t("home"),
    },
    {
      path: "/about",
      display: t("about"),
    },
    {
      path: "/cars",
      display: t("cars"),
    },

    {
      path: "/campaigns",
      display: t("campaigns"),
    },
    {
      path: "/contact",
      display: t("contact"),
    },
  ];

  useEffect(() => {
    // JWT'den yetkilendirme bilgilerini okuma işlemi
    const storedJWT = localStorage.getItem("access_token");
    if (storedJWT) {
      setToken(storedJWT);
      setShowUi(false);
    } else {
      setShowUi(true);
    }
  }, []);

  const handleLogout = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/logout", {
        method: "POST",
        headers: headers,
      });

      if (response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setShowUi(true);
        navigate("/login");
      } else {
        console.error("Çıkış işlemi başarısız.");
      }
    } catch (error) {
      console.error("Çıkış işlemi sırasında bir hata oluştu:", error);
    }
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>{t("needhelp")}</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i> +1-202-555-0149
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {showUi ? (
                  <>
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-1"
                    >
                      <i className="ri-login-circle-line"></i>
                      {t("login")}
                    </Link>

                    <Link
                      to="/sign-up"
                      className="d-flex align-items-center gap-1"
                    >
                      <i className="ri-user-line"></i> {t("signup")}
                    </Link>
                  </>
                ) : (
                  <div>
                    <img
                      src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.webp"
                      alt={details.username}
                      className="header__user-image"
                    />
                    <span className="header__username">{details.username}</span>
                    <button
                      className="header__logout-btn btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
                <div className="vr" />
                <NavDropdown
                  menuVariant="dark"
                  //title={t("lang")}
                  title={
                    i18n.language === "en" ? (
                      <img width={24} src={england} />
                    ) : i18n.language === "tr" ? (
                      <img width={24} src={turkey} />
                    ) : // Handle other languages if needed
                    null
                  }
                  id="nav-dropdown"
                  onSelect={langSelect}
                >
                  {i18n.language === "en" ? (
                    <NavDropdown.Item eventKey="tr">
                      <img width={16} src={turkey} /> {t("tr-TR")}
                    </NavDropdown.Item>
                  ) : i18n.language === "tr" ? (
                    <NavDropdown.Item eventKey="en">
                      <img width={16} src={england} /> {t("en-US")}
                    </NavDropdown.Item>
                  ) : // Handle other languages if needed
                  null}
                </NavDropdown>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className="d-flex align-items-center gap-2">
                    <img width={125} src={logo} />
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>{t("country")}</h4>
                  <h6>
                    {t("city")}, {t("country")}
                  </h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>{t("workingdays")}</h4>
                  <h6>{t("hours")}</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i className="ri-phone-line"></i> {t("requestacall")}
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="rgba(255,255,255,1)"
                onClick={toggleMenu}
              >
                <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
              </svg>
            </span>

            {/* Navigation links for mobile */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                <div className="nav__right d-flex align-items-center">
                  <div className="menu">
                    <div className="text-center d-lg-none d-md-none d-sm-block">
                      <h1>
                        <Link to="/home" className="d-flex align-items-center">
                          <img width={100} src={logo} alt="Mobile Logo" />
                        </Link>
                      </h1>
                    </div>

                    {navLinks.map((item, index) => (
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive
                            ? "nav__active nav__item"
                            : "nav__item"
                        }
                        key={index}
                      >
                        {item.display}
                      </NavLink>
                    ))}

                    <Divider style={{ border: "2px solid #673ab7" }} />

                    <div>
                      {/* Login and Signup buttons for mobile */}
                      {showUi && (
                        <div className="ml-auto d-lg-none d-md-none d-md-flex d-sm-flex d-flex gap-2">
                          <Link
                            to="/login"
                            className="d-flex-inline align-items-center gap-2"
                          >
                            <i className="ri-login-circle-line"></i>
                            {t("login")}
                          </Link>

                          <Link
                            to="/sign-up"
                            className="d-flex-inline align-items-center gap-2"
                          >
                            <i className="ri-user-line"></i> {t("signup")}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-auto d-lg-none d-md-none d-sm-block ">
              <NavDropdown
                style={{ color: "#fff" }}
                menuVariant="dark"
                title={
                  i18n.language === "en" ? (
                    <img width={32} src={england} alt="EN" />
                  ) : i18n.language === "tr" ? (
                    <img width={32} src={turkey} alt="TR" />
                  ) : null
                }
                id="nav-dropdown"
                onSelect={langSelect}
              >
                {i18n.language === "en" ? (
                  <NavDropdown.Item eventKey="tr">
                    <img width={16} src={turkey} alt="TR" /> {t("tr-TR")}
                  </NavDropdown.Item>
                ) : i18n.language === "tr" ? (
                  <NavDropdown.Item eventKey="en">
                    <img width={16} src={england} alt="EN" /> {t("en-US")}
                  </NavDropdown.Item>
                ) : null}
              </NavDropdown>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Header;
