import { Height } from "@mui/icons-material";
import { useState } from "react";
import { Button } from "reactstrap";

const extrasContents = [
  {
    header: "Super Mini Coverage Package",
    price: 0,
    features: [
      "Wheel, Windscreen, Headlight & Taillight and Side Mirror Coverage",
      "Super Mini Coverage",
    ],
    buttonLabel: "Sign up for free",
    outline: false,
  },
  {
    header: "Medium Coverage Package",
    price: 15,
    features: [
      "Wheel, Windscreen, Headlight & Taillight and Side Mirror Coverage",
      "Super Mini Coverage",
      "Supplementary Liability Coverage",
      "Personal Accident Assurance",
    ],
    buttonLabel: "Get started",
    outline: false,
  },
  
];

const Extra = (props) => {
  const [isOutline, setIsOutline] = useState(true);

  const handleButtonClick = () => {
    setIsOutline(!isOutline);
    // Add any other logic you may need on button click
  };
  return (
    <div style={{ height: '300px' }} className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{props.header}</h4>
      </div>
      <div style={{ height: '200px' }} className="card-body">
        <h1 className="card-title pricing-card-title">
          {`₺${props.price}`}
          <small className="text-muted">/ mo</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          {props.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>
      <button
        className={`btn btn-md btn-block ${
          props.isSelected ? 'btn-primary' : 'btn-outline-primary'
        }`}
        type="button"
        onClick={props.onButtonClick}
      >
        {props.buttonLabel}
      </button>
    </div>
  );
};

export const Extras = ({ steps, activeStep, setActiveStep }) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);

  const handlePackageClick = (index) => {
    setSelectedPackageIndex(index);
    // Add any other logic you may need on package click
  };

  const extras = extrasContents.map((obj, i) => {
    return (
      <div key={obj.header} className="col-md-6">
        <Extra
          header={obj.header}
          price={obj.price}
          features={obj.features}
          buttonLabel={obj.buttonLabel}
          isSelected={selectedPackageIndex === i}
          onButtonClick={() => handlePackageClick(i)}
        />
      </div>
    );
  });


  return (
    <div className="row card-deck mb-3 text-center">
      {extras}
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
  );
};
