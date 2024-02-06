import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Paper, Container } from "@mui/material";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Info = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoToProfileTab = () => {
    // 'tabIndex' parametresini, Profile sayfasında hangi taba geçmek istediğinize göre ayarlayın
    navigate("/profile", { state: { tabIndex: 1 } });
  };

  localStorage.removeItem("userData");
  localStorage.removeItem("Extras");
  localStorage.removeItem("carData");
  localStorage.removeItem("paymentData");
  return (
    <Container>
      <Paper elevation={3} className="mt-4">
        <div className="d-flex align-items-center text-center justify-content-center">
          <span className="mt-2">
            <ReactSVG src="/src/assets/icons/rent-check.svg" />
          </span>
          <h3 className="ml-4 mt-4">{t("completedRental")}</h3>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            onClick={handleGoToProfileTab}
            className="mb-4  form__btn"
          >
            {t("myRentals")}
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Info;
