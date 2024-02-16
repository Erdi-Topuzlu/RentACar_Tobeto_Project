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
import { toastSuccess, toastWarning } from "../../../rentACar/src/service/ToastifyService";
import { useTranslation } from "react-i18next";
import axiosInstance from "../redux/utilities/interceptors/axiosInterceptors";


const ResetPassword = () => {
  const { t } = useTranslation();
    

  const initialValues = {
    newPassword: "",
    newConfirmPassword: "",
  };

  // Formik hook
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      const updatedData = {
        currentPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
        confirmPassword: formik.values.newConfirmPassword,
      };

      try {
        const response = await axiosInstance.patch(
          `api/v1/users/changePassword`,
          updatedData
        );
        if (response.status === 200) {
          toastSuccess(t("passwordUpdated"));
          formik.resetForm();
        }
        if(response.status === 403) {
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
            <Typography sx={{textAlign:"center"}} level="title-lg">{t("resetPassword")}</Typography>
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
                        formik.errors.newConfirmPassword && formik.touched.newConfirmPassword
                      }
                      size="sm"
                      placeholder={
                        formik.errors.newConfirmPassword && formik.touched.newConfirmPassword
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
