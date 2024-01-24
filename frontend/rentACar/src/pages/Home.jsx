import React, { useEffect } from "react";

import HeroSlider from "../components/ui/HeroSlider";
import Helmet from "../components/Helmet";

import { Container, Row, Col } from "reactstrap";
import FindCarForm from "../components/ui/FindCarFrom";
import AboutSection from "../components/ui/AboutSection";
import ServicesList from "../components/ui/SevicesList";
import CarItem from "../components/ui/CarItem";
import BecomeDriverSection from "../components/ui/BecomeDriverSection";
import BlogList from "../components/ui/CampaignList";
import Software from "../components/ui/Software";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCarData from "../redux/actions/fetchAllCarData";
import { useTranslation } from "react-i18next";
import { AnimatedUTD } from "../components/ui/animation/animateDiv";
import Loading from "../components/ui/Loading";
import ErrorPage from "../components/ui/ErrorPage";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {items, status, error} = useSelector((state) => state.carAllData);
  
  useEffect(() => {
    dispatch(fetchAllCarData());
  }, [dispatch]);

  if (status === "LOADING") {
    return <Loading />;
  }else if (status === "FAIL"){
    return <ErrorPage errorMessage={error} />
  }


  return (
    <Helmet title={t("home")}>
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>{t("findTitle")}</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section>
        <Container>
          <Row>
           
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">{t("seeOur")}</h6>
                <h2 className="section__title">{t("popular")}</h2>
              </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
              <Col lg="12" className="text-center mb-5">
                <h6 className="section__subtitle">{t("comeWith")}</h6>
                <h2 className="section__title">{t("hotOffers")}</h2>
              </Col>

            {items.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />

      {/* =========== Products section =========== */}
      <section>
        <Container>
          <Row>
              <Col lg="12" className="mb-4 text-center">
                <h2 className="section__title">{t("software")}</h2>
              </Col>
            <Software />
          </Row>
        </Container>
      </section>

      {/* =============== campaign section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">{t("explore")}</h6>
              <h2 className="section__title">{t("latest")}</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
