import { useFormik } from "formik";
import { userDetailBookingFormScheme } from "../../../../schemes/userDetailBookingFormScheme";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
      pickupAdress: storedUserData.pickupAdress || "",
      dropoffAdress: storedUserData.dropoffAdress || "",
      pickupDate: storedUserData.pickupDate || "",
      dropoffDate: storedUserData.dropoffDate || "",
    },

    validationSchema: userDetailBookingFormScheme,
    onSubmit: (values, actions) => {
      const data = JSON.stringify(values);
      localStorage.setItem("userData", data);
      setActiveStep(activeStep + 1);
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
            placeholder={t("fName")}
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
            placeholder={t("lName")}
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
            placeholder="E-mail"
            invalid={formik.errors.email && formik.touched.email}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            className={
              formik.errors.phoneNumber && formik.touched.phoneNumber && "error"
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder={t("phoneNumber")}
            invalid={formik.errors.phoneNumber && formik.touched.phoneNumber}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input
            id="pickupAdress"
            name="pickupAdress"
            value={formik.values.pickupAdress}
            className={
              formik.errors.pickupAdress &&
              formik.touched.pickupAdress &&
              "error"
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder={t("pickupAddress")}
            invalid={formik.errors.pickupAdress && formik.touched.pickupAdress}
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input
            id="dropoffAdress"
            name="dropoffAdress"
            value={formik.values.dropoffAdress}
            className={
              formik.errors.dropoffAdress &&
              formik.touched.dropoffAdress &&
              "error"
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder={t("dropoffAddress")}
            invalid={
              formik.errors.dropoffAdress && formik.touched.dropoffAdress
            }
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <Input
            id="pickupDate"
            name="pickupDate"
            placeholder={t("startDate")}
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
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <Input
            id="dropoffDate"
            name="dropoffDate"
            placeholder={t("endDate")}
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
