import * as React from "react";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  SvgIcon,
  Table,
  styled,
} from "@mui/joy";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useFormik } from "formik";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { Form, FormGroup, Input } from "reactstrap";
import fetchAllSliderData from "../../../../redux/actions/admin/fetchAllSliderData";
import Loading from "../../../../components/ui/Loading";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

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

export default function SliderList() {
  const [id, setId] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { sliders, status, error } = useSelector(
    (state) => state.sliderAllData
  );
  const [openDelete, setOpenDelete] = React.useState(false);
  const [eventFile, setEventFile] = React.useState(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

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
  });

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          "--TableCell-headBackground": "var(--joy-palette-background-level1)",
          "--Table-headerUnderlineThickness": "1px",
          "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
          "--TableCell-paddingY": "4px",
          "--TableCell-paddingX": "8px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "40px", padding: "12px 6px" }}>
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
              {t("slider")}
            </th>

            <th
              style={{
                width: "auto",
                padding: "12px 6px",
                textAlign: "right",
              }}
            >
              {t("actions")}
            </th>
          </tr>
        </thead>
      </Table>
      {status === "LOADING" ? (
        <Loading />
      ) : (
        stableSort(sliders, getComparator(order, "id")).map((item) => (
          <List
            key={item.id}
            size="sm"
            sx={{
              "--ListItem-paddingX": 0,
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <ListItemContent
                sx={{ display: "flex", gap: 2, alignItems: "start" }}
              >
                <ListItemDecorator>
                  <Avatar size="sm">{item.id}</Avatar>
                </ListItemDecorator>
                <div style={{ width: "100px" }}>
                  <img
                    style={{
                      height: "100px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={item.imgPath}
                  />
                </div>
                <div
                  style={{
                    padding: "6px 60px",
                  }}
                >
                  <Typography fontWeight={600} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography level="body-xs" gutterBottom>
                    {item.description}
                  </Typography>
                  <Typography level="body-xs" gutterBottom>
                    {item.buttonLabelName}
                  </Typography>
                </div>
              </ListItemContent>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <IconButton
                  onClick={() => {
                    setId(item.id);
                    setOpenDelete(true);
                  }}
                  variant="plain"
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Box>
            </ListItem>
            <ListDivider />
          </List>
        ))
      )}

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
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
            {t("addNewSlider")}
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
                        formik.handleChange(e);
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
                        formik.handleChange(e);
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
                        formik.handleChange(e);
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
    </Box>
  );
}
