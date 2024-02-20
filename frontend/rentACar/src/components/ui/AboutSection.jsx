import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";
import { useTranslation } from "react-i18next";
import { AnimatedLTR, AnimatedUTD } from "./animation/animateDiv";
import { ReactSVG } from "react-svg";

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
            <AnimatedLTR direction="left">
              {/* Sol taraftan gelen içerik */}

              <div className="about__section-content">
                <h2 className="section__title">{t("welcome")}</h2>
                <h4 className="section__subtitle">{t("aboutUs")}</h4>
                <p className="section__description">{t("aboutUsDesc1")}</p>
                <p className="section__description">{t("aboutUsDesc2")}</p>

                <div className="row">
                  {/* Left */}
                  <div className="col-6">
                    <span className=" d-flex align-items-center gap-1 pb-3 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/check.svg" />
                      {t("aboutUsItem1")}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/check.svg" />
                      {t("aboutUsItem2")}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="col-6" style={{ columnGap: "4rem" }}>
                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/check.svg" />
                      {t("aboutUsItem3")}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/check.svg" />
                      {t("aboutUsItem4")}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedLTR>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <AnimatedUTD direction="up">
                <img src={aboutImg} alt="" className="w-100" />
              </AnimatedUTD>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
