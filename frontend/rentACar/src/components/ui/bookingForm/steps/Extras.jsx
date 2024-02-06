import { Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Extras = ({ steps, activeStep, setActiveStep }) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const { t } = useTranslation();

  const extrasContents = [
    // Your content here
    {
      header: t("miniPackage"),
      id:1,
      price: 200.99,
      features: [
        t("miniDesc"),
        t("miniPackage"),
      ],
      buttonLabel: "Add Package",
      outline: false,
    },
    {
      header: t("mediumPackage"),
      price: 350.99,
      id:2,
      features: [
        t("miniDesc"),
        t("miniPackage"),
        t("supplementary"),
        t("personalAccident"),
      ],
      buttonLabel: "Add Package",
      outline: false,
    },
  ];

  const handlePackageClick = (index) => {
    setSelectedPackageIndex((prevIndex) => (prevIndex === index ? null : index));
    localStorage.removeItem("Extras");
  };

  React.useEffect(() => {
    if (selectedPackageIndex !== null) {
      const selectedPackage = extrasContents[selectedPackageIndex];
      localStorage.setItem("Extras", JSON.stringify(selectedPackage));
    }
  }, [selectedPackageIndex]);

  const extras = extrasContents.map((obj, i) => (
    <div key={obj.header} className="col-md-6">
      <button
        className={`btn-md btn-block ${selectedPackageIndex === i ? "form__btn" : "form__btn"}`}
        type="button"
        onClick={() => handlePackageClick(i)}
        style={{
          backgroundColor: selectedPackageIndex === i ? "#6f42c1" : "transparent",
          color: selectedPackageIndex === i ? "#fff" : "#6f42c1",
          border: `1px solid ${selectedPackageIndex === i ? "#6f42c1" : "#6f42c1"}`,
        }}
      >
        <div style={{ height: "300px" }} className="card mb-2 mt-2 shadow-sm">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">{obj.header}</h4>
          </div>
          <div style={{ height: "200px" }} className="card-body">
            <h1 className="card-title pricing-card-title">
              {`₺${obj.price}`}
              <small className="text-muted">/ {t("month")}</small>
            </h1>
            <ul className="list-unstyled mt-3 mb-4">
              {obj.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </div>
  ));

  return (
    <Container>
      <div className="row card-deck mb-3 text-center">
        {extras}
        <hr style={{ margin: "60px 0 30px" }} />

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
              style={{ backgroundColor: "#673ab7", color: "white" }}
              onClick={() => setActiveStep(activeStep + 1)}
            >
              {t("next")}
            </Button>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default Extras;
