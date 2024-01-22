import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";
import { AnimatedLTR, AnimatedUTD } from "./animation/animateDiv";

const Testimonial = () => {
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
      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"} alt="Java" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"} alt="Spring" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.simpleicons.org/react/61DAFB"} alt="React" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"} alt="Javascript" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"} alt="HTML5" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"} alt="CSS3" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"} alt="PostgreSQL" className="w-50 h-50" />
        </p>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="d-flex justify-content-center">
        <img src={"https://skillicons.dev/icons?i=idea"} alt="Intellij IDEA" className="w-50 h-50" />
        </p>
      </div>





      
    </Slider>
    </AnimatedUTD>
  );
};

export default Testimonial;
