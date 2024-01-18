import { useTranslation } from "react-i18next";
const ServiceData = () => {
const { t } = useTranslation();
const serviceData = [
  {
    id: 1,
    title: t('cityTransfer'),
    icon: "ri-map-pin-2-line",
    desc: t('cityDesc'),
  },

  {
    id: 2,
    title: t('cityTour'),
    icon: "ri-community-line",
    desc: t('cityTourDesc'),
  },

  {
    id: 3,
    title: t('unlimited'),
    icon: "ri-roadster-line",
    desc: t('unlimitedDesc'),
  },

  {
    id: 4,
    title:  t('fastAndEasy'),
    icon: "ri-timer-flash-line",
    desc:  t('fastAndEasyDesc'),
  },

  {
    id: 5,
    title: t('pickup'),
    icon: "ri-map-pin-line",
    desc: t('pickupDesc'),
  },

  {
    id: 6,
    title:  t('airport'),
    icon: "ri-flight-takeoff-line",
    desc:  t('airportDesc'),
  },
];

return serviceData;
}

export default ServiceData;