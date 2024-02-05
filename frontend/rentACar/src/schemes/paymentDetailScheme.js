import * as yup from "yup";
//const passwordRules = "/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,50}$/"

export const paymentDetailScheme = yup.object().shape({
   
      cardNumber: yup
            .string()
            .required("Card Number is required!"),
      name: yup
            .string()
            .required("Name is required!"),            
      expiry: yup
            .string()
            .required("Expiry Date is required!"),            
      cvv: yup
            .string()
            .required("CVV is required!"), 
            
});