import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Login = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="rgba(43,8,104,1)"
            >
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
            </svg>
            <h2 className="section__title">Sign Up</h2>
            <div className="d-flex justify-content-center align-items-center">
              <Col lg="4" className="mb-5 text-center">
                <Form>
                  <FormGroup>
                    <Input placeholder="First Name" type="text" />
                  </FormGroup>
                  <FormGroup>
                    <Input placeholder="Last Name" type="text" />
                  </FormGroup>
                  <FormGroup style={{ width: "100%" }}>
                    <Input type="date" placeholder="Birthdate" />
                  </FormGroup>
                  <FormGroup>
                    <Input placeholder="Email" type="email" />
                  </FormGroup>

                  <FormGroup>
                    <Input placeholder="Password" type="password" />
                  </FormGroup>
                  
                  <FormGroup>
                    <div className="d-flex flex-column-reverse flex-lg-row justify-content-end align-items-center">
                      
                      <Link
                        to="/login"
                        className="d-flex align-items-center gap-2"
                      >
                        Don't have an Account? Sign Up
                      </Link>
                    </div>
                  </FormGroup>

                  <button className=" contact__btn" type="submit">
                    Sign Up
                  </button>
                </Form>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;