import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FileUpload from "../../components/helper/profile/FileUpload";
import CountrySelector from "../../components/helper/profile/CountrySelector";
import EditorToolbar from "../../components/helper/profile/EditorToolbar";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchUserData from "../../redux/actions/fetchUserData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "reactstrap";
import { userProfileScheme } from "../../schemes/userProfileScheme";
import axiosInstance from "../../redux/utilities/interceptors/axiosInterceptors";
import ErrorPage from "../../components/ui/ErrorPage";
import fetchUserPhotoUpdateData from "../../redux/actions/fetchUserPhotoUpdateData";
import { toastSuccess } from "../../service/ToastifyService";
import Loading from "../../components/ui/Loading";
import Helmet from "../../components/Helmet";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  // const [id, setId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const id = details.id;

  if (status === "LOADING") {
    return <Loading />;
  }else if (status === "FAIL"){
    return <ErrorPage errorMessage={error} />
  }
  // setId(details.id);

  console.log(details)


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

  const initialValues = {
    firstName: "",
    lastName: "",
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
        birthDate: values.birthdate || details.birthDate,
        userPhotoUrl: selectedImage || details.userPhotoUrl,
      };

      try {
        const response = await axiosInstance.put(
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
      toastSuccess("Editted Profile Information");
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return (
    <Helmet title={t("Profile")}>
      {/* {canAccessPage ? ( */}
        <Form onSubmit={handleSubmit}>
          <Box sx={{ flex: 1, width: "100%" }}>
            <Box
              sx={{
                position: "sticky",
                top: { sm: -100, md: -110 },
                bgcolor: "background.body",
                zIndex: 9995,
              }}
            >
              <Box sx={{ px: { xs: 2, md: 6 } }}>
                <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                {t("welcomeProfile")}{details.name ? details.name : "User"}
                </Typography>
              </Box>
              <Tabs
                defaultValue={0}
                sx={{
                  bgcolor: "transparent",
                }}
              >
                <TabList
                  tabFlex={1}
                  size="sm"
                  sx={{
                    pl: { xs: 0, md: 4 },
                    justifyContent: "left",
                    [`&& .${tabClasses.root}`]: {
                      fontWeight: "600",
                      flex: "initial",
                      color: "text.tertiary",
                      [`&.${tabClasses.selected}`]: {
                        bgcolor: "transparent",
                        color: "text.primary",
                        "&::after": {
                          height: "2px",
                          bgcolor: "primary.500",
                        },
                      },
                    },
                  }}
                >
                  <Tab
                    sx={{ borderRadius: "6px 6px 0 0" }}
                    indicatorInset
                    value={0}
                  >
                    {t("profileSetting")}
                  </Tab>
                  {/* <Tab
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                  value={1}
                >
                  Saved Credit Cards
                </Tab>
                <Tab
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                  value={2}
                >
                  My Reservations
                </Tab>
                <Tab
                  sx={{ borderRadius: "6px 6px 0 0" }}
                  indicatorInset
                  value={3}
                >
                  My Bills
                </Tab> */}
                </TabList>
              </Tabs>
            </Box>
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
                  <Typography level="title-md">{t("personalInfo")}</Typography>
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
                        <FormControl sx={{ display: "flex-column", gap: 1 }}>
                          <Input
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            size="sm"
                            placeholder={t("fName")}
                          />
                        </FormControl>

                        {touched.firstName && errors.firstName && (
                          <div style={{ color: "red" }}>{errors.firstName}</div>
                        )}

                        <FormControl sx={{ display: "flex-column", gap: 1 }}>
                          <FormLabel>{t("lName")}</FormLabel>
                          <Input
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            size="sm"
                            placeholder={t("lName")}
                          />
                        </FormControl>

                        {touched.lastName && errors.lastName && (
                          <div style={{ color: "red" }}>{errors.lastName}</div>
                        )}

                        <FormControl>
                          <FormLabel>{t("birthDate")}</FormLabel>
                          <Input
                            name="birthdate"
                            value={values.birthdate}
                            onChange={handleChange}
                            type="date"
                            size="sm"
                            placeholder={t("birthDate")}
                          />
                        </FormControl>
                        {touched.birthdate && errors.birthdate && (
                          <div style={{ color: "red" }}>{errors.birthdate}</div>
                        )}
                      </FormControl>
                    </Stack>
                    {/* <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>E-mail</FormLabel>

                      <FormControl sx={{ display: "flex-column", gap: 1 }}>
                        <Input
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          size="sm"
                          placeholder="E-mail"
                        />
                      </FormControl>
                      {touched.email && errors.email && (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      )}
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Password</FormLabel>

                      <FormControl sx={{ display: "flex-column", gap: 1 }}>
                        <Input
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          size="sm"
                          placeholder="Password"
                          type="password"
                        />
                      </FormControl>
                      {touched.password && errors.password && (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      )}
                    </FormControl>
                  </Stack> */}
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
                            value={values.firstName}
                            onChange={handleChange}
                            size="sm"
                            placeholder={t("fName")}
                          />
                        </FormControl>
                        {touched.firstName && errors.firstName && (
                          <div style={{ color: "red" }}>{errors.firstName}</div>
                        )}

                        <FormControl sx={{ display: "flex-column", gap: 1 }}>
                          <FormLabel>{t("lName")}</FormLabel>
                          <Input
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            size="sm"
                            placeholder={t("lName")}
                          />
                        </FormControl>

                        {touched.lastName && errors.lastName && (
                          <div style={{ color: "red" }}>{errors.lastName}</div>
                        )}

                        <FormControl>
                          <FormLabel>{t("birthDate")}</FormLabel>
                          <Input
                            name="birthdate"
                            value={values.birthdate}
                            onChange={handleChange}
                            type="date"
                            size="sm"
                            placeholder={t("birthDate")}
                          />
                        </FormControl>
                        {touched.birthdate && errors.birthdate && (
                          <div style={{ color: "red" }}>{errors.birthdate}</div>
                        )}
                      </FormControl>
                    </Stack>
                  </Stack>

                  {/* <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>E-mail</FormLabel>

                  <FormControl sx={{ display: "flex-column", gap: 2 }}>
                    <Input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      size="sm"
                      placeholder="E-mail"
                    />
                  </FormControl>

                  {touched.email && errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </FormControl> */}
                </Stack>

                {/* BUTTONS */}
                <CardOverflow
                  sx={{ borderTop: "1px solid", borderColor: "divider" }}
                >
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="outlined" color="neutral">
                    {t("cancel")}
                    </Button>
                    <Button onClick={handleSubmit} size="sm" variant="solid">
                    {t("save")}
                    </Button>
                  </CardActions>
                </CardOverflow>
              </Card>
            </Stack>
          </Box>
        </Form>
      {/* ) : (
        <Loading />
      )} */}
    </Helmet>
  );
}
