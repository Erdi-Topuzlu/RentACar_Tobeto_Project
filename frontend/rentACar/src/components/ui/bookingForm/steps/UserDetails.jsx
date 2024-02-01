import { useFormik } from "formik";
import { userDetailBookingFormScheme } from "../../../../schemes/userDetailBookingFormScheme";
import { Button, Form, FormFeedback, FormGroup, Input } from "reactstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InputMask from 'react-input-mask';

export function UserDetails({ steps, activeStep, setActiveStep }) {
  const [dateInputType, setDateInputType] = useState("text");
  const { t } = useTranslation();
  const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};

  const activateDateInput = () => {
    setDateInputType("date");
  };

  const deactivateDateInput = () => {
    setDateInputType("text");
  };

  const licenseTypes = [
    "A - Motorcycle License",
    "B - Car License",
    "C - Truck License",
    "D - Bus License",
    "E - Trailer License",
    "F - Tractor License",
    "G - Temporary Driver's License",
    // Diğer ehliyet türleri eklenmeli
  ];

  useEffect(() => {
    // Sayfa yenilendiğinde localStorage'ı temizle
    const handleBeforeUnload = () => {
      localStorage.removeItem("userData");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // useEffect'in temizlik fonksiyonu
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      firstname: storedUserData.firstname || "",
      lastname: storedUserData.lastname || "",
      email: storedUserData.email || "",
      phoneNumber: storedUserData.phoneNumber || "",
      birthDate: storedUserData.birthDate || "",
      driverLicense: storedUserData.driverLicense || "",
      pickupDate: storedUserData.pickupDate || "",
      dropoffDate: storedUserData.dropoffDate || "",
    },

    validationSchema: userDetailBookingFormScheme,
    onSubmit: (values, actions) => {
      const data = JSON.stringify(values);
      localStorage.setItem("userData", data);
      setActiveStep(activeStep + 1);
      console.log(data);
    },
  });

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input
            id="firstname"
            name="firstname"
            value={formik.values.firstname}
            className={
              formik.errors.firstname && formik.touched.firstname && "error"
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={formik.errors.firstname && formik.touched.firstname}
            type="text"
            placeholder={
              formik.errors.firstname && formik.touched.firstname
                ? formik.errors.firstname
                : t("fName")
            }
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input
            id="lastname"
            name="lastname"
            value={formik.values.lastname}
            className={
              formik.errors.lastname && formik.touched.lastname && "error"
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={formik.errors.lastname && formik.touched.lastname}
            type="text"
            placeholder={
              formik.errors.lastname && formik.touched.lastname
                ? formik.errors.lastname
                : t("lName")
            }
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input
            id="email"
            name="email"
            value={formik.values.email}
            className={formik.errors.email && formik.touched.email && "error"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            invalid={formik.errors.email && formik.touched.email}
            placeholder={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : t("Email")
            }
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <InputMask
          mask="(999) 999-99-99"
          className={`form-control ${
            formik.touched.phoneNumber
              ? "is-invalid"
              : ""
          }`}
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formik.values.phoneNumber}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          placeholder={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? formik.errors.phoneNumber
              : t("phoneNumber")}
        />
        
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input
            id="birthDate"
            name="birthDate"
            value={formik.values.birthDate}
            className={
              formik.errors.birthDate && formik.touched.birthDate && "error"
            }
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              deactivateDateInput();
            }}
            onFocus={activateDateInput}
            type={dateInputType}
            invalid={formik.errors.birthDate && formik.touched.birthDate}
            placeholder={
              formik.errors.birthDate && formik.touched.birthDate
                ? formik.errors.birthDate
                : t("birthDate")
            }
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="select"
          id="driverLicense"
          name="driverLicense"
          value={formik.values.driverLicense}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          invalid={
            formik.errors.driverLicense && formik.touched.driverLicense
          }
        >
          <option value="" label="Select a license type" />
          {licenseTypes.map((type, index) => (
            <option key={index} value={type} label={type} />
          ))}
        </Input>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input
            id="pickupDate"
            name="pickupDate"
            value={formik.values.pickupDate}
            className={
              formik.errors.pickupDate &&
              formik.touched.pickupDate &&
              "error form-control"
            }
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              deactivateDateInput();
            }}
            onFocus={activateDateInput}
            type={dateInputType}
            invalid={formik.errors.pickupDate && formik.touched.pickupDate}
            placeholder={
              formik.errors.startDate && formik.touched.startDate
                ? formik.errors.startDate
                : t("startDate")
            }
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input
            id="dropoffDate"
            name="dropoffDate"
            value={formik.values.dropoffDate}
            className={
              formik.errors.dropoffDate && formik.touched.dropoffDate && "error"
            }
            onChange={formik.handleChange}
            onBlur={(e) => {
              formik.handleBlur(e);
              deactivateDateInput();
            }}
            onFocus={activateDateInput}
            type={dateInputType}
            invalid={formik.errors.dropoffDate && formik.touched.dropoffDate}
            placeholder={
              formik.errors.endDate && formik.touched.endDate
                ? formik.errors.endDate
                : t("endDate")
            }
          />
        </FormGroup>

        <FormGroup>
          <div className="d-flex align-items-center justify-content-between">
            {activeStep !== steps.length - 1 && (
              <Button
                disabled={activeStep === 0}
                color="secondary"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                {t("previous")}
              </Button>
            )}
            {
              <div className="d-flex justify-content-end">
                {activeStep !== steps.length - 1 && (
                  <Button
                    type="submit"
                    className="form__btn"
                    onSubmit={() => setActiveStep(activeStep + 1)}
                  >
                    {t("next")}
                  </Button>
                )}
              </div>
            }
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}
