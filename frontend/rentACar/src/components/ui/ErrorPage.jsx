import React from "react";
import { Container } from "reactstrap";
import Helmet from "../Helmet";
import { useTranslation } from "react-i18next";

const ErrorPage = ({ errorMessage }) => {

  const { t } = useTranslation();

  console.log(errorMessage);
  return (
    <Helmet title={t("error")}>
      <section>
        <Container className="d-flex justify-content-center">
          <div className="d-block flex-column align-items-center">
            <h2 className="section__title text-center">{errorMessage}</h2>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default ErrorPage;
