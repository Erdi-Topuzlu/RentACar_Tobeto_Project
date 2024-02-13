import React from "react";
import { Col, Container, Row } from "reactstrap";
import { AnimatedUTD } from "./animation/animateDiv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const RedirectLogin = () => {
  const { t } = useTranslation();
  return (
    <Container className="mt-4">
      <Row>
        <Col lg="12" md="12">
          <AnimatedUTD direction="up">
            <div className="contact__info text-center mt-4 p-4">
              <h3 className="fw-bold mb-4">{t("rentThisCar")}</h3>
              <Link to={`/login`}>
                <button
                  style={{ color: "white" }}
                  className=" w-25 car__item-btn car__btn-rent link"
                >
                  {t("login")}
                </button>
              </Link>
              <span className="m-4"></span>
              <Link to={`/sign-up`}>
                <button
                  style={{ color: "white" }}
                  className=" w-25 car__item-btn car__btn-details"
                >
                  {t("signup")}
                </button>
              </Link>

            </div>
          </AnimatedUTD>
        </Col>
      </Row>
    </Container>
  );
};

export default RedirectLogin;
