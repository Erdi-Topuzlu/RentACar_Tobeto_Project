import React, { useEffect } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import fetchAllSliderData from "../../redux/actions/admin/fetchAllSliderData";


const HeroSlider = () => {

  const { sliders, status, error } = useSelector((state) => state.sliderAllData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllSliderData());
  }, [dispatch]);


  console.log(sliders)
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

  const { t } = useTranslation();
  return (
    <>
    {/* { sliders.map((slider) => ( */}
    <Slider {...settings} className="hero__slider">
      {/* <div className="slider__item slider__item-01 mt0" key={slider.id}>
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">{slider.title}</h4>
            <h1 className="text-light mb-4">{slider.description}</h1>

            <button className="btn reserve__btn mt-4">
              <Link to="/cars">{slider.buttonLabelName}</Link>
            </button>
          </div>
        </Container>
      </div> */}

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
            <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

            <button className="btn reserve__btn mt-4">
              <Link to="/cars">{t("details")}</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent $70 Per Day</h4>
            <h1 className="text-light mb-4">Reserve Now and Get 50% Off</h1>

            <button className="btn reserve__btn mt-4">
              <Link to="/cars">{t("details")}</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
    {/* ))} */}
    </>
  );
};

export default HeroSlider;
