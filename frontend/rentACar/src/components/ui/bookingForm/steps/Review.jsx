import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";

const Review = ({ steps, activeStep, setActiveStep }) => {
  const [totalDays, setTotalDays] = useState(1);
  const { t } = useTranslation();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const Extras = JSON.parse(localStorage.getItem("Extras"));
  const carData = JSON.parse(localStorage.getItem("carData"));
  const paymentData = JSON.parse(localStorage.getItem("paymentData"));
  const { id } = useParams();
  const { details, status, error } = useSelector((state) => state.userDetail);
  const usersId = details?.id;

  console.log("carid",id)
  console.log("user", userData);
  console.log("extra", Extras);
  console.log("car", carData);
  console.log("pay", paymentData);
  console.log("userid", usersId);
  
  const extraId = Extras ? Extras.id : 3;
  


  useEffect(() => {
    const startDate = new Date(userData.pickupDate);
    const endDate = new Date(userData.dropoffDate);
    setTotalDays(
      startDate.toDateString() === endDate.toDateString()
        ? 1
        : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    );
  }, [userData?.pickupDate, userData?.dropoffDate]);

  const numberWithStars = (number) => {
    if (number && typeof number === "string") {
      const firstFour = number.slice(0, 4);
      const lastFour = number.slice(-4);

      const numAsterisks = Math.max(0, number.length - 8);

      const maskedMiddle = "*".repeat(numAsterisks);

      const maskedNumber = firstFour + maskedMiddle + lastFour;

      return maskedNumber;
    } else {
      return "";
    }
  };
  const maskedNumber = numberWithStars(paymentData.number);
  

  const handleSubmit = async () => {
    const data = {
      startDate: userData?.pickupDate,
      endDate: userData?.dropoffDate,
      isFinished:"false",
      carId: id,
      userId: usersId,
      extraId: extraId
    };


    try {
      const response = await axiosInstance.post("api/v1/users/rentals",
      data);
      // window.location.reload();
      setActiveStep(activeStep + 1);
      console.log("response", response)
    } catch (error) {
      console.error("Kayıt hatası:" ,error);
    
  };
}

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6} className="mt-4">
          <Paper elevation={3} className="preview-container">
            <span
              style={{ fontWeight: "bold", margin: "8px", fontSize: "20px" }}
            >
              <i className="ri-user-line"></i> {t("userDetails")}
            </span>

            <hr />
            <List>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("cardFullName")} :{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {userData?.firstname} {userData?.lastname.toUpperCase()}
                  </span>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("email")} :{" "}
                  <span style={{ fontWeight: "normal" }}>{userData?.email}</span>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("phone")}{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {userData?.phoneNumber}
                  </span>
                </span>
              </ListItem>
            </List>
          </Paper>

          <Paper elevation={3} className="preview-container mt-4">
            <span
              style={{ fontWeight: "bold", margin: "8px", fontSize: "20px" }}
            >
              <i className="ri-bank-card-2-line"></i> {t("paymentInfo")}
            </span>
            <hr />

            <List>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("cardNumber")} :{" "}
                  <span style={{ fontWeight: "normal" }}>{maskedNumber}</span>
                </span>
              </ListItem>

              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("cardFullName")} :{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {paymentData?.name.toUpperCase()}
                  </span>
                </span>
              </ListItem>

              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  CVC : <span style={{ fontWeight: "normal" }}>***</span>
                </span>
              </ListItem>

              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("expiry")} :{" "}
                  <span style={{ fontWeight: "normal" }}>
                    {paymentData?.expiry}
                  </span>
                </span>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6} className="mt-4">
          <Paper elevation={3} className="preview-container">
            <span
              style={{ fontWeight: "bold", margin: "8px", fontSize: "20px" }}
            >
              <i className="ri-sparkling-2-fill"></i> {t("extras")}
            </span>
            <hr />
            {Extras ? (
              <>
                <List>
                  <ListItem>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: "4px",
                        fontSize: "16px",
                      }}
                    >
                      {t("selectedPackage")} :{" "}
                      <span style={{ fontWeight: "normal" }}>
                        {Extras?.header}
                      </span>
                    </span>
                  </ListItem>
                  <ListItem>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: "4px",
                        fontSize: "16px",
                      }}
                    >
                      {t("packageDetails")} :
                      <List>
                        {Extras?.features.map((feature, index) => (
                          <ListItem key={index}>
                            <span
                              style={{
                                fontWeight: "normal",
                                marginLeft: "4px",
                                fontSize: "16px",
                              }}
                            >
                              •
                            </span>{" "}
                            {feature}
                          </ListItem>
                        ))}
                      </List>
                    </span>
                  </ListItem>
                </List>
                <hr />
                <div className="d-flex justify-content-end">
                  <div className="p-2">
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "green",
                        fontSize: "20px",
                      }}
                    >
                      {" "}
                      {t("packageAmount")}
                      {Extras?.price} ₺{" "}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <ListItem>
                <span>{t("anyPackage")}</span>
              </ListItem>
            )}
          </Paper>

          <Paper elevation={3} className="preview-container mt-4">
            <span
              style={{ fontWeight: "bold", margin: "8px", fontSize: "20px" }}
            >
              <i className="ri-car-fill"></i> {t("carDetails")}
            </span>
            <hr />
            <List>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("selectedCar")}
                  <span style={{ fontWeight: "normal" }}>
                    {carData?.modelId?.brandId?.name} | {carData?.modelId?.name}
                  </span>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("dailyPrice")}
                  <span style={{ fontWeight: "normal" }}>
                    {carData?.dailyPrice} ₺
                  </span>
                </span>
              </ListItem>
              <ListItem>
                <span
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4px",
                    fontSize: "16px",
                  }}
                >
                  {t("rentalDays")}
                  <span style={{ fontWeight: "normal" }}>
                    {userData?.pickupDate} / {userData?.dropoffDate} ({totalDays}{" "}
                    {t("days")})
                  </span>
                </span>
              </ListItem>
            </List>
            <hr />

            <div className="d-flex justify-content-end">
              <div className="p-2">
                <span
                  style={{
                    fontWeight: "bold",
                    color: "green",
                    fontSize: "20px",
                  }}
                >
                  {t("totalAmount")}
                  {totalDays * carData?.dailyPrice + (Extras?.price || 0)} ₺{" "}
                </span>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>

      <hr style={{ margin: "60px 0 30px" }} />

      <div>
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
          <Button
            style={{ backgroundColor: "#673ab7", color: "white" }}
            onClick={handleSubmit}
          >
            {t("Rent this car ")}
          </Button>
        </Grid>
      </div>
    </Container>
  );
};

export default Review;
