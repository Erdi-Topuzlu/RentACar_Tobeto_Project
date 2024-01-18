import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";
import { useTranslation } from "react-i18next";

const AboutSection = ({ aboutClass }) => {
  const { t } = useTranslation();
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >

     <Container>
        <Row>
          <Col lg="6" md="6" sm="12">
            <div className="about__section-content">
              <h4 className="section__subtitle">{t("aboutUs")}</h4>
              <h2 className="section__title">{t("welcome")}</h2>
              <p className="section__description">{t("aboutUsDesc1")}</p>
              <p className="section__description">{t("aboutUsDesc2")}</p>
              <Col lg="12" md="12" sm="12" className="mb-3">
                <div className="about__section-item d-flex align-items-center">
                  <p className="section__description d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>
                    {t("aboutUsItem1")}
                  </p>

                  <p className="section__description d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>
                    {t("aboutUsItem2")}
                  </p>
                </div>
              </Col>

              <Col lg="12" md="12" sm="12" className="mb-3">
                <div className="about__section-item d-flex align-items-center">
                  <p className="section__description d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>
                    {t("aboutUsItem3")}
                  </p>

                  <p className="section__description d-flex align-items-center gap-2">
                    <i className="ri-checkbox-circle-line"></i>
                    {t("aboutUsItem4")}
                  </p>
                </div>
              </Col>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
