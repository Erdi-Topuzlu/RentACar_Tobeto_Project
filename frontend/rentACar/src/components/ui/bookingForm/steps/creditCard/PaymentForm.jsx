import React, { useState, useRef } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData
} from "./utils";
import { Col, Container, Input, Row } from 'reactstrap';

const PaymentForm = ({ steps, activeStep, setActiveStep }) => {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  });



  const formRef = useRef(null);

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState(prevState => ({ ...prevState, issuer }));
    }
  };

  const handleInputFocus = ({ target }) => {
    setState(prevState => ({ ...prevState, focused: target.name }));
    
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
      value = value.replace(/[^A-Za-z ]/g, ''); // Sadece harfleri ve boşlukları kabul et
    }

    

    setState(prevState => ({ ...prevState, [target.name]: value }));
    localStorage.setItem("PaymentFormData", JSON.stringify(state));

  };

  const handleSubmit = e => {
    e.preventDefault();

    const { issuer } = state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setState(prevState => ({ ...prevState, formData }));
    console.log("Form Data:", state);
    formRef.current.reset();
  };

  const { name, number, expiry, cvc, focused, issuer, formData } = state;

  return (

    <Container className='d-flex justify-content-center'>
      <Row>
        {/* Left Column */}
        <Col md="6" className='mt-2'>
          <div key="Payment">
            <div className="App-payment">
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group mb-4 mt-4">
                  <Input
                    type="text"
                    id="number"
                    name="number"
                    className="form-control"
                    placeholder="Enter Card Number"
                    pattern="\d*"
                    maxLength="16"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className="form-group mb-4">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                    pattern="[A-Za-z ]+"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
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
                      maxLength="4"
                      required
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
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
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>

        {/* Right Column */}
        <Col md="6" className='mt-4'>
          <div className="App-payment">
            <Cards
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={handleCallback}
            />
          </div>
        </Col>
      </Row>
      <hr style={{ margin: "60px 0 30px" }} />

      

    </Container>

    


  );

};

export default PaymentForm;

