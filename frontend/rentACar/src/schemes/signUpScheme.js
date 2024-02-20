import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getSignUpValidationSchema = () => {
      const { t } = useTranslation();
    
      return yup.object().shape({
        name: yup
        .string()
        .required(t("schemeName")),
        surname: yup
        .string()
        .required(t("schemeLastname")),
        birthDate: yup
        .date()
        .required(t("schemeBirthDate"))
        .max(
          new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000),
          t("schemeCheckBirthDate")
        ),
        email: yup
          .string()
          .email(t("schemeInvalidEmail"))
          .required(t("schemeEmail")),
        password: yup
          .string()
          .required(t("schemePassword"))
          .min(5, t("schemePasswordMin")),
        confirmPassword: yup
          .string()
          .required(t("schemeConfirmPassword"))
          .oneOf([yup.ref('password'), null], t("schemeConfirmPasswordMatch")),
      });
    };


    export default getSignUpValidationSchema;