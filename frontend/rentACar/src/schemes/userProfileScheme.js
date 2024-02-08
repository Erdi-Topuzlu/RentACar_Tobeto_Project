import * as yup from "yup";

export const userProfileScheme = yup.object().shape({


  firstName: yup.string()
  .required("Name required!"),

  lastName: yup.string()
  .required("Lastname required!"),

  tcNo: yup.string()
  .required("Tc No required!"),

  username: yup.string()
  .required("Username required!"),

  birthdate: yup.date()
  .required("Birthdate required!"),
      
});
