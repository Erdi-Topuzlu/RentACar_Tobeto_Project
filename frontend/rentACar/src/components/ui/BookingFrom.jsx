import React, { useState } from "react";
import "../../styles/booking-form.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Stepper } from "react-form-stepper";
import { useFormik } from "formik";
import { bookingValidationScheme } from "../../schemes/bookingScheme";

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

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      pickupAdress: "",
      dropoffAdress: "",
      pickupDate: "",
      dropoffDate: "",
    },
    validationSchema: bookingValidationScheme,
    onSubmit: (values,actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      
    },
  });


  return(
    <div className="d-flex align-items-center justify-content-center">
    <Form onSubmit={formik.handleSubmit}>
      
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input
        id="firstname"
        name="firstname"
        value={formik.values.firstname}
        className={formik.errors.firstname && formik.touched.firstname && "error"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={formik.errors.firstname && formik.touched.firstname}
        type="text" 
        placeholder="First Name" />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <Input
        id="lastname"
        name="lastname"
        value={formik.values.lastname}
        className={formik.errors.lastname && formik.touched.lastname && "error"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={formik.errors.lastname && formik.touched.lastname}
        type="text" 
        placeholder="Last Name" />
        </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
         <Input
          id="email"
          name="email"
          value={formik.values.email}
          className={formik.errors.email && formik.touched.email && "error"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="E-mail"
          invalid={formik.errors.email && formik.touched.email} />
       </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
         <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          className={formik.errors.phoneNumber && formik.touched.phoneNumber && "error"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Phone Number"
          invalid={formik.errors.phoneNumber && formik.touched.phoneNumber} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <Input
          id="pickupAdress"
          name="pickupAdress"
          value={formik.values.pickupAdress}
          className={formik.errors.pickupAdress && formik.touched.pickupAdress && "error"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Pick-up Adress"
          invalid={formik.errors.pickupAdress && formik.touched.pickupAdress} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <Input
          id="dropoffAdress"
          name="dropoffAdress"
          value={formik.values.dropoffAdress}
          className={formik.errors.dropoffAdress && formik.touched.dropoffAdress && "error"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
          placeholder="Drop-off Adress"
          invalid={formik.errors.dropoffAdress && formik.touched.dropoffAdress} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
      <Input
          id="pickupDate"
          name="pickupDate"
          value={formik.values.pickupDate}
          className={formik.errors.pickupDate && formik.touched.pickupDate && "error"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="date"
          placeholder="Pick-up Date"
          invalid={formik.errors.pickupDate && formik.touched.pickupDate} />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
      <Input
          id="dropoffDate"
          name="dropoffDate"
          value={formik.values.dropoffDate}
          className={formik.errors.dropoffDate && formik.touched.dropoffDate && "error"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="date"
          placeholder="Drop-off Date"
          invalid={formik.errors.dropoffDate && formik.touched.dropoffDate} />
      </FormGroup>

      {/* <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <select name="" id="">
          <option value="1 person">1 Person</option>
          <option value="2 person">2 Person</option>
          <option value="3 person">3 Person</option>
          <option value="4 person">4 Person</option>
          <option value="5+ person">5+ Person</option>
        </select>
      </FormGroup> */}
      {/* <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <select name="" id="">
          <option value="1 luggage">1 luggage</option>
          <option value="2 luggage">2 luggage</option>
          <option value="3 luggage">3 luggage</option>
          <option value="4 luggage">4 luggage</option>
          <option value="5+ luggage">5+ luggage</option>
        </select>
      </FormGroup> */}

      {/* <button type="submit">ok!</button> */}
      
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
          {<div className="d-flex justify-content-end">
          {activeStep !== steps.length - 1 && (
            <Button type="submit" className="form__btn" onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
          )}
          </div> }
          </div>
        </div>
      </div>
    
    
    </>
  );
};

export default BookingForm;
