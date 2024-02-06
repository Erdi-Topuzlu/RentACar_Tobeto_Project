import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getChangePasswordValidationSchema = () => {
      const { t } = useTranslation();
    
      return yup.object().shape({
        oldPassword: yup
        .string()
        .required(t("schemePassword"))
        .min(5, t("schemePasswordMin")),
        newPassword: yup
          .string()
          .required(t("schemePassword"))
          .min(5, t("schemePasswordMin")),
        newConfirmPassword: yup
          .string()
          .required(t("schemeConfirmPassword"))
          .oneOf([yup.ref('newPassword'), null], t("schemeConfirmPasswordMatch")),
      });
    };


    export default getChangePasswordValidationSchema;