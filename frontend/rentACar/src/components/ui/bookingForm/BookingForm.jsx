import React, { useState } from "react";
import "../../../styles/booking-form.css";
import { UserDetails } from "./steps/UserDetails/";
import { Extras } from "./steps/Extras/";
import { PaymentDetails } from "./steps/PaymentDetails/";
import { useTranslation } from "react-i18next";
import { CustomStepper } from "../../helper/stepper";

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useTranslation();

  const steps = [
    { label: t("userDetails"), onClick: () => setActiveStep(0) },
    { label: t("extras"), onClick: () => setActiveStep(1) },
    { label: t("paymentInfo"), onClick: () => setActiveStep(2) },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <UserDetails
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <Extras
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return <PaymentDetails />;
      default:
        return null;
    }
  }

  return (
    <>
      <div>
        <CustomStepper steps={steps} activeStep={activeStep} />
        <div style={{ padding: "20px" }}>{getSectionComponent()}</div>
      </div>
    </>
  );
};

export default BookingForm;
