import React, { useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/ui/BookingFrom";
import PaymentMethod from "../components/ui/PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import fetchCarDetailData from "../redux/actions/fetchCarDetailData";
import Loading from "../components/ui/Loading";
import {
  fuelType,
  gearType,
  seatType,
  vehicleType,
} from "../components/helper/conversionType";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const CarDetails = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const dispatch = useDispatch();

  const { details, status, error } = useSelector((state) => state.carDetail);

  useEffect(() => {
    dispatch(fetchCarDetailData(id));
  }, [dispatch]);

  if (status === "LOADING") {
    return <Loading />;
  }

  console.log(details);

  return (
    <Helmet>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              {/* <img
                alt=""
                src="https://source.unsplash.com/random?wallpapers/?car"
                className="w-100"
                width={600}
                height={400}
              /> */}
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
                <SwiperSlide>
                  <img src="https://placehold.co/600x400" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://placehold.co/600x400" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://placehold.co/600x400" />
                </SwiperSlide>
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
                    ({} ratings)
                  </span>
                </div>
                <div className="row">
                  {/* Left */}
                  <div className="col-6">
                    <span className=" d-flex align-items-center gap-1 pb-3 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path>
                      </svg>{" "}
                      {details.modelId?.brandId?.name}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                      </svg>{" "}
                      {details.year}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z"></path>
                      </svg>{" "}
                      {gearType(details.gearType)}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M12 2.99988C14.2091 2.99988 16 4.79074 16 6.99988C16 7.54431 15.8917 8.06177 15.6958 8.53327C14.0548 8.70904 12.5038 9.5584 11.4804 10.9666C10.2212 10.8033 9.14476 10.0545 8.53417 8.99859C8.19462 8.41137 7.99998 7.72986 7.99998 6.99988C7.99998 4.79074 9.79084 2.99988 12 2.99988ZM17.7635 8.67236C17.9175 8.14099 18 7.57964 18 6.99988C18 3.68617 15.3137 0.999879 12 0.999878C8.68627 0.999877 5.99998 3.68617 5.99998 6.99988C5.99998 7.57966 6.08247 8.14104 6.23647 8.67242C5.69935 8.80476 5.172 9.01399 4.66995 9.30385C1.80019 10.9607 0.81694 14.6302 2.47379 17.5C4.13065 20.3698 7.80019 21.353 10.6699 19.6962C11.172 19.4063 11.6169 19.0542 12 18.6552C12.3832 19.0542 12.828 19.4062 13.33 19.6961C16.1998 21.3529 19.8693 20.3697 21.5262 17.4999C23.183 14.6302 22.1998 10.9606 19.33 9.30377C18.828 9.01392 18.3006 8.80469 17.7635 8.67236ZM13.1543 16.9342C13.8227 15.4251 13.8627 13.6571 13.1549 12.0667C13.9259 11.0577 15.1125 10.4999 16.3322 10.4991C17.0104 10.4987 17.6979 10.6709 18.33 11.0358C20.2432 12.1404 20.8987 14.5868 19.7941 16.4999C18.6895 18.4131 16.2432 19.0686 14.33 17.964C13.8586 17.6919 13.4647 17.3395 13.1543 16.9342ZM11.3649 12.9668C11.8532 14.139 11.7429 15.4456 11.1337 16.5023C10.7949 17.0899 10.3021 17.5991 9.66995 17.9641C7.75678 19.0687 5.31042 18.4132 4.20585 16.5C3.10128 14.5868 3.75678 12.1405 5.66995 11.0359C6.14142 10.7637 6.64366 10.5987 7.1499 10.5326C8.12267 11.8659 9.63373 12.7845 11.3649 12.9668Z"></path>
                      </svg>{" "}
                      {details.colorId?.colorName}
                    </span>
                  </div>
                  
                  {/* Right */}
                  <div className="col-6" style={{ columnGap: "4rem" }}>
                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V13.5L0.757464 13.1894C0.312297 13.0781 0 12.6781 0 12.2192V11.5C0 11.2239 0.223858 11 0.5 11H2L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11H23.5C23.7761 11 24 11.2239 24 11.5V12.2192C24 12.6781 23.6877 13.0781 23.2425 13.1894L22 13.5V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 18V13H4V18H20ZM5.47703 11H18.523C18.6502 11 18.7762 10.9757 18.8944 10.9285C19.4071 10.7234 19.6566 10.1414 19.4514 9.62861L18 6H6L4.54856 9.62861C4.50131 9.74673 4.47703 9.87278 4.47703 10C4.47703 10.5523 4.92475 11 5.47703 11ZM5 14C7.31672 14 8.87868 14.7548 9.68588 16.2643L9.68582 16.2643C9.81602 16.5078 9.72418 16.8107 9.4807 16.9409C9.40818 16.9797 9.3272 17 9.24496 17H6C5.44772 17 5 16.5523 5 16V14ZM19 14V16C19 16.5523 18.5523 17 18 17H14.755C14.6728 17 14.5918 16.9797 14.5193 16.9409C14.2758 16.8107 14.184 16.5078 14.3142 16.2643L14.3141 16.2643C15.1213 14.7548 16.6833 14 19 14Z"></path>
                      </svg>{" "}
                      {details.modelId?.name}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M3 19V4C3 3.44772 3.44772 3 4 3H13C13.5523 3 14 3.44772 14 4V12H16C17.1046 12 18 12.8954 18 14V18C18 18.5523 18.4477 19 19 19C19.5523 19 20 18.5523 20 18V11H18C17.4477 11 17 10.5523 17 10V6.41421L15.3431 4.75736L16.7574 3.34315L21.7071 8.29289C21.9024 8.48816 22 8.74408 22 9V18C22 19.6569 20.6569 21 19 21C17.3431 21 16 19.6569 16 18V14H14V19H15V21H2V19H3ZM5 5V11H12V5H5Z"></path>
                      </svg>{" "}
                      {fuelType(details.fuelType)}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M20 13C20 15.2091 19.1046 17.2091 17.6569 18.6569L19.0711 20.0711C20.8807 18.2614 22 15.7614 22 13 22 7.47715 17.5228 3 12 3 6.47715 3 2 7.47715 2 13 2 15.7614 3.11929 18.2614 4.92893 20.0711L6.34315 18.6569C4.89543 17.2091 4 15.2091 4 13 4 8.58172 7.58172 5 12 5 16.4183 5 20 8.58172 20 13ZM15.293 8.29297 10.793 12.793 12.2072 14.2072 16.7072 9.70718 15.293 8.29297Z"></path>
                      </svg>{" "}
                      {details.kilometer}
                    </span>

                    <span className=" d-flex align-items-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M11.9999 17C15.6623 17 18.8649 18.5751 20.607 20.9247L18.765 21.796C17.3473 20.1157 14.8473 19 11.9999 19C9.15248 19 6.65252 20.1157 5.23479 21.796L3.39355 20.9238C5.13576 18.5747 8.33796 17 11.9999 17ZM11.9999 2C14.7613 2 16.9999 4.23858 16.9999 7V10C16.9999 12.6888 14.8776 14.8818 12.2168 14.9954L11.9999 15C9.23847 15 6.9999 12.7614 6.9999 10V7C6.9999 4.31125 9.1222 2.11818 11.783 2.00462L11.9999 2ZM11.9999 4C10.4022 4 9.09623 5.24892 9.00499 6.82373L8.9999 7V10C8.9999 11.6569 10.343 13 11.9999 13C13.5976 13 14.9036 11.7511 14.9948 10.1763L14.9999 10V7C14.9999 5.34315 13.6567 4 11.9999 4Z"></path>
                      </svg>{" "}
                      {seatType(details.seatType)}
                    </span>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
