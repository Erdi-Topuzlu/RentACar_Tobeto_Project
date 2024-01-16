import * as yup from "yup";

export const contactValidationScheme = yup.object().shape({
  name: yup.string().required("Name required!"),
  email: yup
    .string()
    .email("Invalid E-mail format")
    .required("E-mail required!"),
    message: yup
    .string()
    .required("Message required!")
    .min(50, "Your message must have a minimum of 50 characters !")
    .max(450, "Your message must have a maximum of 450 characters !"),
});
