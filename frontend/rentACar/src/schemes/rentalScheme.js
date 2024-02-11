import { useTranslation } from "react-i18next";
import * as yup from "yup";


export const getRentalValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    startDate: yup
      .date()
      .typeError(t("startDateMustBeDate")) // Eğer girilen değer bir tarih değilse hata mesajı
      .required(t("schemeRentalStartDate"))
      .nullable(), // null değerlerin kabul edilmesi için
    endDate: yup
      .date()
      .typeError(t("endDateMustBeDate")) // Eğer girilen değer bir tarih değilse hata mesajı
      .required(t("schemeRentalEndDate"))
      .nullable(), // null değerlerin kabul edilmesi için
    // returnDate: yup
    //   .date()
    //   .typeError(t("endDateMustBeDate")) // Eğer girilen değer bir tarih değilse hata mesajı
    //   .required(t("schemeRentalreturnDate"))
    //   .nullable(), // null değerlerin kabul edilmesi için
  });
};

export default getRentalValidationSchema;