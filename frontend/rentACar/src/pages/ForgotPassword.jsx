import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import Helmet from "../components/Helmet";
import "../styles/form.css";
import { useFormik } from "formik";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";
import { toastSuccess } from "../service/ToastifyService";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (values, actions) => {
      const data = {
        email: values.email,
      };
      try {
        const response = await axiosInstance.post(
          "api/v1/auth/forgot-password",
          data
        );
        toastSuccess(t("resetAndCheckMail")
        );
      } catch (error) {
        console.error(error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Helmet title={t("reset")}>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center p-4">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="48.000000pt"
                height="48.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M2215 5105 c-285 -42 -567 -201 -745 -420 -105 -130 -160 -228 -209
-373 -55 -163 -61 -234 -61 -673 l0 -397 -187 -5 c-241 -6 -342 -32 -485 -126
-175 -114 -296 -286 -350 -496 -19 -73 -19 -1917 0 -1990 54 -210 175 -382
350 -496 72 -47 133 -74 242 -107 50 -15 177 -17 1386 -20 l1331 -2 54 28 c43
22 59 38 81 81 36 68 36 114 0 182 -22 43 -38 59 -81 81 l-53 28 -1279 0
c-908 0 -1293 3 -1331 11 -149 32 -264 143 -304 294 -20 73 -20 1757 0 1830
40 151 155 262 304 294 77 16 2964 16 3077 -1 79 -11 84 -11 130 13 27 13 63
41 79 62 58 72 45 198 -26 264 -55 52 -169 73 -394 73 l-144 0 0 370 c0 403
-8 517 -46 649 -166 572 -738 934 -1339 846z m380 -408 c291 -81 498 -282 581
-562 15 -52 18 -117 21 -477 l4 -418 -801 0 -801 0 3 423 c4 476 3 471 91 642
60 118 199 254 322 317 90 46 165 72 253 88 65 12 266 4 327 -13z"
                  />
                  <path
                    d="M4150 2503 c-340 -52 -601 -344 -604 -674 -1 -87 1 -99 26 -136 41
-62 90 -88 168 -88 119 0 183 63 200 199 12 96 39 159 92 213 60 61 126 87
218 87 127 0 230 -65 282 -179 34 -75 32 -192 -4 -260 -35 -67 -87 -113 -183
-166 -207 -112 -295 -277 -295 -554 0 -120 2 -135 25 -182 38 -75 91 -108 176
-108 54 0 72 4 106 27 74 49 87 83 93 245 6 172 9 176 136 248 358 202 478
640 272 988 -72 123 -206 239 -336 292 -109 44 -267 65 -372 48z"
                  />
                  <path
                    d="M1217 1850 c-46 -14 -93 -56 -116 -103 -61 -125 21 -270 160 -283 46
-5 62 -2 109 23 44 23 60 39 82 82 16 31 28 69 28 91 0 22 -12 60 -28 91 -44
85 -143 127 -235 99z"
                  />
                  <path
                    d="M1967 1850 c-46 -14 -93 -56 -116 -103 -61 -125 21 -270 160 -283 46
-5 62 -2 109 23 44 23 60 39 82 82 16 31 28 69 28 91 0 22 -12 60 -28 91 -44
85 -143 127 -235 99z"
                  />
                  <path
                    d="M2717 1850 c-46 -14 -93 -56 -116 -103 -61 -125 21 -270 160 -283 46
-5 62 -2 109 23 44 23 60 39 82 82 16 31 28 69 28 91 0 22 -12 60 -28 91 -44
85 -143 127 -235 99z"
                  />
                  <path
                    d="M4187 390 c-46 -14 -93 -56 -116 -103 -61 -125 21 -270 160 -283 46
-5 62 -2 109 23 44 23 60 39 82 82 16 31 28 69 28 91 0 22 -12 60 -28 91 -44
85 -143 127 -235 99z"
                  />
                </g>
              </svg>
              <h2 className="section__title mt-2 ">{t("reset")}</h2>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <Col lg="4" className="mb-5 text-center">
                  <Form onSubmit={formik.handleSubmit}>
                    <div>
                      <FormGroup className="">
                        <Input
                          id="email"
                          name="email"
                          value={formik.values.email}
                          className={
                            formik.errors.email &&
                            formik.touched.email &&
                            "error"
                          }
                          onChange={(e) => {
                            formik.handleChange(e);
                          }}
                          onBlur={formik.handleBlur}
                          type="text"
                          placeholder={
                            formik.errors.email && formik.touched.email
                              ? formik.errors.email
                              : t("email")
                          }
                          invalid={formik.errors.email && formik.touched.email}
                        />
                      </FormGroup>
                    </div>
                    <Button
                      disabled={formik.isSubmitting}
                      className=" form__btn mt-2"
                      type="submit"
                    >
                      {t("submit")}
                    </Button>
                  </Form>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ForgotPassword;
