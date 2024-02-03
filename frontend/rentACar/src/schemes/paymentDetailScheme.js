import * as yup from "yup";
//const passwordRules = "/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,50}$/"

export const paymentDetailScheme = yup.object().shape({
   
      cardNumber: yup
            .string()
            .email("Invalid E-mail format")
            .required("E-mail required!"),
      name: yup
            .string()
            .required("Password required!")
            .min(5, "Minimum of 5 characters"),
            
      expiry: yup
            .string()
            .required("Password required!")
            .min(5, "Minimum of 5 characters"),
            
      cvv: yup
            .string()
            .required("Password required!")
            .min(5, "Minimum of 5 characters"),
            
});