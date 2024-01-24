import React from "react";
import { Col } from "reactstrap";
import "../../styles/campaign-item.css";
import { Link } from "react-router-dom";
import campaignData from "../../assets/data/campaignData";
import { useTranslation } from "react-i18next";
import { AnimatedUTD } from "./animation/animateDiv";

const CampaingList = () => {
  return (
    <>
      {campaignData.map((item) => (
        <CampaignItem item={item} key={item.id} />
      ))}
    </>
  );
};

const CampaignItem = ({ item }) => {
  const { imgUrl, title, author, date, description, time } = item;
  const { t } = useTranslation();
  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <AnimatedUTD direction="up">
        <div className="campaign__item">
          <img src={imgUrl} alt="" className="w-100" />

          <div className="campaign__info p-3">
            <Link to={`/campaigns/${title}`} className="campaign__title">
              {title}
            </Link>
            <p className="section__description mt-3">
              {description.length > 100
                ? description.substr(0, 100)
                : description}
            </p>

            <Link to={`/campaigns/${title}`} className="read__more">
              {t("readMore")}
            </Link>

            {/* <div className="campaign__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="campaign__author">
              <i className="ri-user-line"></i> {author}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-calendar-line"></i> {date}
              </span>

              <span className=" d-flex align-items-center gap-1 section__description">
                <i className="ri-time-line"></i> {time}
              </span>
            </div>
          </div> */}
          </div>
        </div>
      </AnimatedUTD>
    </Col>
  );
};

export default CampaingList;
