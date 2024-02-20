import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getBrandValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    brandName: yup
      .string()
      .required(t("schemeBrandName")),
  });
};

export default getBrandValidationSchema;
