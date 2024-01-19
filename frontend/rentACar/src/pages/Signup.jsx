import React from "react";
import { Form, Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, FormGroup, FormFeedback } from "reactstrap";
import "../styles/form.css";
import Helmet from "../components/Helmet";
import { signUpValidationSchema } from "../schemes/signUpScheme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";



const signUp = () => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values,actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      
    },
  });

  return (
    <Helmet title={t("signup")}>
      <section >
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
              <h2 className="section__title">{t("signup")}</h2>
              <div className="d-flex mt-4 justify-content-center align-items-center">
                <Col lg="4" className="mb-5 text-center">



                  <Form onSubmit={formik.handleSubmit}>

                    <div>
                      <FormGroup>
                        <Input
                          id="email"
                          name="email"
                          value={formik.values.email}
                          className={formik.errors.email && formik.touched.email && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder="E-mail"
                          invalid={formik.errors.email && formik.touched.email}
                          
                        />
                        {formik.errors.email && formik.touched.email && (

                          <FormFeedback >
                            <p className="text-danger"> {formik.errors.email}</p>
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
                          className={formik.errors.password && formik.touched.password && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="password"
                          placeholder={t("password")}
                          invalid={formik.errors.password && formik.touched.password}

                        />
                        {formik.errors.password && formik.touched.password && (
                          <FormFeedback >
                          <p className="text-danger"> {formik.errors.password}</p>
                        </FormFeedback>
                        )}
                      </FormGroup>

                    </div>
                    <div>
                      <FormGroup>
                        <Input
                          id="cpw"
                          name="confirmPassword"
                          value={formik.values.confirmPassword}
                          className={formik.errors.confirmPassword && formik.touched.confirmPassword && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="password"
                          placeholder={t("confirm")}
                          invalid={formik.errors.confirmPassword && formik.touched.confirmPassword}

                        />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                          <FormFeedback >
                            <p className="text-danger"> {formik.errors.confirmPassword}</p>
                          </FormFeedback>
                           )}
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
                    <Button  disabled={formik.isSubmitting} className=" form__btn" type="submit">
                    {t("signup")}
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

export default signUp;
