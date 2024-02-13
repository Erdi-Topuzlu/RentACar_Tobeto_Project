import * as yup from "yup";

export const creditCardScheme = yup.object().shape({

  number: yup.number().required("schemeCardNumber"),
  name: yup.string().required("schemeCardName"),
  expiry: yup.string().required("schemeExpiry"),
  cvc: yup.string().required("schemeCvv"),
});
