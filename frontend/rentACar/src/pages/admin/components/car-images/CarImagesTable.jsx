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
import {
  Chip,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ModalDialog,
  SvgIcon,
  styled,
} from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import getCarValidationSchema from "../../../../schemes/carScheme";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import CarImagesList from "./CarImagesList";
import fetchAllColorData from "../../../../redux/actions/admin/fetchAllColorData";
import fetchAllModelData from "../../../../redux/actions/admin/fetchAllModelData";
import fetchAllBrandData from "../../../../redux/actions/admin/fetchAllBrandData";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
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

export default function CarImagesTable() {
  const [id, setId] = React.useState();
  const [isChecked, setIsChecked] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [kilometer, setKilometer] = React.useState();
  const [plate, setPlate] = React.useState();
  const [year, setYear] = React.useState();
  const [dailyPrice, setDailyPrice] = React.useState();
  const [fuelType, setFuelType] = React.useState();
  const [gearType, setGearType] = React.useState();
  const [vehicleType, setVehicleType] = React.useState("");
  const [seatType, setSeatType] = React.useState("");
  const [colorId, setColorId] = React.useState("");
  const [modelId, setModelId] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [carName, setCarName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState("");
  const { items, status, error } = useSelector((state) => state.carAllData);
  const { colors } = useSelector((state) => state.colorAllData);
  const { models } = useSelector((state) => state.modelAllData);
  const { brands } = useSelector((state) => state.brandAllData);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [eventFile, setEventFile] = React.useState([]);
  const [fileName, setFileName] = React.useState([]);
  const [carId, setCarId] = React.useState();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllCarData());
    dispatch(fetchAllColorData());
    dispatch(fetchAllModelData());
    dispatch(fetchAllBrandData());
  }, [dispatch]);

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

  const carValidationSchema = getCarValidationSchema();

  const formik = useFormik({
    initialValues: {
      carId: "",
    },

    //validationSchema: carValidationSchema,
    onSubmit: async (values, actions) => {
      setOpen(false);
      console.log(eventFile);
      const files = eventFile;
      const selectedCarId = {
        carId: values.carId,
      };
      alert(carId);
      
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`file${index + 1}`, file, file.name);
      });

      formData.append(
        "carId",
        new Blob([JSON.stringify(selectedCarId)], {
          type: "application/json",
        })
      );

     

      const { access_token } = localStorage.getItem("access_token");

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      };

      if (files.length > 0) {
        try {
          alert(JSON.stringify(formData));
          const response = await axiosInstance.post(
            "/api/v1/admin/car-images",
            formData,
            {
              headers: headers,
            }
          );
    
          if (response.status === 200) {
            toastSuccess("Uploaded Photos");
            dispatch(fetchAllCarData());
          } else {
            toastError("Bilinmeyen hata", response.error);
            dispatch(fetchAllCarData());
          }
        } catch (error) {
          toastError("Bilinmeyen hata", error.response ? error.response.data : "");
        }
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
          {t("cars").toUpperCase()}
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            setId(null);
            setCarId(null);
            setFileName([]);
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
                  {t("brand")} | {t("model")}
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("image")} 1
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("image")} 2
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("image")} 3
                </th>

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
              {stableSort(items, getComparator(order, "id")).map((row) => (
                <tr key={row?.id}>
                  <td style={{ padding: "0px 12px" }}>
                    <Typography level="body-xs">{row?.id}</Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      {row?.modelId?.brandId?.name} | {row?.modelId?.name}
                    </Typography>
                  </td>

                  {!row || !row.carImages || row.carImages.length === 0 ? (
                    <>
                      {[...Array(3)].map((_, index) => (
                        <td key={index} style={{ textAlign: "center" }}>
                          <img
                            style={{
                              height: "100px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                            src="https://placehold.co/600x400"
                          />
                        </td>
                      ))}
                    </>
                  ) : (
                    row.carImages.map((img, index) => (
                      <td key={index} style={{ textAlign: "center" }}>
                        <img
                          style={{
                            height: "100px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={img.imgPath}
                          alt={`Car Image ${index + 1}`}
                        />
                      </td>
                    ))
                  )}

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
            formik.resetForm();
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
              {!isEdit ? t("addNewCar") : t("updateCar")}
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
                  <FormGroup className="">
                    <select
                      id="car"
                      name="carId"
                      value={formik.values.carId || carId}
                      onChange={(e) => {
                        const selectedCarId = e.target.value;
                        setCarId(selectedCarId);
                      }}
                      style={{
                        textAlign: "center",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        padding: "7px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        width: "50%",
                      }}
                    >
                      <option value="">{t("selectCar")}</option>
                      {items.map((car, index) => (
                        <option key={car.id} value={car.id}>
                          {car.modelId?.brandId?.name} - {car.modelId?.name}
                        </option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup>
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
                      Upload a Image
                      <VisuallyHiddenInput
                        onChange={(e) => {
                          const selectedFiles = Array.from(e.target.files);
                          setEventFile(selectedFiles);

                          if (selectedFiles.length <= 3) {
                            const fileNames = selectedFiles.map(
                              (file) => file.name
                            );
                            setFileName(fileNames);
                          } else {
                            setOpen(false);
                            toastError(`You can select up to 3 files.`);
                            e.target.value = null;
                          }
                        }}
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        multiple
                      />
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    {fileName.length === 0 ? (
                      ""
                    ) : (
                      <>
                        <FormLabel>Yüklenecek Resimler</FormLabel>
                        {fileName.map((name, index) => (
                          <p key={index}>{name}</p>
                        ))}
                      </>
                    )}
                  </FormGroup>

                  <Button
                    className=" form__btn"
                    type="submit"
                    disabled={formik.isSubmitting}
                    style={{ backgroundColor: "#673ab7", color: "white" }}
                  >
                    {t("add")}
                  </Button>
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
              <p style={{ fontWeight: "bold" }}>{carName}</p>
              {t("deleteMessage")}
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => {
                  //handleDelete(id);
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
      <CarImagesList />
    </React.Fragment>
  );
}
