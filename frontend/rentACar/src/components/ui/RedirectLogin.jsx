import React from "react";
import { Col, Container, Row } from "reactstrap";
import { AnimatedUTD } from "./animation/animateDiv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";


const RedirectLogin = ({ isEnabled, tokenn }) => {
  const { t } = useTranslation();

  if (isEnabled === "false") {
    return (
      <Row>
        <Col lg="12" md="12">
          <AnimatedUTD direction="up">
            <Paper>
            <div className="contact__info text-center mt-4 p-4">
              <h4 className="fw-bold mb-4">{t("For rent the car")}</h4>
              <hr/>
              <h3>{t("Please check your mail and verify your account ")}</h3>
            </div>
            <div className="text-center p-2">
            <Link to={`/sign-up`}>
                <button
                  style={{ color: "white" }}
                  className="w-25 car__item-btn car__btn-details"
                >
                  {t("verifyMailSendAgain")}
                </button>
              </Link>
            </div>
            </Paper>
          </AnimatedUTD>
        </Col>
      </Row>
    );
  }

  if (!tokenn) {
    return (
      <Row>
        <Col lg="12" md="12">
          <AnimatedUTD direction="up">
            <div className="contact__info text-center mt-4 p-4">
              <h3 className="fw-bold mb-4">{t("rentThisCar")}</h3>
              <Link to={`/login`}>
                <button
                  style={{ color: "white" }}
                  className="w-25 car__item-btn car__btn-rent link"
                >
                  {t("login")}
                </button>
              </Link>
              <span className="m-4"></span>
              <Link to={`/sign-up`}>
                <button
                  style={{ color: "white" }}
                  className="w-25 car__item-btn car__btn-details"
                >
                  {t("signup")}
                </button>
              </Link>
            </div>
          </AnimatedUTD>
        </Col>
      </Row>
    );
  }

  return (
    <Container className="mt-4">
      {tokenn && isEnabled === "true" && (
        <Row>
          <Col lg="12" md="12">
            <AnimatedUTD direction="up">
              <div className="contact__info text-center mt-4 p-4">
                <h3 className="fw-bold mb-4">{t("rentThisCar")}</h3>
                <Link to={`/login`}>
                  <button
                    style={{ color: "white" }}
                    className="w-25 car__item-btn car__btn-rent link"
                  >
                    {t("login")}
                  </button>
                </Link>
                <span className="m-4"></span>
                <Link to={`/sign-up`}>
                  <button
                    style={{ color: "white" }}
                    className="w-25 car__item-btn car__btn-details"
                  >
                    {t("signup")}
                  </button>
                </Link>
              </div>
            </AnimatedUTD>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RedirectLogin;