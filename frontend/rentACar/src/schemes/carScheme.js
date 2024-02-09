import * as yup from "yup";
import { useTranslation } from "react-i18next";

export const getCarValidationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    kilometer: yup
      .number()
      .required(t("schemeCarKilometer")),
      plate: yup
      .string()
      .required(t("schemeCarPlate")),
      year: yup
      .number()
      .required(t("schemeCarYear")),
      dailyPrice: yup
      .number()
      .required(t("schemeCarDailyPrice")),
      fuelType: yup
      .string()
      .required(t("schemeCarFuelType")),
      gearType: yup
      .string()
      .required(t("schemeCarGearType")),
      vehicleType: yup
      .string()
      .required(t("schemeCarVehicleType")),
      seatType: yup
      .string()
      .required(t("schemeCarSeatType")),
  });
};

export default getCarValidationSchema;
