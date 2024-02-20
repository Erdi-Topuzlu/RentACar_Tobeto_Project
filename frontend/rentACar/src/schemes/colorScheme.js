import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getColorValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    colorName: yup
      .string()
      .required(t("schemeColorName")),
  });
};

export default getColorValidationSchema;
