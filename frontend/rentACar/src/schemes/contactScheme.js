import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getContactValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    name: yup.string().required(t("schemeName")),
    email: yup.string().email(t("schemeInvalidEmail")).required(t("schemeEmail")),
    messages: yup
      .string()
      .required(t("schemeMessage"))
      .max(450, t("schemeMessageMax")),
  });
};

export default getContactValidationSchema;
