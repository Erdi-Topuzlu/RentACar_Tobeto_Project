import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import campaignData from "../assets/data/campaignData.js";
import Helmet from "../components/Helmet.jsx";


import "../styles/campaign-details.css";

const CampaignDetails = () => {
  const { id } = useParams();
  const campaign = campaignData.find((campaign) => campaign.title === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [campaign]);

  return (
    <Helmet title={campaign.title}>
      <section>
        <Container>
          <Row>
            <Col lg="2" md="2"></Col>
            <Col lg="8" md="8">
              <div className="campaign__details">
                <img src={campaign.imgUrl} alt="" className="w-100" />
                <h2 className="section__title mt-4">{campaign.title}</h2>

                <div className="campaign__publisher d-flex align-items-center gap-4 mb-4">
                  <span className="campaign__author">
                    <i className="ri-user-line"></i> {campaign.author}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-calendar-line"></i> {campaign.date}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i className="ri-time-line"></i> {campaign.time}
                  </span>
                </div>

                <p className="section__description">{campaign.description}</p>
                <h6 className="ps-5 fw-normal">
                  <blockquote className="fs-4">{campaign.quote}</blockquote>
                </h6>
                <p className="section__description">{campaign.description}</p>
              </div>

              {/* <div className="comment__list mt-5">
                <h4 className="mb-5">3 Comments</h4>

                <div className="single__comment d-flex gap-3">
                  <img src="https://avatars.githubusercontent.com/u/146648077?v=4" alt="" />
                  <div className="comment__content">
                    <h6 className=" fw-bold">David Visa</h6>
                    <p className="section__description mb-0">14 July, 2022</p>
                    <p className="section__description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Eos nobis totam eius laborum molestias itaque minima
                      distinctio, quae velit tempore!
                    </p>

                    <span className="replay d-flex align-items-center gap-1">
                      <i className="ri-reply-line"></i> Replay
                    </span>
                  </div>
                </div> */}

                {/* =============== comment form ============ */}
                {/* <div className="leave__comment-form mt-5">
                  <h4>Leave a Comment</h4>
                  <p className="section__description">
                    You must sign-in to make or comment a post
                  </p>

                  <Form>
                    <FormGroup className=" d-flex gap-3">
                      <Input type="text" placeholder="Full name" />
                      <Input type="email" placeholder="Email" />
                    </FormGroup>

                    <FormGroup>
                      <textarea
                        rows="5"
                        className="w-100 py-2 px-3"
                        placeholder="Comment..."
                      ></textarea>
                    </FormGroup>

                    <button className="btn comment__btn mt-3">
                      Post a Comment
                    </button>
                  </Form>
                </div>
              </div> */}
            </Col>
            <Col lg="2" md="2"></Col>


            {/* <Col lg="4" md="4">
              <div className="recent__post mb-4">
                <h5 className=" fw-bold">Recent Posts</h5>
              </div>
              {campaignData.map((item) => (
                <div className="recent__campaign-post mb-4" key={item.id}>
                  <div className="recent__campaign-item d-flex gap-3">
                    <img src={item.imgUrl} alt="" className="w-25 rounded-2" />
                    <h6>
                      <Link to={`/campaigns/${item.title}`}>{campaign.title}</Link>
                    </h6>
                  </div>
                </div>
              ))}
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CampaignDetails;
