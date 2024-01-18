import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Button, Form, FormGroup } from "reactstrap";
import { Stepper } from "react-form-stepper";

function CustomStepper(props) {
  return (
    <Stepper
      { ...props }
      connectorStateColors={true}
      connectorStyleConfig={{
        completedColor: '#673ab7',
        activeColor: '#f9a826',
        disabledColor: '#eee'
      }}
      styleConfig={{
        activeBgColor: '#f9a826',
        completedBgColor: '#673ab7',
        inactiveBgColor: '#eee',
        activeTextColor: '#fff',
        completedTextColor: '#fff',
        inactiveTextColor: '#444'
      }}
      />
  );
}

function UserDetails() {
  return(
    <div className="d-flex align-items-center justify-content-center">
    <Form>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="First Name" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="Last Name" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="email" placeholder="Email" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="number" placeholder="Phone Number" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="text" placeholder="From Address" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input type="text" placeholder="To Address" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select name="" id="">
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select name="" id="">
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input type="date" placeholder="Journey Date" />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          placeholder="Journey Time"
          className="time__picker"
        />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
        ></textarea>
      </FormGroup>
    </Form>
    </div>
  )
}

function Payment() {
  return <h2>Payment information</h2>;
}

function Confirmation() {
  return <h2>Booking is confirmed</h2>;
}

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'User details', onClick: () => setActiveStep(0) },
    { title: 'Payment', onClick: () => setActiveStep(1) },
    { title: 'Booking confirmation', onClick: () => setActiveStep(2) },
  ];

  const styleConf = [
    { completedBgColor: "#673ab7" },
    { activeBgColor: "#f9a826"},
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UserDetails />;
      case 1:
        return <Payment />;
      case 2:
        return <Confirmation />;
      default:
        return null;
    }
  }

  return (
    <>
      <div>
        <CustomStepper styleConfig={styleConf} steps={steps} activeStep={activeStep} />
        <div style={{ padding: "20px" }}>
          {getSectionComponent()}
          <div className="d-flex align-items-center justify-content-between">
          {activeStep !== steps.length - 1 && (
            <Button disabled={activeStep === 0} color="secondary" onClick={() => setActiveStep(activeStep - 1)}>
              Previous
            </Button>
          )}
          <div className="d-flex justify-content-end">
          {activeStep !== steps.length - 1 && (
            <Button className="form__btn" onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
          )}
          </div>
          </div>
        </div>
      </div>
    
    
    </>
  );
};

export default BookingForm;
