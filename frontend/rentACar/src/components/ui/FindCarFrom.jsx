import React, { useState } from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastWarning } from "../../service/ToastifyService";

const FindCarForm = () => {
  const { items, status, error } = useSelector((state) => state.carAllData);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate()

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel(""); 
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleFindCar = () => {
    if (!selectedBrand && !selectedModel) {
     toastWarning("Lütfen bir marka ve model seçiniz.");
      // Her iki input da seçilmişse yönlendirme yapılacak burada
    } else {
      localStorage.setItem("selectedBrand", selectedBrand);
      localStorage.setItem("selectedModel", selectedModel);
      navigate("/findCarResult");

    }
  }


  return (
    
    <Form className="form ">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        {/* Brand */}
        <FormGroup className="select__group">
          <select className="mt-4"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">{t("Brand")}</option>
            {items.map((car, i) => (
              <option key={i} value={car.modelId?.brandId?.name}>
                {car.modelId?.brandId?.name}
              </option>
            ))}
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
            <option value="">{t("Model")}</option>
            {/* Markaya göre filtreleme*/}
            {items
              .filter(car => car.modelId.brandId.name === selectedBrand)
              .map((car, index) => (
                <option key={index} value={car.modelId.name}>
                  {car.modelId.name}
                </option>
              ))}
          </select>
        </FormGroup>

        <FormGroup className="form__group  mt-4">
          <button className="btn find__car-btn" onClick={handleFindCar}>
            {t("findBtn")}
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
