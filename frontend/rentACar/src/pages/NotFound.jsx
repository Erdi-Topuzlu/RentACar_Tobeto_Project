import React from "react";
import Helmet from "../components/Helmet";
import { Col, Container, Row } from "reactstrap";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import img404 from "../assets/all-images/404.jpg";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Helmet title={t("notfound")}>
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
