import React, { useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

import logo from "../../assets/all-images/logo.png";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import turkey from "../../assets/all-images/tr.png";
import england from "../../assets/all-images/en.png";
import { NavDropdown } from "react-bootstrap";

const langSelect = (eventKey) => {
  i18n.changeLanguage(eventKey);
};

function Header() {
  const menuRef = useRef(null);

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
      path: "/blogs",
      display: t("blog"),
    },
    {
      path: "/contact",
      display: t("contact"),
    },
  ];

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
                <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i className="ri-login-circle-line"></i>
                  {t("login")}
                </Link>

                <Link
                  to="/sign-up"
                  className=" d-flex align-items-center gap-1"
                >
                  <i className="ri-user-line"></i> {t("signup")}
                </Link>
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
                  {
                    i18n.language === "en" ? (
                      <NavDropdown.Item eventKey="tr">
                    <img width={16} src={turkey} /> {t("tr-TR")}
                  </NavDropdown.Item>
                    ) : i18n.language === "tr" ? (
                      <NavDropdown.Item eventKey="en">
                    <img width={16} src={england} /> {t("en-US")}
                  </NavDropdown.Item>
                    ) : // Handle other languages if needed
                    null
                  }
                 
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
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder={t("search")} />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default Header;
