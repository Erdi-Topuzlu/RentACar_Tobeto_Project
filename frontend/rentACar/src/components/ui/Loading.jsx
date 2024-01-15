import React from "react";
import { Col, Container, Row } from "reactstrap";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer";
import Helmet from "../Helmet";


const Loading = () => {
  return (
    <Helmet title="Loading">
    <Header/>
    
    <section>
        <Container className="d-flex justify-content-center">
        <div class="spinner-border custom-spinner" role="status">
        <span class="sr-only"></span>
      </div>
        </Container>
      </section>
    <Footer/>
  </Helmet> 
  )
};

export default Loading;
