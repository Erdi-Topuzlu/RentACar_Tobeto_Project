import React, { useState } from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";

const FindCarForm = () => {
  const { t } = useTranslation();
  const [dateInputType, setDateInputType] = useState("text");

  const activateDateInput = () => {
    setDateInputType("date");
  };

  const deactivateDateInput = () => {
    setDateInputType("text");
  };
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="From address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup>

        <FormGroup className="form__group">
          {/* <input type="date" placeholder="Journey date" required /> */}
          <input
            className="form-control"
            type={dateInputType}
            placeholder="Nursel was here"
            id="date"
            onFocus={activateDateInput}
            onBlur={deactivateDateInput}
            pattern="\d{2}\d{2}\d{4}"
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            placeholder="Journey time"
            required
          />
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="ac">AC Car</option>
            <option value="non-ac">Non AC Car</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">{t("findBtn")}</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
