import React from "react";
import "../../styles/our-member.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { AnimatedLTR } from "./animation/animateDiv";

const OUR__MEMBERS = [
  {
    name: "Halis Melih ABAK",
    experience: "Tobeto JAVA-1A @Pair-1",
    gitUrl: "https://github.com/Halismelih1",
    linkedinUrl: "https://www.linkedin.com/in/halismelihabak/",
    imgUrl: "https://avatars.githubusercontent.com/u/125564176?v=4",
  },

  {
    name: "Halil İbrahim KARKIN",
    experience: "Tobeto JAVA-1A @Pair-1",
    gitUrl: "https://github.com/halilkrkn",
    linkedinUrl: "https://www.linkedin.com/in/halilkrkn/",
    imgUrl: "https://avatars.githubusercontent.com/u/42476890?v=4",
  },

  {
    name: "Nida KASAP",
    experience: "Tobeto JAVA-1A @Pair-1",
    gitUrl: "https://github.com/nidosh",
    linkedinUrl: "#",
    imgUrl: "https://avatars.githubusercontent.com/u/145642334?v=4",
  },

  {
    name: "Erdi TOPUZLU",
    experience: "Tobeto JAVA-1A @Pair-1",
    gitUrl: "https://github.com/Erdi-Topuzlu",
    linkedinUrl: "https://www.linkedin.com/in/erditpzl/",
    imgUrl: "https://avatars.githubusercontent.com/u/146648077?v=4",
  },
];

const OurMembers = () => {
  return (
    <>
      {OUR__MEMBERS.map((item, index) => (
        <Col lg="3" md="3" sm="4" xs="6" key={index} className="mb-4">
          <AnimatedLTR direction="left">
            <div className="single__member">
              <div className="single__member-img">
                <img src={item.imgUrl} alt="" className="w-100" />

                <div className="single__member-social">
                  <Link to={item.gitUrl} target="_blank">
                    <i className="ri-github-line"></i>
                  </Link>
                  <Link to={item.linkedinUrl} target="_blank">
                    <i className="ri-linkedin-line"></i>
                  </Link>
                </div>
              </div>

              <h6 className="text-center mb-0 mt-3">{item.name}</h6>
              <p className="section__description text-center">
                {item.experience}
              </p>
            </div>
          </AnimatedLTR>
        </Col>
      ))}
    </>
  );
};

export default OurMembers;
