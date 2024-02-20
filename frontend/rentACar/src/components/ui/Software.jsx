import React from "react";
import Slider from "react-slick";
import "../../styles/testimonial.css";
import { AnimatedUTD } from "./animation/animateDiv";
import softwareData from "../../assets/data/softwareData";

const Software = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <AnimatedUTD direction="up">
      <Slider {...settings}>
      {softwareData.map((item) => (
        <div className="testimonial py-4 px-3" key={item.id}>
          <p className="d-flex justify-content-center">
            <img
              src={item.imagePath}
              alt={item.alt}
              className="w-50 h-50"
            />
          </p>
        </div>
        ))}
        
      </Slider>
    </AnimatedUTD>
  );
};

export default Software;
