import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getSliderValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    sliderTitle: yup.string().required(t("schemeSliderTitle")),

    sliderDesc: yup.string().required(t("schemeSliderDesc")),
  });
};

export default getSliderValidationSchema;
