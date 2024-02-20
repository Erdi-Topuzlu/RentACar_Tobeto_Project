import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getUserProfileValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    firstName: yup.string().required(t("schemeName")),
    lastName: yup.string().required(t("schemeLastname")),
    tcNo: yup
      .string()
      .min(11, t("schemeMin11Char"))
      .max(11, t("schemeMax11Char"))
      .required(t("schemeIdentifyNumber")),
    
  });
};

export default getUserProfileValidationSchema;
