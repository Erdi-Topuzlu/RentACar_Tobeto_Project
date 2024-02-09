import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
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
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Grid } from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import getCarValidationSchema from "../../../../schemes/carScheme";
import { toastSuccess } from "../../../../service/ToastifyService";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import CarList from "./CarList";
import fetchAllColorData from "../../../../redux/actions/admin/fetchAllColorData";
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

export default function CarTable() {
  const [id, setId] = React.useState();
  const [isChecked, setIsChecked] = React.useState(false);
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



  const carValidationSchema = getCarValidationSchema();

  const handleDelete = async (id) => {
    if (!id) {
      toastError("Car ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/cars/${id}`);
        toastSuccess("Car Başarıyla Silindi.");
        dispatch(fetchAllCarData());
      } catch (error) {
        alert(error)
        console.error("Kayıt hatası:", error);
      }
    }
  };

  const handleUpdate = async (id) => {
    if (!carName) {
      setOpen(false);
      toastError("Car name alanı boş bırakılamaz!");
    } else {

      const data = {
        id: id,
        name: carName,
      };

      try {
        await axiosInstance.put(`api/v1/admin/cars/${id}`,
          data);
        toastSuccess("Car Başarıyla Güncellendi.");
        setOpen(false);
        dispatch(fetchAllCarData());
      } catch (error) {
        console.error("Kayıt hatası:", error);

      };
    }
  }


  const formik = useFormik({
    initialValues: {
      kilometer: "",
      plate: "",
      year: "",
      dailyPrice: "",
      fuelType: "",
      gearType: "",
      vehicleType: "",
      seatType: "",
      colorId: "",
      modelId: "",
      isAvailable: ""





    },
    validationSchema: carValidationSchema,
    onSubmit: async (values, actions) => {

      const data = {
        kilometer: values.kilometer,
        plate: values.plate,
        year: values.year,
        dailyPrice: values.dailyPrice,
        fuelType: fuelType,
        gearType: gearType,
        vehicleType: vehicleType,
        seatType: seatType,
        modelId: modelId,
        colorId: colorId,
        isAvailable: "true"


      };

      try {
        await axiosInstance.post("api/v1/admin/cars", data);
        toastSuccess("Car Başarıyla Eklendi.");
        setOpen(false);
        dispatch(fetchAllCarData());
        formik.resetForm();
        console.log(data)
      } catch (error) {
        console.error("Kayıt hatası:", error.response.data);
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
          Cars
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            //setCarName("");
            setId(null);
            setOpen(true);
          }}
        >
          Add New
        </Button>
      </Box>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for car</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
      </Box>
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
                Car
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
                  textAlign: "center",
                }}
              >
                Actions
              </th>


            </tr>

          </thead>
          <tbody>
            {stableSort(items, getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ padding: "0px 12px" }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Typography level="body-xs">{row.modelId?.brandId?.name} | {row.modelId?.name}</Typography>
                </td>
                {/* <td style={{ textAlign: "center" }}>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        Paid: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.id]
                    }
                    color={
                      {
                        Paid: "success",
                        Refunded: "neutral",
                        Cancelled: "danger",
                      }[row.id]
                    }
                  >
                    {row.id}
                  </Chip>
                </td> */}
                {/* <td style={{ textAlign: "center" }}>
                  <div>
                    <Typography level="body-xs">{}</Typography>
                    <Typography level="body-xs">
                      {}
                    </Typography>
                  </div>
                </td> */}
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
                          setId(row.id);
                          //setCarName(row.name);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setId(row.id);
                          handleDelete(row.id);
                        }}
                        color="danger"
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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
              Add New car
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
                    <FormLabel>Kilometer</FormLabel>
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
                          // Update the brandName state when the input changes
                          setKilometer(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
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
                    <FormLabel>Plate</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="plate"
                        name="plate"
                        type="text"
                        value={formik.values.plate || plate}
                        className={
                          formik.errors.plate &&
                          formik.touched.plate &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setPlate(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.plate && formik.touched.plate
                            ? formik.errors.plate
                            : t("plate")
                        }
                        error={
                          formik.errors.plate && formik.touched.plate
                        }
                      />
                    </FormGroup>
                  </div>


                  <div>
                    <FormLabel>Year</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="year"
                        name="year"
                        type="text"
                        value={formik.values.year || year}
                        className={
                          formik.errors.year &&
                          formik.touched.year &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setYear(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.year && formik.touched.year
                            ? formik.errors.year
                            : t("year")
                        }
                        error={
                          formik.errors.year && formik.touched.year
                        }
                      />
                    </FormGroup>
                  </div>


                  <div>
                    <FormLabel>Daily Price</FormLabel>
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
                          // Update the brandName state when the input changes
                          setDailyPrice(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.dailyPrice && formik.touched.dailyPrice
                            ? formik.errors.dailyPrice
                            : t("dailyPrice")
                        }
                        error={
                          formik.errors.dailyPrice && formik.touched.dailyPrice
                        }
                      />
                    </FormGroup>
                  </div>

                  <div>
                    <FormLabel>Select Brand and Model</FormLabel>
                    <FormGroup className="">
                      <select
                        id="brand"
                        name="brandId"
                        value={brandId}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          setBrandId(e.target.value);
                          formik.setFieldValue("brandId", e.target.value);
                        }}
                        className={
                          formik.errors.brandId && formik.touched.brandId && "error"
                        }
                      >
                        <option value="">Select a brand</option>
                        {brands.map((brand) => {
                          const brandId = brand.id;
                          return (
                            <option key={brandId} value={brandId}>
                              {brand.name}
                            </option>
                          );
                        })}
                      </select>

                      <select
                        id="model"
                        name="modelId"
                        value={modelId}
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                          setModelId(e.target.value);
                          formik.setFieldValue("modelId", e.target.value);
                        }}
                        className={
                          formik.errors.modelId && formik.touched.modelId && "error"
                        }
                      >
                        <option value="">Select a model</option>
                        {models.map((model) => {
                          const modelId = model.id;
                          return (
                            <option key={modelId} value={modelId}>
                              {model.name}
                            </option>
                          );
                        })}
                      </select>
                    </FormGroup>
                  </div>


                  <div>
                    <FormLabel>Select Color and Availabelty</FormLabel>
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
                        {
                          colors.map((color) => {
                            const colorId = color.id;
                            return (
                              <option key={colorId} value={colorId}>
                                {color.name}
                              </option>
                            );
                          })
                        }

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
                    <FormLabel htmlFor="fuelType">Select Fuel Type and Gear Type</FormLabel>
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
                        className={formik.errors.fuelType && formik.touched.fuelType && "error"}
                      >
                        <option value="">Select fuel type...</option>
                        <option value="GASOLINE" key="1">Gasoline</option>
                        <option value="DIESEL" key="2">Diesel</option>
                        <option value="HYBRID" key="3">Hybrid</option>
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
                        <option value="">Select gear type...</option>
                        <option value="AUTOMATIC" key="1">Automatic</option>
                        <option value="MANUAL" key="2">Manual</option>
                      </select>

                    </FormGroup>
                  </div>






                  <div>
                    <FormLabel>Select Vehicle Type and Seat Type</FormLabel>
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
                        <option value="">Select vehicle type...</option>
                        <option value="SUV" key="1">Suv</option>
                        <option value="SEDAN" key="2">Sedan</option>
                        <option value="HB" key="3">Hatchback</option>
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
                        <option value="">Select seat type...</option>
                        <option value="TWO" key="1">2</option>
                        <option value="FIVE" key="2">5</option>
                        <option value="SEVEN" key="3">7</option>
                      </select>
                    </FormGroup>
                  </div>




                  {id ? (
                    <Button onClick={() => {
                      handleUpdate(id);
                    }} className=" form__btn">{t("update")}</Button>
                  ) : (
                    <Button
                      className=" form__btn"
                      type="submit"
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
      </Sheet>
      <CarList />
    </React.Fragment>
  );
}
