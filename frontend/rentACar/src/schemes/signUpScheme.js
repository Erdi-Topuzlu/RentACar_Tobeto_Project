import * as yup from "yup";
//const passwordRules = "/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,50}$/"

export const signUpValidationSchema = yup.object().shape({
      //fName: yup.string()
      //matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Please enter a valid name!")
      //.required("First name required!")
      //.max(50, "Maximum of 50 characters"),
      //lName: yup.string()
      //.required("Lastname required!")
      //.max(50, "Maximum of 50 characters"),
      //bDate: yup.date()
      //.required("Birthdate required!")
      //.max(new Date(Date.now() - 567648000000), "You must be at least 18 years"),
      email: yup
            .string()
            .email("Invalid E-mail format")
            .required("E-mail required!"),
      password: yup
            .string()
            .required("Password required!")
            .min(5, "Minimum of 5 characters"),
            //.matches(passwordRules, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
      confirmPassword: yup
            .string()
            .required("Password required!")
            .oneOf([yup.ref('password'), null], "Password don't match")
});