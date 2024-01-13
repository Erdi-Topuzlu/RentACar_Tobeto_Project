import React from "react";
import Helmet from "../components/Helmet";
import { Col, Container, Row } from "reactstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import img404 from "../assets/all-images/404.jpg";

const NotFound = () => {
  return (
    <Helmet title="Not Found">
    <Header/>
    
    <section>
        <Container className="d-flex justify-content-center">
        <img width={350} src={img404} />
        </Container>
      </section>

   
    <Footer/>
  </Helmet> 
  )
};

export default NotFound;
