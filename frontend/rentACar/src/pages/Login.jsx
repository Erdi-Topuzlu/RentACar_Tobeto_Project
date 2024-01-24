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
import Cookies from "js-cookie";
import { ReactSVG } from "react-svg";

const Login = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    // Tarayıcı çerezlerini kontrol et ve token varsa otomatik olarak giriş yap
    const token = Cookies.get("remember-me");
    if (token) {
      // Token'ı kullanarak kullanıcıyı oturum aç
      // setUser(decodedUser); gibi bir fonksiyon çağrısı yapılabilir
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axiosInstance.post(
          "api/v1/auth/authenticate",
          values
        );

        const token = response.data.access_token;

        // Başarılı giriş durumunda yapılacak işlemler
        console.log("Başarılı giriş:", response.data);

        // Hatırla beni işaretliyse, uzun ömürlü bir oturum aç
        if (values.rememberMe) {
          Cookies.set("remember-me", token, { expires: 7 });
          console.log("Uzun ömürlü oturum açma...");
        }

        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        // Örneğin, kullanıcıyı başka bir sayfaya yönlendir:
        navigate("/home");

        // TODO: BURADA SAYFA YENİLENİYOR VE UFAK BİR ÜÇKAĞITÇILIK VAR.
        // DÜZELTİLMESİ GEREK?
        window.location.reload();
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
