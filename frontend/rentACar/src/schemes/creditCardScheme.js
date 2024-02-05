import * as yup from "yup";

export const creditCardScheme = yup.object().shape({
  number: yup.number().required("Credit Card Number is required!"),
  name: yup.string().required("Card Name is required!"),
  expiry: yup.string().required("Expiry is required!"),
  cvc: yup.string().required("CVC is required!"),
});
