import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getPaymentDetailScheme = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    number: yup
      .string()
      .required(t("schemeCardNumber"))
      .min(19, t("schemeInvalidCardNumber")),
    name: yup.string().required(t("schemeName")),
    expiry: yup.string().required(t("schemeExpiry")),
    cvc: yup.string().required(t("schemeCvv")),
  });
};

export default getPaymentDetailScheme;