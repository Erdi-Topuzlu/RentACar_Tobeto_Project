import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastWarning } from "../../service/ToastifyService";

const FindCarForm = () => {
  const { items } = useSelector((state) => state.carAllData);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectBrands = []; 
  const selectModels = []; 

  const handleBrandChange = (event) => {
    const brandName = event.target.value;
    setSelectedBrand(brandName);
    setSelectedModel("");
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleFindCar = () => {
    if (!selectedBrand && !selectedModel) {
      toastWarning(t("selectBrandAndModel"));
    } else {
      localStorage.setItem("selectedBrand", selectedBrand);
      localStorage.setItem("selectedModel", selectedModel);
      navigate("/findCarResult");
    }
  };

  return (
    <Form className="form">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        {/* Brand */}
        <FormGroup className="select__group">
          <select
            className="mt-4"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">{t("brands")}</option>
            {items.map((car, i) => {
              const brandName = car.modelId?.brandId?.name;
              if (!selectBrands.includes(brandName)) {
                selectBrands.push(brandName);
                return (
                  <option key={i} value={brandName}>
                    {brandName}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </FormGroup>
        

        {/* Model */}
        <FormGroup className="select__group">
          <select
            className="mt-4"
            value={selectedModel}
            onChange={handleModelChange}
            disabled={!selectedBrand}
          >
            <option value="">{t("models")}</option>
            {items
              .filter((car) => car.modelId.brandId.name === selectedBrand)
              .map((car, index) => {
                const modelName = car.modelId.name;
                if (!selectModels.includes(modelName)) {
                  selectModels.push(modelName);
                  return (
                    <option key={index} value={modelName}>
                      {modelName}
                    </option>
                  );
                }
                return null;
              })}
          </select>
        </FormGroup>

        <FormGroup className="form__group mt-4">
          <button className="btn find__car-btn" onClick={handleFindCar}>
            {t("findBtn")}
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
