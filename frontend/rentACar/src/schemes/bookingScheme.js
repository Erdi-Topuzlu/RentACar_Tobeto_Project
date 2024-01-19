import * as yup from "yup";

export const bookingValidationScheme = yup.object().shape({
  firstname: yup.string().required("Name required!"),
  lastname: yup.string().required("lastname required!"),
  email: yup
    .string()
    .email("Invalid E-mail format")
    .required("E-mail required!"),
    phoneNumber: yup
    .string()
    .required("Phone number required!")
    .max(10, "Your number must have a maximum of 10 characters !"),
    pickupAdress: yup
    .string().required("Pick-up adress required!"),
    dropoffAdress: yup
    .string().required("Drop-off adress required!"),
    pickupDate: yup
    .date().required("Pick-up date required!"),
    dropoffDate: yup
    .date().required("Drop-off date required!")
});
