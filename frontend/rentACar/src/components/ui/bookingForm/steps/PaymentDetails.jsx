import { Button } from "reactstrap";
import PaymentForm from "./creditCard/PaymentForm";

export function PaymentDetails({ steps, activeStep, setActiveStep }) {
  return (
    <>
     <div>
      <PaymentForm />
      
    </div>
    <div>
      <div className="row card-deck mb-3 text-center">
     
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
    </div>

    </>
   

  )
}
