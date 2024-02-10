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
      .required(t("schemeIdentifyNumber")),
    usernames: yup
      .string()
      .required(t("schemeUserName"))
      .min(5, t("schemeMin5Char")),
  });
};

export default getUserProfileValidationSchema;
