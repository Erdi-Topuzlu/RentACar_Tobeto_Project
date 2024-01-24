import { Button } from "reactstrap";

const extrasContents = [
  {
    header: "Free",
    price: 0,
    features: [
      "10 users included",
      "2 GB of storage",
      "Email support",
      "Help center access",
    ],
    buttonLabel: "Sign up for free",
    outline: true,
  },
  {
    header: "Pro",
    price: 15,
    features: [
      "20 users included",
      "10 GB of storage",
      "Priority email support",
      "Help center access",
    ],
    buttonLabel: "Get started",
    outline: false,
  },
  {
    header: "Enterprise",
    price: 29,
    features: [
      "30 users included",
      "15 GB storage",
      "Phone and email support",
      "Help center access",
    ],
    buttonLabel: "Contact us",
    outline: false,
  },
];

const Extra = (props) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{props.header}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          {`$${props.price}`}
          <small className="text-muted">/ mo</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          {props.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <button
          className={`btn btn-lg btn-block ${
            props.outline ? "btn-outline-primary" : "btn-primary"
          }`}
          type="button"
        >
          {props.buttonLabel}
        </button>
      </div>
    </div>
  );
};

export const Extras = ({ steps, activeStep, setActiveStep }) => {
  const extras = extrasContents.map((obj, i) => {
    return (
      <div key={obj.header} className="col-md-4">
        <Extra
          header={obj.header}
          price={obj.price}
          features={obj.features}
          buttonLabel={obj.buttonLabel}
          outline={obj.outline}
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
