import React from "react";
import { Container } from "reactstrap";
import Helmet from "../Helmet";
import { useTranslation } from "react-i18next";

import error from "../../assets/all-images/error.jpg";

const ErrorPage = () => {

  const { t } = useTranslation();

  
  return (
    <Helmet title={t("error")}>
      <section>
      <Container className="d-flex justify-content-center">
          <img width={350} src={error} />
        </Container>
      </section>
    </Helmet>
  );
};

export default ErrorPage;
