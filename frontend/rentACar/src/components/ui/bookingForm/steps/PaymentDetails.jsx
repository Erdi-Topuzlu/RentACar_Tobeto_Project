import { useTranslation } from "react-i18next";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./creditCard/utils";
import { useFormik } from "formik";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Col, Container, Form, Input, Row } from "reactstrap";
import { Button, Grid } from "@mui/material";
import { paymentDetailScheme } from "../../../../schemes/paymentDetailScheme";

export function PaymentDetails({ steps, activeStep, setActiveStep }) {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
    onSubmit: (values) => {
      // Handle form submission here
      console.log("Form Data:", values);
      // Reset the form
      formik.resetForm();
    },
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      formik.setFieldValue("issuer", issuer);
    }
  };

  const handleInputFocus = ({ target }) => {
    formik.setFieldValue("focused", target.name);
  };

  const handleInputChange = ({ target }) => {
    let value = target.value;
  
    if (target.name === "number") {
      // Remove non-numeric characters
     
      // Format the credit card number
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
      <div>
        <Container className="d-flex justify-content-center">
          <Row>
          <Form onSubmit={formik.handleSubmit}>
            {/* Left Column */}
            <Col md="6" className="mt-2">
              <div key="Payment">
                <div className="App-payment">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-4 mt-4">
                      <Input
                        type="text"
                        id="number"
                        name="number"
                        className="form-control"
                        placeholder="Enter Card Number"
                        pattern="\d*"
                        maxLength="16"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={formik.values.number}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        maxLength="30"
                        pattern="[A-Za-z ]+"
                        required
                        onChange={handleInputChange}
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
                          className="form-control"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          value={formik.values.expiry}
                        />
                      </div>
                      <div className="col-6">
                        <Input
                          type="text"
                          id="cvc"
                          name="cvc"
                          className="form-control"
                          placeholder="CVC"
                          pattern="\d{3,4}"
                          maxLength="4"
                          required
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          value={formik.values.cvc}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
            </Form>

            {/* Right Column */}
            <Col md="6" className="mt-4">
              <div className="App-payment">
                <Cards
                  number={formik.values.number}
                  name={formik.values.name}
                  expiry={formik.values.expiry}
                  cvc={formik.values.cvc}
                  focused={formik.values.focused}
                  callback={handleCallback}
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
    </Container>
  );
}
