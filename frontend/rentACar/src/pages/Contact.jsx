import React, { useState } from "react";
import { Link, Form } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  FormGroup,
  FormFeedback,
  Button,
  Input,
} from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import "../styles/contact.css";
import { useTranslation } from "react-i18next";
import {
  AnimatedLTR,
  AnimatedUTD,
} from "../components/ui/animation/animateDiv";
import { m } from "framer-motion";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";
import { toastError, toastSuccess } from "../service/ToastifyService";
import { useFormik } from "formik";

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

  const [name, setName] = useState();
  const [mail, setMail] = useState();
  const [message, setMessage] = useState();


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      messages: "",
    },
    onSubmit: async (values, actions) => {

      const data = {
        name: values.name,
        email: values.email,
        messages: values.messages,
      };

      try {
        await axiosInstance.post("api/v1/admin/contacts", data);
        toastSuccess(t("successSend"));
        
      } catch (error) {
        if (error.response.data.message === "VALIDATION.EXCEPTION") {
          toastError(
            JSON.stringify(error.response.data.validationErrors.startDate)
          );
        } else if (error.response.data.type === "BUSINESS.EXCEPTION") {
          toastError(JSON.stringify(error.response.data.message));
        } else {
          toastError(t("unknownError"));
        }
      }finally{
        window.location.reload();
      }
    },
  });




  return (
    <Helmet title={t("contact")}>
      <CommonSection title={t("contact")} />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <AnimatedLTR direction="left">
                <h6 className="fw-bold mb-4">{t("getInTouch")}</h6>

                <Form onSubmit={formik.handleSubmit}>

                  <div>
                    <FormGroup>
                      <Input
                        id="name"
                        name="name"
                        value={formik.values.name || name}

                        onChange={(e) => {
                          formik.handleChange(e);
                          setName(e.target.value);

                        }}
                        className={
                          formik.errors.name && formik.touched.name && "error"
                        }
                        type="text"
                        placeholder={
                          formik.errors.name && formik.touched.name
                            ? formik.errors.name
                            : t("fName")
                        }
                        error={formik.errors.name && formik.touched.name}
                      />

                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup>
                      <Input
                        id="email"
                        name="email"
                        value={formik.values.email || mail}

                        onChange={(e) => {
                          formik.handleChange(e);
                          setMail(e.target.value);

                        }}
                        className={
                          formik.errors.email && formik.touched.email && "error"
                        }
                        type="text"
                        placeholder={
                          formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : t("email")
                        }
                        error={formik.errors.email && formik.touched.email}
                      />

                    </FormGroup>
                  </div>

                  <div>
                    <FormGroup>
                      <Input
                        id="messages"
                        name="messages"
                        value={formik.values.messages}

                        onChange={(e) => {
                          formik.handleChange(e);
                          setMessage(e.target.value);
                          

                        }}
                        className={
                          formik.errors.messages && formik.touched.messages && "error"
                        }
                        type="text"
                        placeholder={
                          formik.errors.messages && formik.touched.messages
                            ? formik.errors.messages
                            : t("message")
                        }
                        error={formik.errors.messages && formik.touched.messages}
                      />

                    </FormGroup>
                  </div>

                  <Button
                    className="contact__btn"
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    {t("send")}
                  </Button>

                </Form>
              </AnimatedLTR>
            </Col>

            <Col lg="5" md="5">
              <AnimatedUTD direction="up">
                <div className="contact__info">
                  <h6 className="fw-bold">{t("contactInfo")}</h6>
                  <p className="section__description mb-0">Istanbul,Turkey</p>
                  <div className=" d-flex align-items-center gap-2">
                    <h6 className="fs-6 mb-0">{t("phone")}</h6>
                    <p className="section__description mb-0">
                      +90 0535 9898 9898
                    </p>
                  </div>

                  <div className=" d-flex align-items-center gap-2">
                    <h6 className="mb-0 fs-6">{t("email")} </h6>
                    <p className="section__description mb-0">pair1@gmail.com</p>
                  </div>

                  <h6 className="fw-bold mt-4">{t("follow")}</h6>

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
