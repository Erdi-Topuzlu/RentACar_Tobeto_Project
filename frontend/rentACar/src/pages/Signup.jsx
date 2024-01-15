import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup} from "reactstrap";
import * as Yup from "yup";
import "../styles/contact.css";
import Helmet from "../components/Helmet";
import { Formik } from "formik";
import FormikInput from "../components/FormikInput/FormikInput";

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

const today = new Date();
const formattedDate = today.toISOString().split("T")[0];

const Login = () => {
  const initialValues = {
    fName: "",
    lName: "",
    bDate: formattedDate,
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
		fName: Yup.string()
      .nullable()
			.required("First name required!")
			.max(50, "Maximum of 50 characters"),
      lName: Yup.string()
			.required("Lastname required!")
			.max(50, "Maximum of 50 characters"),
      bDate: Yup.date()
			.required("Birthdate required!")
			.max(new Date(Date.now() - 567648000000), "You must be at least 18 years"),
      email: Yup.string()
      .required("E-Mail required!"),
      password: Yup.string()
      .required("Password required!")

	});

  return (
    <Helmet title="Sign-Up">
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
                  <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={(values) => {}}
                  >
                    <Form>
                      <FormikInput name="fName" place="First Name" />
                      <FormikInput name="lName" place="Last Name" />
                      <FormikInput name="bDate" type="date" />
                      <FormikInput name="email" place="E-Mail" type="email" />
                      <FormikInput
                        name="password"
                        place="Password"
                        type="password"
                      />

                      <FormGroup>
                        <div className="d-flex flex-column-reverse flex-lg-row justify-content-end align-items-center">
                          <Link
                            to="/login"
                            className="d-flex align-items-center gap-2"
                          >
                            Already have an account? Sign in
                          </Link>
                        </div>
                      </FormGroup>

                      <button className=" contact__btn" type="submit">
                        Sign Up
                      </button>
                    </Form>
                  </Formik>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
