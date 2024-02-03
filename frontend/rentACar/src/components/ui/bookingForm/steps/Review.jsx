import React from 'react'
import { useTranslation } from 'react-i18next';
import { Button, FormGroup } from 'reactstrap'

const Review = ({ steps, activeStep, setActiveStep }) => {
    const { t } = useTranslation();

    return (
        <div>

            <h1>Review</h1>

            <hr style={{ margin: "60px 0 30px" }} />



            <FormGroup>
                <div className="d-flex align-items-center justify-content-between">
                    {activeStep !== steps.length - 2 && (
                        <Button
                            disabled={activeStep === 0}
                            color="secondary"
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            {t("previous")}
                        </Button>
                    )}
                    {
                        <div className="d-flex justify-content-end">
                                <Button
                                    type="submit"
                                    className="form__btn"
                                    
                                >
                                    
                                    {t("Submit rent")}
                                </Button>
                        </div>
                    }
                </div>
            </FormGroup>

        </div>





    )
}

export default Review