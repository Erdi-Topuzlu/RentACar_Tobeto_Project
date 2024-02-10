import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getModelValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    modelName: yup
      .string()
      .required(t("schemeModelName")),
   
  });
};

export default getModelValidationSchema;
