import * as yup from "yup";
//const passwordRules = "/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,50}$/"

export const paymentDetailScheme = yup.object().shape({
   
      number: yup
            .string()
            .required("Card Number is required!")
            .min(19,"debene"),
      name: yup
            .string()
            .required("Name is required!"),            
      expiry: yup
            .string()
            .required("Expiry Date is required!"),            
      cvc: yup
            .string()
            .required("CVC is required!"), 
            
});