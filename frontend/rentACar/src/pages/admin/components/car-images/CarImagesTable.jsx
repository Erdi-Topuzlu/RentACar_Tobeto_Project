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

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllCarData());
    dispatch(fetchAllColorData());
    dispatch(fetchAllModelData());
    dispatch(fetchAllBrandData());
  }, [dispatch]);

  const carValidationSchema = getCarValidationSchema();

  const handleDelete = async (id) => {
    if (!id) {
      toastError("Car ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/cars/${id}`);
        toastSuccess(t("carSuccessDelete"));
        dispatch(fetchAllCarData());
      } catch (error) {
        setOpen(false)
        toastError(t("connectedDataDelete"))
        dispatch(fetchAllCarData())

      }
    }
  };

  const handleUpdate = async (id) => {
    if (!kilometer) {
      setOpen(false);
      toastError(t("schemeCarKilometer"));
    } else {
      const updatedData = {
        id: id,
        kilometer: kilometer,
        plate: plate,
        year: year,
        dailyPrice: dailyPrice,
        fuelType: fuelType,
        gearType: gearType,
        vehicleType: vehicleType,
        seatType: seatType,
        isAvailable: "true",
        modelId: modelId,
        colorId: colorId,
      };

      try {
        await axiosInstance.put(`api/v1/admin/cars/${id}`, updatedData);
        toastSuccess(t("carSuccessUpdate"));
        setOpen(false);
        dispatch(fetchAllCarData());
      } catch (error) {
        setOpen(false);
        if(error.response.data.message === "VALIDATION.EXCEPTION" ){
          toastError(JSON.stringify(error.response.data.validationErrors.name));
          dispatch(fetchAllCarData())
        }else if(error.response.data.type === "BUSINESS.EXCEPTION"){
          toastError(JSON.stringify(error.response.data.message))
          dispatch(fetchAllCarData())
        }else{
          toastError(t("unknownError"))
        }
    }
    }
  };

  const formik = useFormik({
    initialValues: {
      kilometer: kilometer || "",
      plate: plate || "",
      year: year || "",
      dailyPrice: dailyPrice || "",
      fuelType: fuelType || "",
      gearType: gearType || "",
      vehicleType: vehicleType || "",
      seatType: seatType || "",
      colorId: colorId || "",
      modelId: modelId || "",
      isAvailable: "",
    },

    validationSchema: carValidationSchema,
    onSubmit: async (values, actions) => {
      const data = {
        kilometer: values.kilometer,
        plate: values.plate,
        year: values.year,
        dailyPrice: values.dailyPrice,
        fuelType: values.fuelType,
        gearType: values.gearType,
        vehicleType: values.vehicleType,
        seatType: values.seatType,
        isAvailable: "True",
        modelId: modelId,
        colorId: colorId,
      };

      try {
        await axiosInstance.post("api/v1/admin/cars", data);
        toastSuccess(t("carSuccessAdded"));
        setOpen(false);
        dispatch(fetchAllCarData());
        actions.resetForm();
      } catch (error) {
        setOpen(false);
        if(error.response.data.message === "VALIDATION.EXCEPTION" ){
          toastError(JSON.stringify(error.response.data.validationErrors.name));
          dispatch(fetchAllCarData())
        }else if(error.response.data.type === "BUSINESS.EXCEPTION"){
          toastError(JSON.stringify(error.response.data.message))
          dispatch(fetchAllCarData())
        }else{
          toastError(t("unknownError"))
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
            setKilometer(null);
            setPlate(null);
            setYear(null);
            setDailyPrice(null);
            setBrandId(null);
            setModelId(null);
            setColorId(null);
            setFuelType(null);
            setGearType(null);
            setVehicleType(null);
            setSeatType(null);
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
                  {t("year")} | {t("color")}
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("plate")}
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("dailyPriceCar")}
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

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      {row?.year} | {row?.colorId?.name}
                    </Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Chip color="primary" variant="solid">
                      {row?.plate}
                    </Chip>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Chip color="success" variant="solid">
                      {row?.dailyPrice} ₺
                    </Chip>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: {
                            variant: "plain",
                            color: "neutral",
                            size: "sm",
                          },
                        }}
                      >
                        <MoreHorizRoundedIcon />
                      </MenuButton>
                      <Menu size="sm" sx={{ minWidth: 140 }}>
                        <MenuItem
                          onClick={() => {
                            setId(row?.id);
                            setKilometer(row?.kilometer);
                            setPlate(row?.plate);
                            setYear(row?.year);
                            setDailyPrice(row?.dailyPrice);
                            setBrandId(row?.modelId?.brandId?.id);
                            setModelId(row?.modelId?.id);
                            setColorId(row?.colorId?.id);
                            setFuelType(row?.fuelType);
                            setGearType(row?.gearType);
                            setVehicleType(row?.vehicleType);
                            setSeatType(row?.seatType);
                            setOpen(true);
                            setIsEdit(true);
                          }}
                        >
                          {t("edit")}
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={() => {
                            setId(row?.id);
                            setCarName(
                              row?.modelId?.brandId?.name +
                                " | " +
                                row?.modelId?.name
                            );
                            setOpenDelete(true);
                          }}
                          color="danger"
                        >
                          {t("delete")}
                        </MenuItem>
                      </Menu>
                    </Dropdown>
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
            setId(null);
            setKilometer(null);
            setPlate(null);
            setYear(null);
            setDailyPrice(null);
            setBrandId(null);
            setModelId(null);
            setColorId(null);
            setFuelType(null);
            setGearType(null);
            setVehicleType(null);
            setSeatType(null);
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
                {/* Form is here */}
              </Grid>
            </Grid>
          </Sheet>
        </Modal>
        <Modal
          open={openDelete}
          onClose={() => {
            setId(null);
            setCarName(null);
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
      <CarImagesList />
    </React.Fragment>
  );
}