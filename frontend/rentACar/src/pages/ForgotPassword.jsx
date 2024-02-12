import React from "react";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import Helmet from "../components/Helmet";
import "../styles/form.css";
import { useFormik } from "formik";
import getLoginValidationSchema from "../schemes/loginScheme";
import { useTranslation } from "react-i18next";


const ForgotPassword = () => {
  const { t } = useTranslation();
  
  const loginValidationSchema = getLoginValidationSchema();

  const formik = useFormik({
    initialValues: {
      email: "",
     
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values,actions) => {
      actions.resetForm();
    },
  });


  return (
    <Helmet title={t("forgot")}>
      <section >
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="rgba(43,8,104,1)"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
              <h2 className="section__title ">{t("forgot")}</h2>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <Col lg="4" className="mb-5 text-center">



                  <Form onSubmit={formik.handleSubmit}>

                    <div>
                      <FormGroup className="">
                        <Input
                          id="email"
                          name="email"
                          value={formik.values.email}
                          className={formik.errors.email && formik.touched.email && "error"}
                          onChange={formik.handleChange}
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
   
                    <Button disabled={formik.isSubmitting} className=" form__btn mt-2" type="submit">
                    {t("reset")}
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
