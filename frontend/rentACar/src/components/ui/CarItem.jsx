import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useTranslation } from "react-i18next";
import { vehicleType } from "../helper/conversionType";
import { Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { ReactSVG } from "react-svg";

const CarItem = ({ item }) => {
  const { t } = useTranslation();
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <motion.div whileHover={{ scale: 1.05 }}>
            {!item.carImages || item.carImages.length === 0 ? (
              <img
                style={{
                  height:"250px",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={"https://placehold.co/600x400?text=Empty"}
                alt=""
              />
            ) : (
             
                <img
                  style={{
                    height:"250px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={item.carImages[0].imgPath}
                />
              )
            }

            
          </motion.div>
        </div>

        <div className="car__item-content mt-4 text-center">
          <h5 className="campaign__title">
            {item.modelId?.brandId?.name} {item.modelId?.name}
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
                  <ReactSVG src="/src/assets/icons/calendar.svg" /> {item.year}
                </span>
                <span className=" d-flex  align-center gap-1 pb-3 section__description">
                  <ReactSVG src="/src/assets/icons/vehicle.svg" />
                  {vehicleType(item.vehicleType, t)}
                </span>
              </div>
            </Col>
            <Col lg="2"></Col>
          </Row>

          {/* <Link to={`/cars/sad}`}>
            <button
              style={{ color: "white" }}
              className=" w-50 car__item-btn car__btn-rent link"
            >
              {t("rent")}
            </button>
          </Link> */}
          <Link to={`/cars/${item.id}`}>
            <button
              style={{ color: "white" }}
              className=" w-100 car__item-btn car__btn-details"
            >
              {t("seeDetails|rent")}
            </button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
