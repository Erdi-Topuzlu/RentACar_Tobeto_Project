import { Height } from "@mui/icons-material";
import React, { useState } from "react";
import { Button } from "reactstrap";

const extrasContents = [
  {
    header: "Super Mini Coverage Package",
    price: 0,
    features: [
      "Wheel, Windscreen, Headlight & Taillight and Side Mirror Coverage",
      "Super Mini Coverage",
    ],
    buttonLabel: "Add Package",
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
    buttonLabel: "Add Package",
    outline: false,
  },
  
];



const Extra = (props) => {

  const buttonStyle = {
    backgroundColor: props.isSelected ? '#6f42c1' : 'transparent',
    color: props.isSelected ? '#fff' : '#6f42c1',
    border: `1px solid ${props.isSelected ? '#6f42c1' : '#6f42c1'}`,
  };
  return (
    <button
    className={`btn-md btn-block ${
      props.isSelected ? 'form__btn' : 'form__btn'
    }`}
    type="button"
    onClick={props.onButtonClick}
    style={buttonStyle}
  >
    <div style={{ height: '300px' }} className="card mb-2 mt-2 shadow-sm">
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
    </div>
  </button>
  );
};

export const Extras = ({ steps, activeStep, setActiveStep }) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);

  const handlePackageClick = (index) => {
    setSelectedPackageIndex((prevIndex) => (prevIndex === index ? null : index));
          localStorage.removeItem("Extras");

    // Add any other logic you may need on package click
  };

  React.useEffect(() => {
    if (selectedPackageIndex !== null) {
      const selectedPackage = extrasContents[selectedPackageIndex];
      //console.log("Selected Package:", selectedPackage);
      localStorage.setItem("Extras", JSON.stringify(selectedPackage));

    }
  }, [selectedPackageIndex]);

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
      <hr style={{ margin: "60px 0 30px" }} />

      <div className="d-flex align-items-center justify-content-between mt-4">
        
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