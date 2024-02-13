import * as yup from "yup";



export const contactValidationScheme = yup.object().shape({

  name: yup.string().required("schemeName"),
  email: yup
    .string()
    .email("schemeInvalidEmail")
    .required("schemeEmail"),
    message: yup
    .string()
    .required("schemeMessage")
    .min(50, "schemeMessageMin")
    .max(450, "schemeMessageMax"),
});
