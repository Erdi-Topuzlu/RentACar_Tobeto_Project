import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";
import { useTranslation } from "react-i18next";
import {  AnimatedLTR, AnimatedUTD } from "./animation/animateDiv";


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
                <h4 className="section__subtitle">{t("aboutUs")}</h4>
                <h2 className="section__title">{t("welcome")}</h2>
                <p className="section__description">{t("aboutUsDesc1")}</p>
                <p className="section__description">{t("aboutUsDesc2")}</p>

                <div className="row">
                  {/* Left */}
                  <div className="col-6">
                    <span className=" d-flex align-items-center gap-1 pb-3 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                      </svg>
                      {t("aboutUsItem1")}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                      </svg>
                      {t("aboutUsItem2")}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="col-6" style={{ columnGap: "4rem" }}>
                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                      </svg>
                      {t("aboutUsItem3")}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
                      </svg>
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
