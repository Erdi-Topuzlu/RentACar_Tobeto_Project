import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { ReactSVG } from "react-svg";
import { Card, CardActions, Grid } from "@mui/joy";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const location = useLocation();
  const isDashboardPage = location.pathname === "/admin/dashboard";

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          {t("dashboard").toUpperCase()}
        </Typography>
      </Box>
      <hr />
      <Grid sx={{ margin: 8 }} container>
        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../brands" : "brands"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/brand-dashboard.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("brands")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../models" : "models"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/model-dashboard.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("models")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../colors" : "colors"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/color-dashboard.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("colors")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../cars" : "cars"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/car-dashboard.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("cars")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../rentals" : "rentals"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/key.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("rentals")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../campaigns" : "campaigns"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/campaign.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("campaigns")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../users" : "users"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/user-dashboard.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("users")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../carImages" : "carImages"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/car-images.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("carImg")}
              </Button>
            </Card>
          </Link>
        </Grid>
        
        <Grid xs={12} sm={6} md={3}></Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../slider" : "slider"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/slider.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("slider")}
              </Button>
            </Card>
          </Link>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Link
            to={isDashboardPage ? "../contact" : "contact"}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ marginRight: 1, marginBottom: 1 }}>
              <CardActions
                sx={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ReactSVG src="/src/assets/icons/contact.svg" />
              </CardActions>
              <Button
                style={{
                  background: "rgb(104,11,156)",
                  background:
                    "linear-gradient(90deg, rgba(104,11,156,1) 0%, rgba(56,0,83,1) 100%)",
                  color: "white",
                }}
                size="md"
              >
                {t("contact")}
              </Button>
            </Card>
          </Link>
        </Grid>
        <Grid xs={12} sm={6} md={3}></Grid>
      </Grid>
    </React.Fragment>
  );
}
