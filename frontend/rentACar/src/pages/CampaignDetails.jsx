import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import campaignData from "../assets/data/campaignData.js";
import Helmet from "../components/Helmet.jsx";

import "../styles/campaign-details.css";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCampaignsData from "../redux/actions/admin/fetchAllCampaignsData.js";
import Loading from "../components/ui/Loading.jsx";

const CampaignDetails = () => {
  const { id } = useParams();

  const { campaigns, status, error } = useSelector(
    (state) => state.campaignsAllData
  );

  const formatDate = (tarih) => {
    const [gun, ay, yil] = tarih.split("-");
    return `${yil}-${ay}-${gun}`;
  };

  const campaign = campaigns.find((campaign) => campaign?.title === id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCampaignsData());
  }, [dispatch]);

  if (!campaign) {
    return <Loading />;
  }

  return (
    <Helmet title={campaign?.title}>
      <section>
        <Container>
          <Row>
            <Col lg="2" md="2"></Col>
            <Col lg="8" md="8">
              <div className="campaign__details">
                {!campaign?.imgPath ? (
                  <img
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={"https://placehold.co/600x400?text=Empty"}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      height: "500px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={campaign?.imgPath}
                  />
                )}
                <h2 className="section__title mt-4">{campaign?.title}</h2>

                <div className="campaign__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="campaign__author">
                    <img
                      src={
                        campaign?.userId?.userPhotoUrl ||
                        "https://t3.ftcdn.net/jpg/05/16/27/58/240_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                      }
                      alt="Profile"
                      className="header__user-image"
                      style={{
                        marginRight: "8px",
                        height: "40px",
                        width: "40px",
                        objectFit: "cover",
                      }}
                    />
                    {campaign?.userId?.name + " " + campaign?.userId?.surname}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i>{" "}
                    {formatDate(campaign?.createdDate)}
                  </span>
                </div>

                <p className="section__description">
                  <span
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                    dangerouslySetInnerHTML={{
                      __html: campaign?.description,
                    }}
                  />
                </p>
              </div>
            </Col>
            <Col lg="2" md="2"></Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CampaignDetails;
