import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SliderList from "./SliderList";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
  AspectRatio,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ModalDialog,
  styled,
} from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import fetchAllSliderData from "../../../../redux/actions/admin/fetchAllSliderData";

import Loading from "../../../../components/ui/Loading";
import SvgIcon from "@mui/joy/SvgIcon";
import getSliderValidationSchema from "../../../../schemes/sliderScheme";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function SliderTable() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { sliders, status, error } = useSelector(
    (state) => state.sliderAllData
  );
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [eventFile, setEventFile] = React.useState(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sliderValidationSchema = getSliderValidationSchema();

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  React.useEffect(() => {
    dispatch(fetchAllSliderData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!id) {
      setOpen(false);
      toastError("Slider ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/slider/${id}`);
        toastSuccess("Slider Başarıyla Silindi.");
        dispatch(fetchAllSliderData());
        setId(null);
      } catch (error) {
        setOpen(false);
        toastError("Bilinmeyen Hata");
        dispatch(fetchAllSliderData());
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      sliderTitle: "",
      sliderDesc: "",
      sliderBtn: t("details"),
    },
    validationSchema: sliderValidationSchema,
    onSubmit: async (values, actions) => {
      setOpen(false);
      const file = eventFile;
      const slider = {
        title: values.sliderTitle,
        description: values.sliderDesc,
        buttonLabelName: values.sliderBtn,
      };
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append(
        "sliderRequest",
        new Blob([JSON.stringify(slider)], {
          type: "application/json",
        })
      );

      const { access_token } = localStorage.getItem("access_token");

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      };

      if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          setSelectedImage(e.target.result);

          try {
            const response = await axiosInstance.post(
              "/api/v1/admin/slider",
              formData,
              {
                headers: headers,
              }
            );

            if (response.status === 200) {
              const updatedImageUrl = response.data;
              setSelectedImage(updatedImageUrl);
              toastSuccess("Uploaded Photo");
              dispatch(fetchAllSliderData());
            } else {
              toastError("Bilinmeyen hata");
              dispatch(fetchAllBrandData());
            }
          } catch (error) {
            console.error(error);
          }
        };

        reader.readAsDataURL(file);
      }
    },
  });

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          {t("slider").toUpperCase()}
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            setId(null);
            setOpen(true);
            setIsEdit(false);
          }}
        >
          {t("addNew")}
        </Button>
      </Box>
      <hr />
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        {status === "LOADING" ? (
          <Loading />
        ) : (
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground":
                "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground":
                "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "40px", padding: "12px 12px" }}>
                  <Link
                    underline="none"
                    color="primary"
                    component="button"
                    onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                    fontWeight="lg"
                    endDecorator={<ArrowDropDownIcon />}
                    sx={{
                      "& svg": {
                        transition: "0.2s",
                        transform:
                          order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                      },
                    }}
                  >
                    ID
                  </Link>
                </th>
                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("Slider")}
                </th>
                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("title")}
                </th>
                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("desc")}
                </th>
                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("btnLbl")}
                </th>
                {/*
              <th
                style={{
                  width: "auto",
                  padding: "12px 6px",
                  textAlign: "center",
                }}
              >
                Customer
              </th> */}
                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {stableSort(sliders, getComparator(order, "id")).map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: "0px 12px" }}>
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      style={{
                        height: "100px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={row.imgPath}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">{row.title}</Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">{row.description}</Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      {row.buttonLabelName}
                    </Typography>
                  </td>
                  {/* <td style={{ textAlign: "center" }}>
                  <div>
                    <Typography level="body-xs">{}</Typography>
                    <Typography level="body-xs">
                      {}
                    </Typography>
                  </div>
                </td> */}
                  <td style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => {
                        setId(row.id);
                        setOpenDelete(true);
                      }}
                      variant="plain"
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => {
            //formik.resetForm();
            setId(null);
            setOpen(false);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10001,
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              textAlign={"center"}
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {isEdit ? t("updateSlider") : t("addNewSlider")}
            </Typography>
            <hr />
            <Grid
              textAlign={"center"}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={12}>
                <Form onSubmit={formik.handleSubmit}>
                  <div>
                    <FormGroup>
                      <FormLabel>{t("sliderTitle")}</FormLabel>
                      <Input
                        id="sliderTitle"
                        name="sliderTitle"
                        type="text"
                        value={formik.values.sliderTitle}
                        className={
                          formik.errors.sliderTitle &&
                          formik.touched.sliderTitle &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          //setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.sliderTitle &&
                          formik.touched.sliderTitle
                            ? formik.errors.sliderTitle
                            : t("sliderTitle")
                        }
                        error={
                          formik.errors.sliderTitle &&
                          formik.touched.sliderTitle
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>{t("sliderDesc")}</FormLabel>
                      <Input
                        id="sliderDesc"
                        name="sliderDesc"
                        type="text"
                        value={formik.values.sliderDesc}
                        className={
                          formik.errors.sliderDesc &&
                          formik.touched.sliderDesc &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          //setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.sliderDesc && formik.touched.sliderDesc
                            ? formik.errors.sliderDesc
                            : t("sliderDesc")
                        }
                        error={
                          formik.errors.sliderDesc && formik.touched.sliderDesc
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>{t("sliderBtnLbl")}</FormLabel>
                      <Input
                        id="sliderBtn"
                        name="sliderBtn"
                        type="text"
                        value={formik.values.sliderBtn}
                        className={
                          formik.errors.sliderBtn &&
                          formik.touched.sliderBtn &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          //setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.sliderBtn && formik.touched.sliderBtn
                            ? formik.errors.sliderBtn
                            : t("sliderBtn")
                        }
                        error={
                          formik.errors.sliderBtn && formik.touched.sliderBtn
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <p style={{ fontWeight: "600" }}>{t("sliderFile")}</p>
                      <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                        color="neutral"
                        startDecorator={
                          <SvgIcon>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                              />
                            </svg>
                          </SvgIcon>
                        }
                      >
                        Upload a Slide
                        <VisuallyHiddenInput
                          onChange={(e) => {
                            setEventFile(e.target.files[0]);
                          }}
                          type="file"
                          accept="image/*"
                          id="image-upload"
                        />
                      </Button>
                    </FormGroup>
                    {/* <FormGroup className="">
                    <FormLabel>{t("sliderTitle")}</FormLabel>
                      <Input
                        id="sliderTitle"
                        name="sliderTitle"
                        type="text"
                        value={formik.values.sliderTitle || ""}
                        className={
                          formik.errors.sliderTitle &&
                          formik.touched.sliderTitle &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.sliderTitle && formik.touched.sliderTitle
                            ? formik.errors.sliderTitle
                            : t("sliderTitle")
                        }
                        error={
                          formik.errors.sliderTitle && formik.touched.sliderTitle
                        }
                      />
                    </FormGroup>
                    <FormGroup className="">
                    <FormLabel>{t("sliderDesc")}</FormLabel>
                      <Input
                        id="sliderDesc"
                        name="sliderDesc"
                        type="text"
                        value={formik.values.sliderDesc || ""}
                        className={
                          formik.errors.sliderDesc &&
                          formik.touched.sliderDesc &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.sliderDesc && formik.touched.sliderDesc
                            ? formik.errors.sliderDesc
                            : t("sliderDesc")
                        }
                        error={
                          formik.errors.sliderDesc && formik.touched.sliderDesc
                        }
                      />
                    </FormGroup>
                    <FormGroup className="">
                    <FormLabel>{t("sliderBtnLabel")}</FormLabel>
                      <Input
                        id="sliderBtnLabel"
                        name="sliderBtnLabel"
                        type="text"
                        value={formik.values.sliderBtnLabel || ""}
                        className={
                          formik.errors.sliderBtnLabel &&
                          formik.touched.sliderBtnLabel &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.sliderBtnLabel && formik.touched.sliderBtnLabel
                            ? formik.errors.sliderBtnLabel
                            : t("sliderBtnLabel")
                        }
                        error={
                          formik.errors.sliderBtnLabel && formik.touched.sliderBtnLabel
                        }
                      />
                    </FormGroup> */}
                  </div>
                  {id ? (
                    <Button
                      onClick={() => {
                        handleUpdate(id);
                      }}
                      className=" form__btn"
                      style={{ backgroundColor: "#673ab7", color: "white" }}
                    >
                      {t("update")}
                    </Button>
                  ) : (
                    <Button
                      className=" form__btn"
                      type="submit"
                      style={{ backgroundColor: "#673ab7", color: "white" }}
                      disabled={formik.isSubmitting}
                    >
                      {t("add")}
                    </Button>
                  )}
                </Form>
              </Grid>
            </Grid>
          </Sheet>
        </Modal>
        <Modal
          open={openDelete}
          onClose={() => {
            setId(null);
            //setBrandName(null);
            setOpenDelete(false);
          }}
          sx={{
            zIndex: 11000,
          }}
        >
          <ModalDialog variant="outlined" role="alertdialog">
            <DialogTitle>
              <WarningRoundedIcon />
              {t("confirmation")}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <p style={{ fontWeight: "bold" }}></p>
              {t("deleteMessage")}
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => {
                  handleDelete(id);
                  setOpenDelete(false);
                }}
              >
                {t("delete")}
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setOpenDelete(false)}
              >
                {t("cancel")}
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Sheet>
      <SliderList />
    </React.Fragment>
  );
}
