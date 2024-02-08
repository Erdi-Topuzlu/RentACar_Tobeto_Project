import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { userProfileScheme } from "../../schemes/userProfileScheme";
import axiosInstance from "../../redux/utilities/interceptors/axiosInterceptors";
import { toastSuccess } from "../../service/ToastifyService";
import { useTranslation } from "react-i18next";
import { Form } from "reactstrap";

const Settings = () => {
    
  const { details, status, error } = useSelector((state) => state.userDetail);
    const { t } = useTranslation();
    const id = details.id;
    const dispatch = useDispatch();
    
  const [selectedImage, setSelectedImage] = useState(null);

  const [dateInputType, setDateInputType] = useState("text");

  const activateDateInput = () => {
    setDateInputType("date");
  };

  const deactivateDateInput = () => {
    setDateInputType("text");
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    tcNo: "",
    username: "",
    image: "",
    birthdate: "",
  };

  // Formik hook
  const formik = useFormik({
    initialValues,
    validationSchema: userProfileScheme,
    onSubmit: async (values, actions) => {
      const updatedData = {
        id: id,
        name: values.firstName || details.name,
        surname: values.lastName || details.surname,
        email: details.email,
        password: details.password,
        tcNo: values.tcNo || details.tcNo,
        username: values.username || details.username,
        birthDate: values.birthdate || details.birthDate,
        userPhotoUrl: selectedImage || details.userPhotoUrl,
      };

      try {
        const response = await axiosInstance.patch(
          `api/v1/users/${id}`,
          updatedData
        );
        if (response.status === 200) {
          toastSuccess("Kayıt İşlemi Başarılı.");
        }
      } catch (error) {
        console.error("Güncelleme hatası hatası:", error.response.data);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        setSelectedImage(e.target.result);

        try {
          const response = await axiosInstance.put(
            "/api/v1/userImage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            const updatedImageUrl = response.data;
            setSelectedImage(updatedImageUrl);
            console.log(updatedImageUrl); // "https://example.com/profile_photo.jpg"
          } else {
            // Hata oluştuğunda yapılacak işlemleri burada belirtebilirsiniz
          }
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsDataURL(file);
      toastSuccess("Uploaded Photo");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
                      <Typography level="title-md">
                        {t("personalInfo")}
                      </Typography>
                      <Typography level="body-sm">
                        {t("personalInfoDesc")}
                      </Typography>
                    </Box>
                    <Divider />
                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
                    >
                      <Stack direction="column" spacing={1}>
                        <AspectRatio
                          ratio="1"
                          maxHeight={108}
                          sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                        >
                          <img
                            src={
                              selectedImage ||
                              details.userPhotoUrl ||
                              "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                            }
                            srcSet={details.userPhotoUrl || selectedImage}
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleImageChange}
                        />
                        <IconButton
                          aria-label="upload new picture"
                          size="sm"
                          variant="outlined"
                          color="neutral"
                          sx={{
                            bgcolor: "background.body",
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            left: 85,
                            top: 180,
                            boxShadow: "sm",
                          }}
                        >
                          <label htmlFor="image-upload">
                            <EditRoundedIcon />
                          </label>
                        </IconButton>
                      </Stack>
                      <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Stack spacing={1}>
                          <FormLabel>{t("name")}</FormLabel>
                          <FormControl
                            sx={{
                              display: { sm: "flex-column", md: "flex-row" },
                              gap: 2,
                            }}
                          >
                            <FormControl
                              sx={{ display: "flex-column", gap: 1 }}
                            >
                              <Input
                                name="firstName"
                                className={
                                  formik.errors.firstName && formik.touched.firstName && "error"
                                }
                                value={values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.firstName && formik.touched.firstName}
                                size="sm"
                                placeholder={
                                  formik.errors.firstName && formik.touched.firstName
                                    ? formik.errors.firstName
                                    : t("fName")
                                }
                              />
                            </FormControl>

                            <FormControl
                              sx={{ display: "flex-column", gap: 1 }}
                            >
                              <FormLabel>{t("lName")}</FormLabel>
                              <Input
                                name="lastName"
                                className={
                                  formik.errors.lastName && formik.touched.lastName && "error"
                                }
                                value={values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.lastName && formik.touched.lastName}
                                size="sm"
                                placeholder={
                                  formik.errors.lastName && formik.touched.lastName
                                    ? formik.errors.lastName
                                    : t("lName")
                                }
                              />
                            </FormControl>

                            
                            <FormControl
                              sx={{ display: "flex-column", gap: 1 }}
                            >
                              <FormLabel>{t("TC No")}</FormLabel>
                              <Input
                                name="tcNo"
                                className={
                                  formik.errors.tcNo && formik.touched.tcNo && "error"
                                }
                                value={values.tcNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.tcNo && formik.touched.tcNo}
                                size="sm"
                                placeholder={
                                  formik.errors.tcNo && formik.touched.tcNo
                                    ? formik.errors.tcNo
                                    : t("tcNo")
                                }
                              />
                            </FormControl>

                            <FormControl
                              sx={{ display: "flex-column", gap: 1 }}
                            >
                              <FormLabel>{t("Username")}</FormLabel>
                              <Input
                                name="username"
                                className={
                                  formik.errors.username && formik.touched.username && "error"
                                }
                                value={values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.username && formik.touched.username}
                                size="sm"
                                placeholder={
                                  formik.errors.username && formik.touched.username
                                    ? formik.errors.username
                                    : t("Username")
                                }
                              />
                            </FormControl>

                           
                            <FormControl>
                              <FormLabel>{t("birthDate")}</FormLabel>
                              <Input
                                name="birthdate"
                                type={dateInputType}
                                className={
                                  formik.errors.birthdate && formik.touched.birthdate && "error"
                                }
                                value={values.birthdate}
                                onFocus={activateDateInput}
                                onBlur={(e) => {
                                  formik.handleBlur(e);
                                  deactivateDateInput();
                                }}
                                onChange={formik.handleChange}
                                error={formik.errors.birthdate && formik.touched.birthdate}
                                size="sm"
                                placeholder={
                                  formik.errors.birthdate && formik.touched.birthdate
                                    ? formik.errors.birthdate
                                    : t("birthDate")
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
                        <Stack direction="column" spacing={1}>
                          <AspectRatio
                            ratio="1"
                            maxHeight={108}
                            sx={{
                              flex: 1,
                              minWidth: 108,
                              borderRadius: "100%",
                            }}
                          >
                            <img
                              src={
                                selectedImage ||
                                details.userPhotoUrl ||
                                "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                              }
                              srcSet={details.userPhotoUrl || selectedImage}
                              loading="lazy"
                              alt=""
                            />
                          </AspectRatio>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                          />
                          <IconButton
                            aria-label="upload new picture"
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            sx={{
                              bgcolor: "background.body",
                              position: "absolute",
                              zIndex: 2,
                              borderRadius: "50%",
                              left: 85,
                              top: 180,
                              boxShadow: "sm",
                            }}
                          >
                            <label htmlFor="image-upload">
                              <EditRoundedIcon />
                            </label>
                          </IconButton>
                        </Stack>
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
                            <FormControl
                              sx={{ display: "flex-column", gap: 2 }}
                            >
                              <Input
                                name="firstName"
                                className={
                                  formik.errors.firstName && formik.touched.firstName && "error"
                                }
                                value={values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.firstName && formik.touched.firstName}
                                size="sm"
                                placeholder={
                                  formik.errors.firstName && formik.touched.firstName
                                    ? formik.errors.firstName
                                    : t("fName")
                                }
                              />
                            </FormControl>
                      

                            <FormControl
                              sx={{ display: "flex-column", gap: 1 }}
                            >
                              <FormLabel>{t("lName")}</FormLabel>
                              <Input
                                name="lastName"
                                className={
                                  formik.errors.lastName && formik.touched.lastName && "error"
                                }
                                value={values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.lastName && formik.touched.lastName}
                                size="sm"
                                placeholder={
                                  formik.errors.lastName && formik.touched.lastName
                                    ? formik.errors.lastName
                                    : t("lName")
                                }
                              />
                            </FormControl>

                            <FormControl>
                              <FormLabel>{t("birthDate")}</FormLabel>
                              <Input
                                name="birthdate"
                                type={dateInputType}
                                className={
                                  formik.errors.birthdate && formik.touched.birthdate && "error"
                                }
                                value={values.birthdate}
                                onFocus={activateDateInput}
                                onBlur={(e) => {
                                  formik.handleBlur(e);
                                  deactivateDateInput();
                                }}
                                onChange={formik.handleChange}
                                error={formik.errors.birthdate && formik.touched.birthdate}
                                size="sm"
                                placeholder={
                                  formik.errors.birthdate && formik.touched.birthdate
                                    ? formik.errors.birthdate
                                    : t("birthDate")
                                }
                              />
                            </FormControl>
                            
                          </FormControl>
                        </Stack>
                      </Stack>
                    </Stack>

                    {/* BUTTONS */}
                    <CardOverflow
                      sx={{ borderTop: "1px solid", borderColor: "divider" }}
                    >
                      <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                        <Button size="sm" variant="outlined" color="neutral">
                          {t("cancel")}
                        </Button>
                        <Button
                          onClick={handleSubmit}
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
  )
}

export default Settings
