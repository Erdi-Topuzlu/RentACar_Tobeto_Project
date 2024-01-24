import React from "react";
import { Container } from "reactstrap";
import Helmet from "../Helmet";

const Loading = () => {
  return (
    <Helmet title="Loading">
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
