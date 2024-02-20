import { useTranslation } from "react-i18next";
import * as yup from "yup";


export const getRentalValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    startDate: yup
    .date()
    .required(t("schemeStartDate"))
    .test("is-after-today", t("schemeInvalidStartDate"), (value) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      return selectedDate >= today;
    }),

    endDate: yup
    .date()
    .min(yup.ref("startDate"), t("schemeInvalidEndDate"))
    .required(t("schemeEndDate")),

    // returnDate: yup

    // .date()
    // .min(yup.ref("startDate"), t("schemeInvalidEndDate"))

    })
};

export default getRentalValidationSchema;