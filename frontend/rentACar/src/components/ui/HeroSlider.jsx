import React, { useEffect } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import fetchAllSliderData from "../../redux/actions/admin/fetchAllSliderData";

const HeroSlider = () => {
  const { sliders, status, error } = useSelector(
    (state) => state.sliderAllData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSliderData());
  }, [dispatch]);


  const { t } = useTranslation();

  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 4000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <>
      <Slider {...settings} className="hero__slider">
        {sliders.length > 0 ? (
          sliders.map((slider, i) => (
            <div
              key={slider.id}
              className="slider__item mt0"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(rgb(103, 58, 183, 0.1), rgb(103, 58, 183, 0.3))",
                  zIndex: 1,
                }}
              ></div>
              <img
                style={{
                  width: "100%",
                  height: "650px",
                  objectFit: "cover",
                  display: "block",
                  zIndex: 0,
                }}
                src={slider.imgPath}
                alt="Slider Image"
              />
              <Container
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                }}
              >
                <div className="slider__content">
                  <h4 className="text-light mb-3">{slider.title}</h4>
                  <h1 className="text-light mb-4">{slider.description}</h1>
                  <button className="btn reserve__btn mt-4">
                    <Link to="/cars">{slider.buttonLabelName}</Link>
                  </button>
                </div>
              </Container>
            </div>
          ))
        ) : (
          <div className="slider__item mt0">
            <img
              style={{
                width: "100%",
                height: "650px",
                objectFit: "cover",
                display: "block",
                zIndex: 0,
              }}
              src="https://placehold.co/600x400?text=Hello+World" // Varsayılan resim yolu
              alt="Default Slider Image"
            />
            <Container
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <div className="slider__content">
                <h4 className="text-light mb-3">{t("campaigns")} {t("title")}</h4>
                <h1 className="text-light mb-4">{t("campaigns")} {t("details")}</h1>
                <button className="btn reserve__btn mt-4">
                  <Link to="/campaigns">{t("campaigns")}</Link>
                </button>
              </div>
            </Container>
          </div>
        )}
      </Slider>
    </>
  );
};

export default HeroSlider;
