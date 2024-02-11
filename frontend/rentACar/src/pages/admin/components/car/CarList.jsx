/* eslint-disable jsx-a11y/anchor-is-valid */
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
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Button,
  Chip,
  FormLabel,
  Grid,
  Modal,
  ModalClose,
  Sheet,
  Table,
} from "@mui/joy";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useFormik } from "formik";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { Form, FormGroup, Input } from "reactstrap";
import fetchAllColorData from "../../../../redux/actions/admin/fetchAllColorData";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import fetchAllModelData from "../../../../redux/actions/admin/fetchAllModelData";
import fetchAllBrandData from "../../../../redux/actions/admin/fetchAllBrandData";

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

export default function CarList() {
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
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState("");
  const { items, status, error } = useSelector((state) => state.carAllData);
  const { colors } = useSelector((state) => state.colorAllData);
  const { models } = useSelector((state) => state.modelAllData);
  const { brands } = useSelector((state) => state.brandAllData);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllCarData());
    dispatch(fetchAllColorData());
    dispatch(fetchAllModelData());
    dispatch(fetchAllBrandData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!id) {
      toastError("Car ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/cars/${id}`);
        toastSuccess("Car Başarıyla Silindi.");
        dispatch(fetchAllCarData());
      } catch (error) {
        console.error("Kayıt hatası:", error);
      }
    }
  };

  const handleUpdate = async (id) => {
    if (!kilometer) {
      setOpen(false);
      toastError("Kilometer alanı boş bırakılamaz!");
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
        toastSuccess("Car Başarıyla Güncellendi.");
        setOpen(false);
        dispatch(fetchAllCarData());
      } catch (error) {
        console.error("Kayıt hatası:", error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      colorName: "",
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
              {t("cars")}
            </th>
            {/* <th
                style={{
                  width: "auto",
                  padding: "12px 6px",
                  textAlign: "center",
                }}
              >
                Status
              </th>
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
                textAlign: "right",
              }}
            >
              {t("actions")}
            </th>
          </tr>
        </thead>
      </Table>

      {stableSort(items, getComparator(order, "id")).map((item) => (
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
              <div
                style={{
                  padding: "6px 60px",
                }}
              >
                <Typography fontWeight={600} gutterBottom>
                  {item.modelId?.brandId?.name} | {item.modelId?.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {item.year} &bull; {item.colorId.name}
                </Typography>
                <Typography level="body-xs">
                  <Chip
                    color="primary"
                    variant="solid"
                  >
                    {item.plate}
                  </Chip>                  
                </Typography>
                <Typography level="body-xs">{item.dailyPrice} ₺</Typography>
              </div>
            </ListItemContent>
            {/* <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Paid: <CheckRoundedIcon />,
                  Refunded: <AutorenewRoundedIcon />,
                  Cancelled: <BlockIcon />
                }[item.status]
              }
              color={
                {
                  Paid: "success",
                  Refunded: "neutral",
                  Cancelled: "danger"
                }[item.status]
              }
            >
              {item.status}
            </Chip> */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
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
                      setId(item.id);
                      //setCarName(row.name);
                      setOpen(true);
                      setIsEdit(true);
                    }}
                  >
                    {t("edit")}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setId(item.id);
                      handleDelete(row.id);
                    }}
                    color="danger"
                  >
                    {t("delete")}
                  </MenuItem>
                </Menu>
              </Dropdown>
            </Box>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          formik.resetForm();
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
                <div>
                  <FormLabel>{t("kilometer")}</FormLabel>
                  <FormGroup className="">
                    <Input
                      id="kilometer"
                      name="kilometer"
                      type="text"
                      value={formik.values.kilometer || kilometer}
                      className={
                        formik.errors.kilometer &&
                        formik.touched.kilometer &&
                        "error"
                      }
                      onChange={(e) => {
                        setKilometer(e.target.value);
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder={
                        formik.errors.kilometer && formik.touched.kilometer
                          ? formik.errors.kilometer
                          : t("kilometer")
                      }
                      error={
                        formik.errors.kilometer && formik.touched.kilometer
                      }
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormLabel>{t("plate")}</FormLabel>
                  <FormGroup className="">
                    <Input
                      id="plate"
                      name="plate"
                      type="text"
                      value={formik.values.plate || plate}
                      className={
                        formik.errors.plate && formik.touched.plate && "error"
                      }
                      onChange={(e) => {
                        setPlate(e.target.value);
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder={
                        formik.errors.plate && formik.touched.plate
                          ? formik.errors.plate
                          : t("plate")
                      }
                      error={formik.errors.plate && formik.touched.plate}
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormLabel>{t("year")}</FormLabel>
                  <FormGroup className="">
                    <Input
                      id="year"
                      name="year"
                      type="text"
                      value={formik.values.year || year}
                      className={
                        formik.errors.year && formik.touched.year && "error"
                      }
                      onChange={(e) => {
                        setYear(e.target.value);
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder={
                        formik.errors.year && formik.touched.year
                          ? formik.errors.year
                          : t("year")
                      }
                      error={formik.errors.year && formik.touched.year}
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormLabel>{t("dailyPriceCar")}</FormLabel>
                  <FormGroup className="">
                    <Input
                      id="dailyPrice"
                      name="dailyPrice"
                      type="text"
                      value={formik.values.dailyPrice || dailyPrice}
                      className={
                        formik.errors.dailyPrice &&
                        formik.touched.dailyPrice &&
                        "error"
                      }
                      onChange={(e) => {
                        setDailyPrice(e.target.value);
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      placeholder={
                        formik.errors.dailyPrice && formik.touched.dailyPrice
                          ? formik.errors.dailyPrice
                          : t("dailyPriceCar")
                      }
                      error={
                        formik.errors.dailyPrice && formik.touched.dailyPrice
                      }
                    />
                  </FormGroup>
                </div>

                <div>
                  <FormLabel>{t("selectBrandAndModel")}</FormLabel>
                  <FormGroup className="">
                    <select
                      id="brand"
                      name="brandId"
                      value={brandId}
                      onChange={(e) => {
                        const selectedBrandId = e.target.value;
                        setBrandId(selectedBrandId);

                        const selectedBrandModels = models.filter(
                          (model) =>
                            model.brandId.id === parseInt(selectedBrandId)
                        );

                        if (selectedBrandModels.length > 0) {
                          setModelId(selectedBrandModels[0].id);
                        } else {
                          setModelId("");
                        }
                      }}
                    >
                      <option value="">{t("selectBrand")}</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>

                    <select
                      id="model"
                      name="modelId"
                      value={modelId}
                      onChange={(e) => setModelId(e.target.value)}
                      disabled={!brandId}
                    >
                      <option value="">{t("selectModel")}</option>
                      {models
                        .filter(
                          (model) => model.brandId.id === parseInt(brandId)
                        )
                        .map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.name}
                          </option>
                        ))}
                    </select>
                  </FormGroup>
                </div>

                <div>
                  <FormLabel>{t("selectColor")}</FormLabel>
                  <FormGroup className="">
                    <select
                      id="color"
                      name="color"
                      type="text"
                      value={formik.values.colorId}
                      className={
                        formik.errors.colorId &&
                        formik.touched.colorId &&
                        "error"
                      }
                      onChange={(e) => {
                        setColorId(e.target.value);
                        formik.setFieldValue("colorId", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">{t("selectColor")}</option>
                      {colors.map((color) => {
                        const colorId = color.id;
                        return (
                          <option key={colorId} value={colorId}>
                            {color.name}
                          </option>
                        );
                      })}
                    </select>

                    {/* <label>
                        <input
                          id="isAvailable"
                          name="isAvailable"
                          type="checkbox"
                          checked={formik.values.isAvailable}
                          onChange={(e) => {
                            formik.setFieldValue("isAvailable", e.target.checked); 
                          }}
                        />
                        Is Available
                      </label> */}
                  </FormGroup>
                </div>

                <div>
                  <FormLabel htmlFor="fuelType">
                    {t("selectFuelAndGear")}
                  </FormLabel>
                  <FormGroup className="">
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formik.values.fuelType || fuelType}
                      onChange={(e) => {
                        setFuelType(e.target.value);
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      className={
                        formik.errors.fuelType &&
                        formik.touched.fuelType &&
                        "error"
                      }
                    >
                      <option value="">{t("selectFuelType")}</option>
                      <option value="GASOLINE" key="1">
                        Gasoline
                      </option>
                      <option value="DIESEL" key="2">
                        Diesel
                      </option>
                      <option value="HYBRID" key="3">
                        Hybrid
                      </option>
                    </select>

                    <select
                      id="gearType"
                      name="gearType"
                      type="text"
                      value={formik.values.gearType || gearType}
                      className={
                        formik.errors.gearType &&
                        formik.touched.gearType &&
                        "error"
                      }
                      onChange={(e) => {
                        // Update the brandName state when the input changes
                        setGearType(e.target.value);
                        formik.handleChange(e); // Invoke Formik's handleChange as well
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">{t("selectGearType")}</option>
                      <option value="AUTOMATIC" key="1">
                        Automatic
                      </option>
                      <option value="MANUAL" key="2">
                        Manual
                      </option>
                    </select>
                  </FormGroup>
                </div>

                <div>
                  <FormLabel>{t("selectVehicleAndSeat")}</FormLabel>
                  <FormGroup className="">
                    <select
                      id="vehicleType"
                      name="vehicleType"
                      type="text"
                      value={formik.values.vehicleType || vehicleType}
                      className={
                        formik.errors.vehicleType &&
                        formik.touched.vehicleType &&
                        "error"
                      }
                      onChange={(e) => {
                        // Update the brandName state when the input changes
                        setVehicleType(e.target.value);
                        formik.handleChange(e); // Invoke Formik's handleChange as well
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">{t("selectVehicleType")}</option>
                      <option value="SUV" key="1">
                        SUV
                      </option>
                      <option value="SEDAN" key="2">
                        Sedan
                      </option>
                      <option value="HB" key="3">
                        Hatchback
                      </option>
                    </select>

                    <select
                      id="seatType"
                      name="seatType"
                      type="text"
                      value={formik.values.seatType || seatType}
                      className={
                        formik.errors.seatType &&
                        formik.touched.seatType &&
                        "error"
                      }
                      onChange={(e) => {
                        // Update the brandName state when the input changes
                        setSeatType(e.target.value);
                        formik.handleChange(e); // Invoke Formik's handleChange as well
                      }}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">{t("selectSeatType")}</option>
                      <option value="TWO" key="1">
                        2
                      </option>
                      <option value="FIVE" key="2">
                        5
                      </option>
                      <option value="SEVEN" key="3">
                        7
                      </option>
                    </select>
                  </FormGroup>
                </div>

                {id ? (
                  <Button
                    onClick={() => {
                      setIsEdit(true);
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
                    disabled={formik.isSubmitting}
                    style={{ backgroundColor: "#673ab7", color: "white" }}
                  >
                    {t("add")}
                  </Button>
                )}
              </Form>
            </Grid>
          </Grid>
        </Sheet>
      </Modal>
    </Box>
  );
}
