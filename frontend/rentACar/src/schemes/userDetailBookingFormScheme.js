import * as yup from "yup";

export const userDetailBookingFormScheme = yup.object().shape({
  firstname: yup.string().required("Name required!"),
  lastname: yup.string().required("Lastname required!"),
  email: yup
    .string()
    .email("Invalid E-mail format")
    .required("E-mail required!"),
  phoneNumber: yup.string().required("Phone number required!"),
  birthDate: yup
    .date()
    .required("Birthdate required!")
    .max(
      new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
      "You must be at least 18 years"
    ),
  driverLicense: yup.string().required("Driver Licence required!"),
  pickupDate: yup.date().required("Pick-up date required!"),
  dropoffDate: yup.date().required("Drop-off date required!"),
});
