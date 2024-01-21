import React from "react";
import { Col } from "reactstrap";
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
          <h5 className="blog__title">
            {item.modelId?.brandId?.name}
            {" / "}
            {item.modelId?.name}
          </h5>
          <h6 className="rent__price mt-2">
            <span className="text-dark">{item.dailyPrice}.00 ₺</span>{" "}
            <span className="text-muted">/ {t("day")}</span>
          </h6>

          {/*ICONS */}
          <Row>
            <Col lg="2"></Col>
            <Col lg="8">
              <div className="car__item-content d-flex align-items-center justify-content-between mt-2">
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
            </Col>
            <Col lg="2"></Col>
          </Row>

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
