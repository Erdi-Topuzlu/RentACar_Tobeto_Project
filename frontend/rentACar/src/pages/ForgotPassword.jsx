import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import Helmet from "../components/Helmet";
import "../styles/form.css";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";
import { toastSuccess } from "../service/ToastifyService";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (values, actions) => {
      setIsLoading(true); // Butonu devre dışı bırak
      const data = {
        email: values.email,
      };
      try {
        const response = await axiosInstance.post(
          "api/v1/auth/forgot-password",
          data
        );
        navigate("/home");
        toastSuccess(t("resetAndCheckMail"));
      } catch (error) {
        console.error(error);
      } finally {
        actions.setSubmitting(false);
        setIsLoading(false);
      }
    },
  });

  return (
    <Helmet title={t("reset")}>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center p-4">
              <ReactSVG src="/src/assets/icons/forgot_password.svg" />
              <h2 className="section__title mt-2 ">{t("reset")}</h2>
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
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder={
                            formik.errors.email && formik.touched.email
                              ? formik.errors.email
                              : t("email")
                          }
                          invalid={formik.errors.email && formik.touched.email}
                        />
                      </FormGroup>
                    </div>
                    <Button
                      disabled={formik.isSubmitting}
                      className=" form__btn mt-2"
                      type="submit"
                    >
                      {isLoading ? t("sending") : t("submit")}
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

export default ForgotPassword;
