import * as yup from "yup";
//const passwordRules = "/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,50}$/"

export const loginValidationSchema = yup.object().shape({
   
      email: yup
            .string()
            .email("Invalid E-mail format")
            .required("E-mail required!"),
      password: yup
            .string()
            .required("Password required!")
            .min(5, "Minimum of 5 characters"),
            //.matches(passwordRules, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
            
});