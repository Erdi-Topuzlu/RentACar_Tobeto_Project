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
import getUserProfileValidationSchema from "../../schemes/userProfileScheme";
import axiosInstance from "../../redux/utilities/interceptors/axiosInterceptors";
import { toastSuccess } from "../../service/ToastifyService";
import { useTranslation } from "react-i18next";
import { Form } from "reactstrap";
import fetchUserData from "../../redux/actions/fetchUserData";


const Settings = () => {
  const { details, status, error } = useSelector((state) => state.userDetail);
  const { t } = useTranslation();
  const id = details.id;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEnabled,setIsEnabled] = useState();
  const userProfileScheme = getUserProfileValidationSchema();

  useEffect(() => {
    const isEnabled = localStorage.getItem("login_user");
    setIsEnabled(isEnabled)
  }, []);


  const initialValues = {
    firstName: details.name || "",
    lastName: details.surname || "",
    tcNo: details.tcNo || "",
    usernames: details.name || "",
    image: details.userPhotoUrl || "",
    // birthdate: details.birthDate || "",
  };

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
        role: details.role,
        tcNo: values.tcNo || details.tcNo,
        usernames: values.firstName || details.name || "",
        birthDate: details.birthDate,
        userPhotoUrl: selectedImage || details.userPhotoUrl,
        isEnabled : details.isEnabled,

      };

      try {
        const response = await axiosInstance.patch(
          `api/v1/users/${id}`,
          updatedData
        );
        if (response.status === 200) {
          dispatch(fetchUserData(id));
          toastSuccess(t("updateSuccess"));
        }
      } catch (error) {
        console.error(t("updateError"), error.response.data);
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
          } else {

          }
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsDataURL(file);
      toastSuccess(t("updatedPhoto"));
    }
  };

  if (status === "LOADING") {
    return <Loading />;
  } else if (status === "FAIL") {
    return <ErrorPage errorMessage={error} />
  }

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
        <Card style={{
          zIndex: 0,
          position: "relative",
          background:"linear-gradient(rgb(103, 58, 183, 0.2), rgb(103, 58, 183, 0.8))",
          WebkitBackdropFilter: isEnabled === "false" ? "blur(8px)" : "none",
          backdropFilter: isEnabled === "false" ? "blur(8px)" : "none",
          filter: isEnabled === "false" ? "blur(4px)" : "none",
          pointerEvents: isEnabled === "false" ? "none" : "auto"

        }}>
          <Card >
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">{t("personalInfo")}
              </Typography>
              <Typography level="body-sm">{t("personalInfoDesc")}</Typography>
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
                  <FormLabel>{t("fName")}</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <FormControl sx={{ display: "flex-column", gap: 1 }}>
                      <Input
                        name="firstName"
                        id="firstName"
                        className={
                          formik.errors.firstName &&
                          formik.touched.firstName &&
                          "error"
                        }
                        value={values.firstName}
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
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

                    <FormControl sx={{ display: "flex-column", gap: 1 }}>
                      <FormLabel>{t("lName")}</FormLabel>
                      <Input
                        name="lastName"
                        id="lastName"
                        className={
                          formik.errors.lastName &&
                          formik.touched.lastName &&
                          "error"
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

                    <FormControl sx={{ display: "flex-column", gap: 1 }}>
                      <FormLabel>{t("identifyNumberMust")}</FormLabel>
                      <Input
                        name="tcNo"
                        id="tcNo"
                        className={
                          formik.errors.tcNo && formik.touched.tcNo && "error"
                        }
                        type="text"

                        value={values.tcNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.tcNo && formik.touched.tcNo}
                        size="sm"
                        placeholder={
                          formik.errors.tcNo && formik.touched.tcNo
                            ? formik.errors.tcNo
                            : t("identifyNumber")
                        }
                      />
                    </FormControl>

                    {/* <FormControl sx={{ display: "flex-column", gap: 1 }}>
                    <FormLabel>{t("Username")}</FormLabel>
                    <Input
                      name="usernames"
                      id="usernames"
                      className={
                        formik.errors.usernames &&
                        formik.touched.usernames &&
                        "error"
                      }
                      value={values.usernames}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.usernames && formik.touched.usernames
                      }
                      size="sm"
                      placeholder={
                        formik.errors.usernames && formik.touched.usernames
                          ? formik.errors.usernames
                          : t("Username")
                      }
                    />
                  </FormControl> */}

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
                    <FormControl sx={{ display: "flex-column", gap: 2 }}>
                      <Input
                        name="firstName"
                        className={
                          formik.errors.firstName &&
                          formik.touched.firstName &&
                          "error"
                        }
                        value={values.firstName || details.name}
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          e.target.value;
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
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

                    <FormControl sx={{ display: "flex-column", gap: 1 }}>
                      <FormLabel>{t("lName")}</FormLabel>
                      <Input
                        name="lastName"
                        className={
                          formik.errors.lastName &&
                          formik.touched.lastName &&
                          "error"
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

                    <FormControl sx={{ display: "flex-column", gap: 1 }}>
                      <FormLabel>{t("identifyNumber")}</FormLabel>
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
                            : t("identifyNumber")
                        }
                      />
                    </FormControl>

                    {/* <FormControl sx={{ display: "flex-column", gap: 1 }}>
                    <FormLabel>{t("Username")}</FormLabel>
                    <Input
                      name="usernames"
                      className={
                        formik.errors.usernames &&
                        formik.touched.usernames &&
                        "error"
                      }
                      value={values.usernames}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors.usernames && formik.touched.usernames
                      }
                      size="sm"
                      placeholder={
                        formik.errors.usernames && formik.touched.usernames
                          ? formik.errors.usernames
                          : t("Username")
                      }
                    />
                  </FormControl> */}
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

        </Card>

      </Stack>
    </Form >
  );
};

export default Settings;
