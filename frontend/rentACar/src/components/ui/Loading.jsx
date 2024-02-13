import React from "react";
import { Container } from "reactstrap";
import Helmet from "../Helmet";
import { useTranslation } from "react-i18next";


const Loading = () => {
  
  const { t } = useTranslation();

  return (
    <Helmet title={t("loading")}>
      <section>
        <Container className="d-flex justify-content-center">
          <div className="spinner-border custom-spinner" role="status">
            <span className="sr-only"></span>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Loading;
