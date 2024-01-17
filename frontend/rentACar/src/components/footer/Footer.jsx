import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

import tobeto from "../../assets/all-images/tobeto.png";
import logo from "../../assets/all-images/logo-footer.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const { t } = useTranslation();

  const quickLinks = [
    {
      path: "/about",
      display: t("about"),
    },
  
    {
      path: "#",
      display:  t("privacy"),
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
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                <img width={125} src={logo} />
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, distinctio, itaque reiciendis ab cupiditate harum ex
              quam veniam, omnis expedita animi quibusdam obcaecati mollitia?
              Delectus et ad illo recusandae temporibus?
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">{t("quick")}</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">{t("head")}</h5>
              <p className="office__info">123 Zindabazar, Sylhet, Bangladesh</p>
              <p className="office__info">{t("phone")}+0995345875365</p>

              <p className="office__info">Email : muhib5532@gmail.com</p>

              <p className="office__info">{t("office")}</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">{t("news")}</h5>
              <p className="footer__logo-content" color="#ffffff">{t("subscribe")}</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i className="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <span className="section__description d-flex align-items-center justify-content-center gap-1">
                <i className="ri-copyright-line"></i>Copyright {year}, 
                Tobeto {t("developed")} @Pair-1
              </span>
              <span className="section__description d-flex align-items-center justify-content-center">{t("allrights")}</span>
              
              <span className="d-flex align-items-center justify-content-center">
              <img width={100} src={tobeto} />
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
