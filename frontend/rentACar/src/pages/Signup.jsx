import React, { useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import "../styles/form.css";
import Helmet from "../components/Helmet";
import getSignUpValidationSchema from "../schemes/signUpScheme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { AnimatedLTR } from "../components/ui/animation/animateDiv";
import { ReactSVG } from "react-svg";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";

const signUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const signUpValidationSchema = getSignUpValidationSchema();

  const token = localStorage.getItem("access_token");

  // useEffect(() => {
  //   if(token){
  //     navigate("/profile")
  //   }
  // }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      // actions.resetForm();
      try {
        const response = await axiosInstance.post(
          "api/v1/auth/register",
          values
        );

        console.log(response.data);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        navigate("/login");
        // window.location.reload();
      } catch (error) {
        console.error("Kayıt hatası:", response.error.data);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Helmet title={t("signup")}>
      <section>
        <Container>
          <Row>
            <AnimatedLTR direction="left">
              <Col lg="12" className="mb-5 text-center">
                <ReactSVG src="/src/assets/icons/signup.svg" />
                <h2 className="section__title">{t("signup")}</h2>
                <div className="d-flex mt-4 justify-content-center align-items-center">
                  <Col lg="4" className="mb-5 text-center">
                    <Form onSubmit={formik.handleSubmit}>
                    <div>
                        <FormGroup>
                          <Input
                            id="name"
                            name="name"
                            value={formik.values.name}
                            className={
                              formik.errors.name &&
                              formik.touched.name &&
                              "error"
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            placeholder={
                              formik.errors.name && formik.touched.name
                                ? formik.errors.name
                                : t("firstName")
                            }
                            invalid={
                              formik.errors.name && formik.touched.name
                            }
                          />
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup>
                          <Input
                            id="surname"
                            name="surname"
                            value={formik.values.surname}
                            className={
                              formik.errors.surname &&
                              formik.touched.surname &&
                              "error"
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            placeholder={
                              formik.errors.surname && formik.touched.surname
                                ? formik.errors.surname
                                : t("lastName")
                            }
                            invalid={
                              formik.errors.surname && formik.touched.surname
                            }
                          />
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup>
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
                            placeholder={
                              formik.errors.email && formik.touched.email
                                ? formik.errors.email
                                : t("email")
                            }
                            invalid={
                              formik.errors.email && formik.touched.email
                            }
                          />
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
                            placeholder={
                              formik.errors.password && formik.touched.password
                                ? formik.errors.password
                                : t("password")
                            }
                            invalid={
                              formik.errors.password && formik.touched.password
                            }
                          />
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup>
                          <Input
                            id="cpw"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            className={
                              formik.errors.confirmPassword &&
                              formik.touched.confirmPassword &&
                              "error"
                            }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="password"
                            placeholder={
                              formik.errors.confirmPassword &&
                              formik.touched.confirmPassword
                                ? formik.errors.confirmPassword
                                : t("confirm")
                            }
                            invalid={
                              formik.errors.confirmPassword &&
                              formik.touched.confirmPassword
                            }
                          />
                        </FormGroup>
                      </div>
                      <FormGroup>
                        <div className="d-flex flex-column-reverse flex-lg-row justify-content-end align-items-center">
                          <Link
                            to="/login"
                            className="d-flex align-items-center gap-2"
                          >
                            {t("account")}
                          </Link>
                        </div>
                      </FormGroup>
                      <Button
                        disabled={formik.isSubmitting}
                        className=" form__btn"
                        type="submit"
                      >
                        {t("signup")}
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

export default signUp;
