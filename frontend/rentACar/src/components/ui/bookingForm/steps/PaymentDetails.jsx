import { useTranslation } from "react-i18next";
import PaymentForm from "./creditCard/PaymentForm";
import { Container, Grid, Button } from '@mui/material';


export function PaymentDetails({ steps, activeStep, setActiveStep }) {

  const { t } = useTranslation();

  return (
    <Container>
      <div>
      
      <PaymentForm />
      <hr style={{ margin: "60px 0 30px" }} />


    </div>
      <div>
        <div className="row card-deck mb-3 text-center">

          <Grid container justifyContent="space-between">

            {activeStep !== steps.length - 1 && (
              <Button
                disabled={activeStep === 0}
                color="secondary"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                {t("previous")}
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button
                className="form__btn"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </Button>
            )}
          </Grid>
        </div>
      </div>

      </Container>


  )
}
