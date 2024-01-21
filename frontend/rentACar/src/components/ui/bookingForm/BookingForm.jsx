import React, { useState } from "react";
import "../../../styles/booking-form.css";
import { Button } from "reactstrap";
import { Stepper } from "react-form-stepper";
import { UserDetails } from "./steps/UserDetails/";
import { Extras } from "./steps/Extras/";
import { PaymentDetails } from "./steps/PaymentDetails/";

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
        activeTextColor: "#fff",
        completedTextColor: "#fff",
        inactiveTextColor: "#444",
      }}
    />
  );
}

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "User Details", onClick: () => setActiveStep(0) },
    { title: "Payment", onClick: () => setActiveStep(1) },
    { title: "Payment Information", onClick: () => setActiveStep(2) },
  ];

  const styleConf = [
    { completedBgColor: "#673ab7" },
    { activeBgColor: "#f9a826" },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UserDetails />;
      case 1:
        return <Extras />;
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
          <div className="d-flex align-items-center justify-content-between">
            {activeStep !== steps.length - 1 && (
              <Button
                disabled={activeStep === 0}
                color="secondary"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Previous
              </Button>
            )}
            {
              <div className="d-flex justify-content-end">
                {activeStep !== steps.length - 1 && (
                  <Button
                    type="submit"
                    className="form__btn"
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
