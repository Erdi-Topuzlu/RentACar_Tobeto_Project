import React from "react";
import { Col, Container, Row } from "reactstrap";
import { AnimatedUTD } from "./animation/animateDiv";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../service/ToastifyService";
import axiosInstance from "../../redux/utilities/interceptors/axiosInterceptors";


const RedirectLogin = ({ isEnabled, tokenn}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { details } = useSelector((state) => state.userDetail);
  const { t } = useTranslation();


  const sendMail = async () => {
    setIsLoading(true); // Butonu devre dışı bırak

    const data = {
      email: details.email,
    };

    try {
      const response = await axiosInstance.post(
        "api/v1/auth/again-send-email-verification",
        data
      );
      toastSuccess(t("successSendEmailVerification"));
    } catch (error) {
      console.error(error)

    } finally {
      setIsLoading(false);
    }
  };



  if (isEnabled === "false") {
    return (
      <Row>
        <Col lg="12" md="12">
          <AnimatedUTD direction="up">
            <Paper>
              <div className="contact__info text-center mt-4 p-4">
                <h4 className="fw-bold mb-4">{t("For rent the car")}</h4>
                <hr />
                <h3>{t("Please check your mail and verify your account ")}</h3>
              </div>
              <div className="text-center p-2">
                <Link >
                  <button
                    disabled={isLoading} 
                    onClick={sendMail}
                    style={{ color: "white" }}
                    className="w-25 car__item-btn car__btn-details"
                  >
                    {isLoading ? t("Sending...") : t("verifyMailSendAgain")}
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