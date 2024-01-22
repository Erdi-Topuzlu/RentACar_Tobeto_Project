import React from "react";
import { Link,Form } from "react-router-dom";
import { Container, Row, Col, FormGroup, FormFeedback, Button, Input } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import "../styles/contact.css";
import { contactValidationScheme } from "../schemes/contactScheme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { AnimatedLTR, AnimatedUTD } from "../components/ui/animation/animateDiv";

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

const Contact = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: ""
    },
    validationSchema: contactValidationScheme,
    onSubmit: (values,actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      
    },
  });

  return (
    <Helmet title={t('contact')}>
      <CommonSection title={t('contact')} />
      <section>
        <Container>
          <Row>
          
            <Col lg="7" md="7">
            <AnimatedLTR direction="left">
              <h6 className="fw-bold mb-4">{t('getInTouch')}</h6>

              <Form onSubmit={formik.handleSubmit}>

                    <div>
                      <FormGroup>
                        <Input
                          id="name"
                          name="name"
                          value={formik.values.name}
                          className={formik.errors.name && formik.touched.name && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder={t('name')}
                          invalid={formik.errors.name && formik.touched.name}
                          
                        />
                        {formik.errors.name && formik.touched.name && (

                          <FormFeedback >
                            <p className="text-danger"> {formik.errors.name}</p>
                          </FormFeedback>
                        )}


                      </FormGroup>
                    </div>
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
                          id="message"
                          name="message"
                          value={formik.values.message}
                          className={formik.errors.message && formik.touched.message && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="textarea"
                          placeholder={t('message')}
                          invalid={formik.errors.message && formik.touched.message}

                        />
                        {formik.errors.message && formik.touched.message && (
                          <FormFeedback >
                            <p className="text-danger"> {formik.errors.message}</p>
                          </FormFeedback>
                           )}
                      </FormGroup>


                    </div>
                    <Button  disabled={formik.isSubmitting} className="contact__btn" type="submit">
                    {t('send')}
                    </Button>
                  </Form>
                  </AnimatedLTR>
            </Col>
            
                       
            <Col lg="5" md="5">
              <AnimatedUTD direction="up">
              <div className="contact__info">
                <h6 className="fw-bold">{t('contactInfo')}</h6>
                <p className="section__description mb-0">
                  Istanbul,Turkey
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">{t('phone')}</h6>
                  <p className="section__description mb-0">+90 0535 9898 9898</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email : </h6>
                  <p className="section__description mb-0">Pair1@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">{t('follow')}</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
              </AnimatedUTD>
            </Col> 
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
