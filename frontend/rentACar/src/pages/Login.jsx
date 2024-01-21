import React, { useState } from "react";
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

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        // Axios isteğini burada yap
        const response = await axiosInstance.post("api/v1/users/login", values);

        // Başarılı giriş durumunda yapılacak işlemler
        console.log("Başarılı giriş:", response.data);
        // Örneğin, kullanıcıyı başka bir sayfaya yönlendir:
        navigate("/profile");
        console.log(actions);

        // Hatırla beni işaretliyse, uzun ömürlü bir oturum aç
        if (values.rememberMe) {
          // Uzun ömürlü oturum açma işlemleri
          console.log("Uzun ömürlü oturum açma...");
        }
      } catch (error) {
        // Giriş başarısız, hata mesajını kontrol et
        console.error("Giriş hatası:", error.response.data);
        actions.setFieldError("general", "Kullanıcı adı veya şifre hatalı");
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
            <Col lg="12" className="mb-5 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="currentColor"
              >
                <path d="M10 11V8L15 12L10 16V13H1V11H10ZM2.4578 15H4.58152C5.76829 17.9318 8.64262 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C8.64262 4 5.76829 6.06817 4.58152 9H2.4578C3.73207 4.94289 7.52236 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C7.52236 22 3.73207 19.0571 2.4578 15Z"></path>
              </svg>
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
                          invalid={formik.errors.email && formik.touched.email}
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
                        {formik.errors.password && formik.touched.password && (
                          <FormFeedback>
                            <p className="text-danger">
                              {" "}
                              {formik.errors.password}
                            </p>
                          </FormFeedback>
                        )}
                      </FormGroup>
                    </div>
                    <FormGroup
                      className="d-flex justify-content-end"
                      check
                      inline
                    >
                      <Input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formik.values.rememberMe}
                        onChange={formik.handleChange}
                      />
                      <Label style={{ marginLeft: 4 }} check>
                        {t("remember")}
                      </Label>
                    </FormGroup>
                    <FormGroup check inline></FormGroup>
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
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
