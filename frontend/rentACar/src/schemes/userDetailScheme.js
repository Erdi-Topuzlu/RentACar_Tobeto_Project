import * as yup from "yup";

export const userDetailBookingFormScheme = yup.object().shape({


  firstname: yup
  .string()
  .required("Name required!"),


  lastname: yup
  .string()
  .required("Lastname required!"),


  email: yup
    .string()
    .email("Invalid E-mail format")
    .required("E-mail required!"),


    phoneNumber: yup
    .string()
    .matches(/^\(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Invalid phone number format")
    .required("Phone number is required"),


  birthDate: yup
    .date()
    .required("Birthdate required!")
    .max(
      new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
      "You must be at least 18 years"
    ),


  driverLicense: yup
  .string()
  .required("Driver Licence required!"),



  pickupDate: yup
  .date()
  .required("Pick-up date required!")
  .test("is-after-today", "Invalid date, must be today or later", value => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const selectedDate = new Date(value);
    return selectedDate >= today;
  }),

  
  dropoffDate: yup
  .date()
  .min(yup.ref("pickupDate"), "Dropoff date must be after pickup date")
  .required("Dropoff date is required"),
});
