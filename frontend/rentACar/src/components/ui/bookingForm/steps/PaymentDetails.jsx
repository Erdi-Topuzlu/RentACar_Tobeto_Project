import { useTranslation } from "react-i18next";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import { useFormik } from "formik";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Col, Container, Form, Input, Row } from "reactstrap";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import getPaymentDetailScheme from "../../../../schemes/paymentDetailScheme";



export function PaymentDetails({ steps, activeStep, setActiveStep }) {
  const paymentDetailScheme = getPaymentDetailScheme();
  const { t } = useTranslation();
  const [issuer, setIssuer] = useState("");

  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
    validationSchema: paymentDetailScheme,
    onSubmit: (values, actions) => {
      const data = JSON.stringify(values);
      localStorage.setItem("paymentData", data);
      setActiveStep(activeStep + 1);
    },
  });

  const handleInputFocus = ({ target }) => {
    formik.setFieldValue("focused", target.name);
  };

  const handleInputChange = ({ target }) => {
    let value = target.value;

    if (target.name === "number") {

      value = formatCreditCardNumber(value);
    } else if (target.name === "expiry") {
      value = formatExpirationDate(value);
    } else if (target.name === "cvc") {
      value = formatCVC(value);
    } else if (target.name === "name") {
      value = value.replace(/[^A-Za-z ]/g, "");
    }

    formik.setFieldValue(target.name, value);
  };

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
      <div>
        <Container className="d-flex justify-content-center">
          <Row>
            
              {/* Left Column */}
              <Col md="6" className="mt-2">
                <div key="Payment">
                  <div className="App-payment">
                    <div className="form-group mb-4 mt-4">
                      <Input
                        type="text"
                        id="number"
                        name="number"
                        className={
                          formik.errors.number &&
                          formik.touched.number &&
                          "error"
                        }
                        placeholder={
                          formik.errors.number && formik.touched.number
                            ? formik.errors.number
                            : t("cardNumber")
                        }
                        //pattern="\d*"
                        maxLength="19"
                        invalid={formik.errors.number && formik.touched.number}
                        onChange={handleInputChange}
                        onBlur={formik.handleBlur}
                        onFocus={handleInputFocus}
                        value={formik.values.number}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        className={
                          formik.errors.name && formik.touched.name && "error"
                        }
                        placeholder={
                          formik.errors.name && formik.touched.name
                            ? formik.errors.name
                            : t("cardFullName")
                        }
                        maxLength="25"
                        invalid={formik.errors.name && formik.touched.name}
                        pattern="[A-Za-z ]+"
                        onChange={handleInputChange}
                        onBlur={formik.handleBlur}
                        onFocus={handleInputFocus}
                        value={formik.values.name}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Input
                          type="text"
                          id="expiry"
                          name="expiry"
                          className={
                            formik.errors.expiry && formik.touched.expiry && "error"
                          }
                          placeholder={
                            formik.errors.expiry && formik.touched.expiry
                              ? formik.errors.expiry
                              : t("cardMonthandYear")
                          }
                          maxLength="5"
                          invalid={formik.errors.expiry && formik.touched.expiry}
                          onChange={handleInputChange}
                          onBlur={formik.handleBlur}
                          onFocus={handleInputFocus}
                          value={formik.values.expiry}
                        />
                      </div>
                      <div className="col-6">
                        <Input
                          type="text"
                          id="cvc"
                          name="cvc"
                          className={
                            formik.errors.cvc && formik.touched.cvc && "error"
                          }
                          placeholder={
                            formik.errors.cvc && formik.touched.cvc
                              ? formik.errors.cvc
                              : t("CVC")
                          }
                          pattern="\d{3,4}"
                          maxLength="4"
                          invalid={formik.errors.cvc && formik.touched.cvc}
                          onChange={handleInputChange}
                          onBlur={formik.handleBlur}
                          onFocus={handleInputFocus}
                          value={formik.values.cvc}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
           

            {/* Right Column */}
            <Col md="6" className="mt-4">
              <div className="App-payment">
                <Cards
                  number={formik.values.number}
                  name={formik.values.name}
                  expiry={formik.values.expiry}
                  cvc={formik.values.cvc}
                  focused={formik.values.focused}
                />
              </div>
            </Col>
          </Row>
          <hr style={{ margin: "60px 0 30px" }} />
        </Container>
        <hr style={{ margin: "60px 0 30px" }} />
      </div>
      <div>
        <div className="row card-deck mb-3 text-center">
          <Grid container justifyContent="space-between">
            {activeStep !== steps.length - 1 && (
              <Button
                disabled={activeStep === 0}
                style={{ backgroundColor: "GrayText", color: "white" }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                {t("previous")}
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button
                type="submit"
                style={{ backgroundColor: "#673ab7", color: "white" }}
                onSubmit={() => setActiveStep(activeStep + 1)}
              >
                {t("next")}
              </Button>
            )}
          </Grid>
        </div>
      </div>
      </Form>
    </Container>
  );
}
