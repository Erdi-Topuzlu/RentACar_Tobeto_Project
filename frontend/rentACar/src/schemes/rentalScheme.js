import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getRentalValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    startDate: yup
      .date()
      .required(t("schemeRentalStartDate")),
      endDate: yup
      .date()
      .required(t("schemeRentalEndDate")),
  });
};

export default getRentalValidationSchema;
