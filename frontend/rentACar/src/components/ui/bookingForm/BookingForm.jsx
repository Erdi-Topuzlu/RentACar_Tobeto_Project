import React, { useState } from "react";
import "../../../styles/booking-form.css";
import { Button } from "reactstrap";
import { Stepper } from "react-form-stepper";
import { UserDetails } from "./steps/UserDetails/";
import { Extras } from "./steps/Extras/";
import { PaymentDetails } from "./steps/PaymentDetails/";
import { useTranslation } from "react-i18next";

function CustomStepper(props) {
  return (
    <Stepper
      {...props}
      connectorStateColors={true}
      connectorStyleConfig={{
        completedColor: "#673ab7",
        activeColor: "#f9a826",
        disabledColor: "#eee",
        
      }}
      styleConfig={{
        activeBgColor: "#f9a826",
        completedBgColor: "#673ab7",
        inactiveBgColor: "#eee",
        activeTextColor: "#000",
        completedTextColor: "#eee",
        inactiveTextColor: "#444",
      }}
    />
  );
}

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  const steps = [
    { label: t('userDetails'), onClick: () => setActiveStep(0) },
    { label: t('extras'), onClick: () => setActiveStep(1) },
    { label: t('paymentInfo'), onClick: () => setActiveStep(2) },
  ];

  const styleConf = [
    { completedBgColor: "#673ab7" },
    { activeBgColor: "#f9a826" },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UserDetails steps={steps} activeStep={activeStep} setActiveStep={setActiveStep}/>;
      case 1:
        return <Extras steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />;
      case 2:
        return <PaymentDetails />;
      default:
        return null;
    }
  }

  return (
    <>
      <div>
        <CustomStepper
          styleConfig={styleConf}
          steps={steps}
          activeStep={activeStep}
        />
        <div style={{ padding: "20px" }}>
          {getSectionComponent()}
          
        </div>
      </div>
    </>
  );
};

export default BookingForm;
