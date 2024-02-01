import React from "react";
import { Container } from "reactstrap";
import Helmet from "../Helmet";
import imgError from "../../assets/all-images/error.jpg";

const ErrorPage = ({ errorMessage }) => {
  console.log(errorMessage);
  return (
    <Helmet title="Error">
      <section>
        <Container className="d-flex justify-content-center">
          <div className="d-block flex-column align-items-center">
            {/* <img width={350} src={imgError} alt="Error Image" /> */}
            <h2 className="section__title text-center">{errorMessage}</h2>
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default ErrorPage;
