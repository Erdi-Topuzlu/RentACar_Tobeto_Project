import * as yup from "yup";
import { useTranslation } from "react-i18next";

const getUserDetailBookingFormSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    firstname: yup.string().required(t("schemeName")),
    lastname: yup.string().required(t("schemeLastname")),
    email: yup.string().email(t("schemeInvalidEmail")).required(t("schemeEmail")),
    phoneNumber: yup
      .string()
      .matches(/^\(\d{3}\) \d{3}-\d{2}-\d{2}$/, t("schemeInvalidPhoneNumber"))
      .required(t("schemePhoneNumber")),
    birthDate: yup
      .date()
      .required(t("schemeBirthDate"))
      .max(
        new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
        t("schemeCheckBirthDate")
      ),
    driverLicense: yup.string().required(t("schemeDriverLicense")),
    pickupDate: yup
      .date()
      .required(t("schemeStartDate"))
      .test("is-after-today", t("schemeInvalidStartDate"), (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        return selectedDate >= today;
      }),
    dropoffDate: yup
      .date()
      .min(yup.ref("pickupDate"), t("schemeInvalidEndDate"))
      .required(t("schemeEndDate")),
  });
};

export default getUserDetailBookingFormSchema;