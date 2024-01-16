import React from "react";
import { Link,Form } from "react-router-dom";
import { Container, Row, Col, FormGroup, Input, FormFeedback } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import "../styles/contact.css";
import { contactValidationSchema } from "../schemes/contactScheme";
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

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: ""
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values,actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      
    },
  });

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={formik.handleSubmit}>
              
                <div>
                <FormGroup className="contact__form">
                 
                 <Input
 
                           id="asd"
                           name="name"
                           value={formik.values.name}
                           className={formik.errors.name && formik.touched.name && "error"}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           type="text"
                           placeholder="Your Name"
                           invalid={formik.touched.name && formik.errors.name}
                           
                         />
                         {formik.errors.name && formik.touched.name && (
 
                           <FormFeedback >
                             <p className="text-danger"> {formik.errors.name}</p>
                           </FormFeedback>
                         )}
                 </FormGroup>
                    </div>
                    <div>
                    <FormGroup className="contact__form">
                <Input
                          id="dfg"
                          name="email"
                          value={formik.values.email}
                          className={formik.errors.email && formik.touched.email && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder="E-mail"
                          invalid={formik.touched.email && formik.errors.email}
                          
                        />
                        {formik.errors.email && formik.touched.email && (

                          <FormFeedback >
                            <p className="text-danger"> {formik.errors.email}</p>
                          </FormFeedback>
                        )}
                </FormGroup>
                    </div>
                
                <div>
                <FormGroup className="contact__form">
                <Input
                          id="tyu"
                          name="message"
                          value={formik.values.message}
                          className={formik.errors.message && formik.touched.message && "error"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder="Type your message.."
                          invalid={formik.touched.message && formik.errors.message}
                          
                        />
                        {formik.errors.message && formik.touched.message && (

                          <FormFeedback >
                            <p className="text-danger"> {formik.errors.message}</p>
                          </FormFeedback>
                        )}
                  
                </FormGroup>
                </div>
              
                <button disabled={formik.isSubmitting} className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  123 ZindaBazar, Sylhet, Bangladesh
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+88683896366</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">example@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

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
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
