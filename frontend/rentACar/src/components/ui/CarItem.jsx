import React from "react";
import { Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useTranslation } from "react-i18next";
import { vehicleType } from "../helper/conversionType";
import { Row } from "react-bootstrap";

const CarItem = ({ item }) => {
  const { t } = useTranslation();
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img
            src={"https://source.unsplash.com/random?wallpapers/?car"}
            alt=""
            className="w-100 h-100 "
          />
        </div>

        <div className="car__item-content mt-4 text-center">
          
          <h5 className="blog__title">{item.modelId?.brandId?.name}{" / "}{item.modelId?.name}</h5>
          <h6 className="rent__price mt-2">
            <span className="text-dark">
              {item.dailyPrice}.00 ₺
            </span>{" "}
            <span className="text-muted">/ {t("day")}</span>
          </h6>

          {/*DOWN ICONS */}
          <Row>
          <Col lg="2"></Col>
          <Col lg="8">
          <div
            className="car__item-content d-flex align-items-center justify-content-between mt-2" 
            
          >
            {/* <span className="d-flex align-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path>
                      </svg>{" "}
                      {item.modelId?.brandId?.name}
                    </span> */}
            <span className=" d-flex  align-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                      </svg>{" "}
                      {item.year}
                    </span>
                    <span className=" d-flex  align-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M14.1716 3C14.702 3 15.2107 3.21071 15.5858 3.58579L20.4142 8.41421C20.7893 8.78929 21 9.29799 21 9.82843V17H23V19L14.8738 19.0008C14.4295 20.7256 12.8636 22 11 22C9.13643 22 7.57052 20.7256 7.12621 19.0008L3 19C2.44772 19 2 18.5523 2 18V5C2 3.89543 2.89543 3 4 3H14.1716ZM11 16C9.89543 16 9 16.8954 9 18C9 19.1046 9.89543 20 11 20C12.1046 20 13 19.1046 13 18C13 16.8954 12.1046 16 11 16ZM14.1716 5H4V17L7.12595 17.0002C7.56991 15.2749 9.13607 14 11 14C12.8639 14 14.4301 15.2749 14.874 17.0002L19 17V9.82843L14.1716 5ZM14 7V13H6V7H14ZM12 9H8V11H12V9Z"></path>
                      </svg>
                      {vehicleType(item.vehicleType, t)}
                    </span>
          </div>
         
          
          <div
            className="car__item-content d-flex align-items-center justify-content-between"
            
          >
            {/* <span className=" d-flex  align-center gap-1 pb-3 section__description">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="rgba(249,168,38,1)"
              >
                <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V13.5L0.757464 13.1894C0.312297 13.0781 0 12.6781 0 12.2192V11.5C0 11.2239 0.223858 11 0.5 11H2L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11H23.5C23.7761 11 24 11.2239 24 11.5V12.2192C24 12.6781 23.6877 13.0781 23.2425 13.1894L22 13.5V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 18V13H4V18H20ZM5.47703 11H18.523C18.6502 11 18.7762 10.9757 18.8944 10.9285C19.4071 10.7234 19.6566 10.1414 19.4514 9.62861L18 6H6L4.54856 9.62861C4.50131 9.74673 4.47703 9.87278 4.47703 10C4.47703 10.5523 4.92475 11 5.47703 11ZM5 14C7.31672 14 8.87868 14.7548 9.68588 16.2643L9.68582 16.2643C9.81602 16.5078 9.72418 16.8107 9.4807 16.9409C9.40818 16.9797 9.3272 17 9.24496 17H6C5.44772 17 5 16.5523 5 16V14ZM19 14V16C19 16.5523 18.5523 17 18 17H14.755C14.6728 17 14.5918 16.9797 14.5193 16.9409C14.2758 16.8107 14.184 16.5078 14.3142 16.2643L14.3141 16.2643C15.1213 14.7548 16.6833 14 19 14Z"></path>
              </svg>{" "}
              {item.modelId?.name}
            </span> */}
           
                    {/* <span className=" d-flex  align-center gap-1 pb-3 section__description">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="rgba(249,168,38,1)"
                      >
                        <path d="M14.1716 3C14.702 3 15.2107 3.21071 15.5858 3.58579L20.4142 8.41421C20.7893 8.78929 21 9.29799 21 9.82843V17H23V19L14.8738 19.0008C14.4295 20.7256 12.8636 22 11 22C9.13643 22 7.57052 20.7256 7.12621 19.0008L3 19C2.44772 19 2 18.5523 2 18V5C2 3.89543 2.89543 3 4 3H14.1716ZM11 16C9.89543 16 9 16.8954 9 18C9 19.1046 9.89543 20 11 20C12.1046 20 13 19.1046 13 18C13 16.8954 12.1046 16 11 16ZM14.1716 5H4V17L7.12595 17.0002C7.56991 15.2749 9.13607 14 11 14C12.8639 14 14.4301 15.2749 14.874 17.0002L19 17V9.82843L14.1716 5ZM14 7V13H6V7H14ZM12 9H8V11H12V9Z"></path>
                      </svg>
                      {vehicleType(item.vehicleType, t)}
                    </span> */}
          </div>
          </Col>
          <Col lg="2"></Col>
          </Row>
            {/* <Col lg="12">
          <div className="row d-flex align-center p-2 justify-content-evenly">
            
            <div className="col-4 p-2">
              <span className="d-flex align-center gap-1 pb-3 section__description">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="rgba(249,168,38,1)"
                >
                  <path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path>
                </svg>{" "}
                {item.modelId?.brandId?.name}
              </span>

              <span className=" d-flex  align-center gap-1 pb-3 section__description">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="rgba(249,168,38,1)"
                >
                  <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
                </svg>{" "}
                {item.year}
              </span>
            </div>
            <div className="col-4 text-center align-center d-flex flex-column justify-content-center" style={{ columnGap: "4rem" }}>
              <span className=" d-flex  align-center gap-1 pb-3 section__description">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="rgba(249,168,38,1)"
                >
                  <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V13.5L0.757464 13.1894C0.312297 13.0781 0 12.6781 0 12.2192V11.5C0 11.2239 0.223858 11 0.5 11H2L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11H23.5C23.7761 11 24 11.2239 24 11.5V12.2192C24 12.6781 23.6877 13.0781 23.2425 13.1894L22 13.5V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 18V13H4V18H20ZM5.47703 11H18.523C18.6502 11 18.7762 10.9757 18.8944 10.9285C19.4071 10.7234 19.6566 10.1414 19.4514 9.62861L18 6H6L4.54856 9.62861C4.50131 9.74673 4.47703 9.87278 4.47703 10C4.47703 10.5523 4.92475 11 5.47703 11ZM5 14C7.31672 14 8.87868 14.7548 9.68588 16.2643L9.68582 16.2643C9.81602 16.5078 9.72418 16.8107 9.4807 16.9409C9.40818 16.9797 9.3272 17 9.24496 17H6C5.44772 17 5 16.5523 5 16V14ZM19 14V16C19 16.5523 18.5523 17 18 17H14.755C14.6728 17 14.5918 16.9797 14.5193 16.9409C14.2758 16.8107 14.184 16.5078 14.3142 16.2643L14.3141 16.2643C15.1213 14.7548 16.6833 14 19 14Z"></path>
                </svg>{" "}
                {item.modelId?.name}
              </span>

              <span className=" d-flex  align-center gap-1 pb-3 section__description">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="rgba(249,168,38,1)"
                >
                  <path d="M14.1716 3C14.702 3 15.2107 3.21071 15.5858 3.58579L20.4142 8.41421C20.7893 8.78929 21 9.29799 21 9.82843V17H23V19L14.8738 19.0008C14.4295 20.7256 12.8636 22 11 22C9.13643 22 7.57052 20.7256 7.12621 19.0008L3 19C2.44772 19 2 18.5523 2 18V5C2 3.89543 2.89543 3 4 3H14.1716ZM11 16C9.89543 16 9 16.8954 9 18C9 19.1046 9.89543 20 11 20C12.1046 20 13 19.1046 13 18C13 16.8954 12.1046 16 11 16ZM14.1716 5H4V17L7.12595 17.0002C7.56991 15.2749 9.13607 14 11 14C12.8639 14 14.4301 15.2749 14.874 17.0002L19 17V9.82843L14.1716 5ZM14 7V13H6V7H14ZM12 9H8V11H12V9Z"></path>
                </svg>
                {vehicleType(item.vehicleType, t)}
              </span>
            </div>
          </div>
          </Col> */}
          
          <Link to={`/cars/sad}`}>
            <button
              style={{ color: "white" }}
              className=" w-50 car__item-btn car__btn-rent link"
            >
              {t("rent")}
            </button>
          </Link>
          <Link to={`/cars/${item.id}`}>
            <button
              style={{ color: "white" }}
              className=" w-50 car__item-btn car__btn-details"
            >
              {t("details")}
            </button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
