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
              <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16ZM7 11V13H9V11H7ZM7 14V16H9V14H7ZM7 17V19H9V17H7Z"></path>
            </svg>
            <h2 className="section__title">Login</h2>
            <div className="d-flex justify-content-center align-items-center">
              <Col lg="4" className="mb-5 text-center">
                <Form>
                  <FormGroup>
                    <Input placeholder="Email" type="email" />
                  </FormGroup>
                  <FormGroup>
                    <Input placeholder="Password" type="password" />
                  </FormGroup>

                  <FormGroup>
                    <div className="d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center">
                      <Link
                        to="/home"
                        className="d-flex align-items-center gap-2 mb-2 mb-lg-0"
                      >
                        Forgot Password?
                      </Link>
                      <Link
                        to="/sign-up"
                        className="d-flex align-items-center gap-2"
                      >
                        Already have an account? Sign in
                      </Link>
                    </div>
                  </FormGroup>

                  <button className=" contact__btn" type="submit">
                    Login
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
