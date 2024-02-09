import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getRentalValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    brandName: yup
      .string()
      .required(t("schemeRentalName")),
  });
};

export default getRentalValidationSchema;
