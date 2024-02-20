import React, { useEffect } from "react";
import { Col } from "reactstrap";
import "../../styles/campaign-item.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCampaignsData from "../../redux/actions/admin/fetchAllCampaignsData";

const CampaignList = () => {
  const { campaigns, status, error } = useSelector(
    (state) => state.campaignsAllData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCampaignsData());
  }, [dispatch]);

  return (
    <>
      {campaigns.map((item) => (
        <CampaignItem item={item} key={item.id} />
      ))}
    </>
  );
};

function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

const CampaignItem = ({ item }) => {
  const { id, imgPath, title, description } = item;
  const { t } = useTranslation();

  const sanitizedDescription = sanitizeHtml(description);

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="campaign__item">
        
      {!imgPath ? (
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
                  src={imgPath}
                />
              )
            }

        <div className="campaign__info p-3">
          <Link to={`/campaigns/${title}`} className="campaign__title">
            {title}
          </Link>
          <p className="section__description mt-3" style={{height:"60px"}}>
            <span
              style={{ fontWeight: "bold", fontSize: "16px" }}
              dangerouslySetInnerHTML={{
                __html:
                  sanitizedDescription.length > 60
                    ? sanitizedDescription.substr(0, 100)
                    : sanitizedDescription,
              }}
            />
          </p>

          <Link to={`/campaigns/${title}`} className="read__more">
            {t("readMore")}
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default CampaignList;
