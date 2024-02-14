import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fetchCarDetailData from "../redux/actions/fetchCarDetailData";
import Loading from "../components/ui/Loading";
import {
  fuelType,
  gearType,
  seatType,
} from "../components/helper/conversionType";
import { useTranslation } from "react-i18next";

import { ReactSVG } from "react-svg";
import BookingForm from "../components/ui/BookingForm/BookingForm";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ErrorPage from "../components/ui/ErrorPage";
import RedirectLogin from "../components/ui/RedirectLogin";

const CarDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.carDetail);
  const { t } = useTranslation();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    dispatch(fetchCarDetailData(id));
  }, [dispatch]);

  localStorage.setItem("carData", JSON.stringify(details));

  if (status === "LOADING") {
    return <Loading />;
  } else if (status === "FAIL") {
    return <ErrorPage errorMessage={error} />;
  }

  console.log(details);
  return (
    <Helmet
      title={`${details.modelId?.brandId?.name} - ${details.modelId?.name} `}
    >
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
              >
                {!details || !details.carImages || details.carImages.length === 0 ? (
                  <>
                    {[...Array(3)].map((_, index) => (
                      
                        <SwiperSlide key={index}>
                        <img
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src="https://placehold.co/600x400?text=Empty"
                          alt={`Placeholder ${index + 1}`}
                        />
                        </SwiperSlide>
                  
                    ))}
                  </>
                ) : (
                  details.carImages.map((img, index) => (
                    <SwiperSlide key={index +1}>
                      <img
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                        src={img.imgPath}
                        alt={`Car Image ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))
                )}

                
              </Swiper>
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    {details.dailyPrice}.00 ₺/ {t("day")}
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    ({} {t("rating")})
                  </span>
                </div>
                <div className="row">
                  {/* Left */}
                  <div className="col-6">
                    <span className=" d-flex align-items-center gap-1 pb-3 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/brand.svg" />{" "}
                      {details.modelId?.brandId?.name}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/year.svg" />{" "}
                      {details.year}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/gear.svg" />{" "}
                      {gearType(details.gearType, t)}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/color.svg" />{" "}
                      {details.colorId?.name}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="col-6" style={{ columnGap: "4rem" }}>
                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/model.svg" />{" "}
                      {details.modelId?.name}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/fuel.svg" />{" "}
                      {fuelType(details.fuelType, t)}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/kilometer.svg" />{" "}
                      {details.kilometer}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <ReactSVG src="/src/assets/icons/seat.svg" />{" "}
                      {seatType(details.seatType)}
                    </span>
                  </div>
                </div>
              </div>
            </Col>
            {token ? (
              <Col lg="12" className="mt-5">
                <div className="booking-info mt-5">
                  <h5 className="mb-4 fw-bold text-center ">
                    {t("bookingInfo")}
                  </h5>
                  <BookingForm />
                </div>
              </Col>
            ) : (
              <RedirectLogin />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
