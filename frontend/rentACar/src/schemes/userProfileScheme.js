import * as yup from "yup";

export const userProfileScheme = yup.object().shape({
  firstName: yup.string().required("Name required!"),
  
});
