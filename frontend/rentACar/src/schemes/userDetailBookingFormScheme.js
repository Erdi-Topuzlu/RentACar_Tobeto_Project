import * as yup from "yup";

export const userDetailBookingFormScheme = yup.object().shape({
  firstname: yup.string().required("Name required!"),
  lastname: yup.string().required("Lastname required!"),
  email: yup
    .string()
    .email("Invalid E-mail format")
    .required("E-mail required!"),
    phoneNumber: yup
    .string()
    .required("Phone number required!"),
    birthDate: yup
    .string().required("Birthdate required!"),
    driverLicense: yup
    .string().required("Driver Licence required!")
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years"),
    pickupDate: yup
    .date().required("Pick-up date required!"),
    dropoffDate: yup
    .date().required("Drop-off date required!")
});
