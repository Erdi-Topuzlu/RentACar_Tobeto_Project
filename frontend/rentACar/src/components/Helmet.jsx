import React from "react";
import { useTranslation } from "react-i18next";

const Helmet = (props) => {
  const { t } = useTranslation();
  document.title = t("pair1RentService") + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
