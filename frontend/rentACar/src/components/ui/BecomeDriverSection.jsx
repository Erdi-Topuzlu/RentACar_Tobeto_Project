import React from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/all-images/toyota-offer-2.png";
import { useTranslation } from "react-i18next";
import { AnimatedLTR, AnimatedUTD } from "./animation/animateDiv";

const BecomeDriverSection = () => {
  const { t } = useTranslation();
  return (
    <section className="become__driver">
      <Container>
        <Row>
          
          <Col lg="6" md="6" sm="12" className="become__driver-img">
          <AnimatedLTR direction="left">
            <img src={driverImg} alt="" className="w-100" />
            </AnimatedLTR>
          </Col>

          <Col lg="6" md="6" sm="12">
          <AnimatedUTD direction="up">
            <h2 className="section__title become__driver-title">
              {t('earnMoney')}
            </h2>
            <button className="btn become__driver-btn mt-4">
            {t('becomeDriver')}
            </button>
            </AnimatedUTD>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
