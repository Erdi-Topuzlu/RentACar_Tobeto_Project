import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import { useFormik } from "formik";
import { Form } from "reactstrap";
import {
  toastSuccess,
  toastWarning,
} from "../../../rentACar/src/service/ToastifyService";
import { useTranslation } from "react-i18next";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the component was accessed via the email link
    const token = new URLSearchParams(location.search).get('token');

    if (!token) {
      // Redirect to the login page or another route if token is not present
      navigate('/login');
    } else {
      // Handle the case when accessed via the email link with the token
      // You can perform additional logic such as updating state, etc.
      console.log('Component accessed via email link with token:', token);
    }
  }, [navigate, location]);

  const initialValues = {
    email:"",
    newPassword: "",
    newConfirmPassword: "",
  };

  // Formik hook
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      const updatedData = {
        email: formik.values.email,
        newPassword: formik.values.newPassword,
        newConfirmPassword: formik.values.newConfirmPassword,
      };

      try {
        const response = await axiosInstance.patch(
          `api/v1/auth/reset-password`,
          updatedData
        );
        if (response.status === 200) {
          toastSuccess(t("passwordUpdated"));
          navigate("/login");
          formik.resetForm();
        }
        if (response.status === 403) {
          toastWarning(t("correctPassword"));
          formik.resetForm();
        }
      } catch (error) {
        console.error(t("updateError"), error.response.data);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        {/* WEB FORM */}
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography sx={{ textAlign: "center" }} level="title-lg">
              {t("resetPassword")}
            </Typography>
            <Typography level="body-sm">{t("changePasswordDesc")}</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl sx={{ display: "flex-column", gap: 1 }}>
                    <Input
                      name="email"
                      className={
                        formik.errors.email &&
                        formik.touched.email &&
                        "error"
                      }
                      type="text"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.newPassword && formik.touched.newPassword
                      }
                      size="sm"
                      placeholder={
                        formik.errors.email && formik.touched.email
                          ? formik.errors.email
                          : t("email")
                      }
                    />
                  </FormControl>

                  <FormLabel>{t("newPassword")}</FormLabel>
                  <FormControl sx={{ display: "flex-column", gap: 1 }}>
                    <Input
                      name="newPassword"
                      className={
                        formik.errors.newPassword &&
                        formik.touched.newPassword &&
                        "error"
                      }
                      type="password"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.newPassword && formik.touched.newPassword
                      }
                      size="sm"
                      placeholder={
                        formik.errors.newPassword && formik.touched.newPassword
                          ? formik.errors.newPassword
                          : t("newPassword")
                      }
                    />
                  </FormControl>
                  <FormLabel>{t("newConfirmPassword")}</FormLabel>
                  <FormControl sx={{ display: "flex-column", gap: 1 }}>
                    <Input
                      name="newConfirmPassword"
                      className={
                        formik.errors.newConfirmPassword &&
                        formik.touched.newConfirmPassword &&
                        "error"
                      }
                      type="password"
                      value={formik.values.newConfirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.newConfirmPassword &&
                        formik.touched.newConfirmPassword
                      }
                      size="sm"
                      placeholder={
                        formik.errors.newConfirmPassword &&
                        formik.touched.newConfirmPassword
                          ? formik.errors.newConfirmPassword
                          : t("newConfirmPassword")
                      }
                    />
                  </FormControl>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

          {/* MOBILE FORM */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>{t("fName")}</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <FormControl sx={{ display: "flex-column", gap: 2 }}>
                    <Input
                      name="firstName"
                      className={
                        formik.errors.firstName &&
                        formik.touched.firstName &&
                        "error"
                      }
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.firstName && formik.touched.firstName
                      }
                      size="sm"
                      placeholder={
                        formik.errors.firstName && formik.touched.firstName
                          ? formik.errors.firstName
                          : t("fName")
                      }
                    />
                  </FormControl>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>

          {/* BUTTONS */}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                {t("cancel")}
              </Button>
              <Button
                onClick={formik.handleSubmit}
                style={{ backgroundColor: "#673ab7", color: "white" }}
                size="sm"
                variant="solid"
              >
                {t("save")}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Form>
  );
};

export default ResetPassword;
