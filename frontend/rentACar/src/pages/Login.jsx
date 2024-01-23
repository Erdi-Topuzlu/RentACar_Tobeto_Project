import React, { useEffect, useState } from "react";
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

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(()=>{
    if((localStorage.getItem("access_token") && (localStorage.getItem("refresh_token")))){
      navigate("/profile")
    }

  },[])

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
        const response = await axiosInstance.post("api/v1/auth/authenticate", values);

        // Başarılı giriş durumunda yapılacak işlemler
        console.log("Başarılı giriş:", response.data);
        localStorage.setItem('access_token',response.data.access_token);
        localStorage.setItem('refresh_token',response.data.refresh_token);
        // Örneğin, kullanıcıyı başka bir sayfaya yönlendir:
        navigate("/profile");
        console.log(actions);
        
        // Hatırla beni işaretliyse, uzun ömürlü bir oturum aç
        if (values.rememberMe) {
          // Uzun ömürlü oturum açma işlemleri
          console.log('Uzun ömürlü oturum açma...');
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
            
    <AnimatedLTR direction="left">
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
            </AnimatedLTR>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
