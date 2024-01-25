/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import { ReactSVG } from "react-svg";
import { Card, CardActions, Grid } from "@mui/joy";

export default function Dashboard() {

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
        DASHBOARD 
        </Typography>
        
      </Box>
      <Grid container>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/slider.svg" />
            </CardActions>
            <Button size="md">Slider</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/brand-dashboard.svg" />
            </CardActions>
            <Button size="md">Brands</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/model-dashboard.svg" />
            </CardActions>
            <Button size="md">Models</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/color-dashboard.svg" />
            </CardActions>
            <Button size="md">Colors</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/car-dashboard.svg" />
            </CardActions>
            <Button size="md">Cars</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/key.svg" />
            </CardActions>
            <Button size="md">Rentals</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/bill-dashboard.svg" />
              
            </CardActions>
            <Button size="md">Invoices</Button>
          </Card>
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardActions
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ReactSVG src="/src/assets/icons/user-dashboard.svg" />
            </CardActions>
            <Button size="md">Users</Button>
          </Card>
        </Grid>

        
      </Grid>
    </React.Fragment>
  );
}
