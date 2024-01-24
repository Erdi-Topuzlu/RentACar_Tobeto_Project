import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  Button,
  Label,
} from "reactstrap";
import Helmet from "../components/Helmet";
import "../styles/form.css";
import { useFormik } from "formik";
import { loginValidationSchema } from "../schemes/loginScheme";
import { useTranslation } from "react-i18next";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";
import { AnimatedLTR } from "../components/ui/animation/animateDiv";
import { ReactSVG } from "react-svg";

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axiosInstance.post(
          "api/v1/auth/authenticate",
          values
        );

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        navigate("/home");
        window.location.reload();
      } catch (error) {
        console.error("Giriş hatası:", error.response.data);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Helmet title={t("login")}>
      <section>
        <Container>
          <Row>
            <AnimatedLTR direction="left">
              <Col lg="12" className="mb-5 text-center">
                <ReactSVG src="/src/assets/icons/login.svg" />
                <h2 className="section__title">{t("login")}</h2>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Col lg="4" className="mb-5 text-center">
                    <Form onSubmit={formik.handleSubmit}>
                      <div>
                        <FormGroup className="">
                          <Input
                            id="email"
                            name="email"
                            value={formik.values.email}
                            className={
                              formik.errors.email &&
                              formik.touched.email &&
                              "error"
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            placeholder="E-mail"
                            invalid={
                              formik.errors.email && formik.touched.email
                            }
                          />
                          {formik.errors.email && formik.touched.email && (
                            <FormFeedback>
                              <p className="text-danger">
                                {" "}
                                {formik.errors.email}
                              </p>
                            </FormFeedback>
                          )}
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup>
                          <Input
                            id="pw"
                            name="password"
                            value={formik.values.password}
                            className={
                              formik.errors.password &&
                              formik.touched.password &&
                              "error"
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            placeholder={t("password")}
                            invalid={
                              formik.errors.password && formik.touched.password
                            }
                          />
                          {formik.errors.password &&
                            formik.touched.password && (
                              <FormFeedback>
                                <p className="text-danger">
                                  {" "}
                                  {formik.errors.password}
                                </p>
                              </FormFeedback>
                            )}
                        </FormGroup>
                      </div>

                      <FormGroup>
                        <div className="d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center">
                          <Link
                            to="/forgot-password"
                            className="d-flex align-items-center gap-2 mb-2 mb-lg-0"
                          >
                            {t("forgot")}
                          </Link>
                          <Link
                            to="/sign-up"
                            className="d-flex align-items-center gap-2"
                          >
                            {t("dontAccount")}
                          </Link>
                        </div>
                      </FormGroup>

                      <Button
                        disabled={formik.isSubmitting}
                        className=" form__btn"
                        type="submit"
                      >
                        {t("login")}
                      </Button>
                    </Form>
                  </Col>
                </div>
              </Col>
            </AnimatedLTR>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
