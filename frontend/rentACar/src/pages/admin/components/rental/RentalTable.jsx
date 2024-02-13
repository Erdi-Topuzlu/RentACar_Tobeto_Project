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
// import getRentalValidationSchema from "../../../../schemes//rentalScheme";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import RentalList from "./RentalList";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import fetchAllUserData from "../../../../redux/actions/admin/fetchAllUserData";
import getRentalValidationSchema from "../../../../schemes/rentalScheme";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import fetchCarDetailData from "../../../../redux/actions/fetchCarDetailData";
import fetchAllRental from "../../../../redux/actions/fetchAllRentals";
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
export default function RentalTable() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [returnDate, setReturnDate] = React.useState();
  const [carId, setCarId] = React.useState();
  const [updCarId, setUpdCarId] = React.useState();
  const [userId, setUserId] = React.useState();
  const [extraId, setExtraId] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const [carDetails, setCarDetails] = React.useState();
  const [dateInputType, setDateInputType] = React.useState("text");
  const { rentals,status,error } = useSelector((state) => state.allRentals);
  const { items } = useSelector((state) => state.carAllData);
  const { details } = useSelector((state) => state.carDetail);
  const { users } = useSelector((state) => state.userAllData);
  const [openDelete, setOpenDelete] = React.useState(false);

  const activateDateInput = () => {
    setDateInputType("date");
  };

  const deactivateDateInput = () => {
    setDateInputType("text");
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllRental());
    dispatch(fetchAllCarData());
    dispatch(fetchAllUserData());
  }, [dispatch]);

  const rentalValidationSchema = getRentalValidationSchema();

  const handleDelete = async (id) => {
    if (!id) {
      toastError("Rental ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/users/rentals/${id}`);
        toastSuccess("Rental Başarıyla Silindi.");
        dispatch(fetchAllRental());

      } catch (error) {
        setOpen(false)
        toastError("Önce bağlı veriler silinmeli!")
        dispatch(fetchAllRental());

      }
    }
  };

  const handleUpdate = async (id) => {
    if (!startDate) {
      setOpen(false);
      toastError("Start date alanı boş bırakılamaz!");
    } else {
      const updatedData = {
        id: id,
        startDate: startDate,
        endDate: endDate,
        returnDate: returnDate,
        endKilometer: null,
        carId: carId,
        userId: userId,
        extraId: extraId,
      };

      try {
        await axiosInstance.put(`api/v1/users/rentals/${id}`, updatedData);
        toastSuccess("Rental Başarıyla Güncellendi.");
        setOpen(false);
        dispatch(fetchAllRental());
      }catch (error) {
        setOpen(false);
        if(error.response.data.message === "VALIDATION.EXCEPTION" ){
          toastError(JSON.stringify(error.response.data.validationErrors.startDate))
          dispatch(fetchAllRental());
        }else if(error.response.data.type === "BUSINESS.EXCEPTION"){
          toastError(JSON.stringify(error.response.data.message))
          dispatch(fetchAllRental());
        }else{
          toastError("Bilinmeyen hata")
          dispatch(fetchAllRental());
        }
    }
    }
  };

  const formik = useFormik({
    initialValues: {
      startDate: startDate || "",
      endDate: endDate || "",
      returnDate: returnDate ||"",
      carId: carId || "",
      userId: userId || "",
      extraId: extraId || "",
    },

    
    validationSchema: rentalValidationSchema,
    onSubmit: async (values, actions) => {
      const data = {
        startDate: values.startDate,
        endDate: values.endDate,
        returnDate: null,
        isFinished: "false",
        carId: carId,
        userId: userId,
        extraId: extraId,
      };

      try {
        alert(startDate);
        await axiosInstance.post("api/v1/users/rentals", data);
        toastSuccess("Rental Başarıyla Eklendi.");
        setOpen(false);
        dispatch(fetchAllRental());
        formik.resetForm();
      }catch (error) {
        setOpen(false);
        if(error.response.data.message === "VALIDATION.EXCEPTION" ){
          toastError(JSON.stringify(error.response.data.validationErrors.startDate))
          dispatch(fetchAllRental());
        }else if(error.response.data.type === "BUSINESS.EXCEPTION"){
          toastError(JSON.stringify(error.response.data.message))
          dispatch(fetchAllRental());
        }else{
          toastError("Bilinmeyen hata")
          dispatch(fetchAllRental());
        }

      }
    },
  });

  // if (status === "LOADING") {
  //   return <Loading />;
  // } else if (status === "FAIL") {
  //   return <ErrorPage errorMessage={error} />;
  // }


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
          {t("rentals")}
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            //setCarName("");
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
      >{status === "LOADING" ? (
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
                {t("startDate")} / {t("endDate")}
              </th>

              <th
                style={{
                  width: "auto",
                  padding: "12px 6px",
                  textAlign: "center",
                }}
              >
                {t("rentalOwner")}
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
                {t("totalPrice")}
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
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(rentals, getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ padding: "0px 12px" }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Typography level="body-xs">
                    {row.startDate} /{" "}
                    {row.returnDate ? row.returnDate : row.endDate}
                  </Typography>
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
                {
                  /* <td style={{ textAlign: "center" }}>
                  <div>
                    <Typography level="body-xs">{}</Typography>
                    <Typography level="body-xs">
                      {}
                    </Typography>
                  </div>
                </td> */
                  <td style={{ textAlign: "center" }}>
                    <Chip color="primary" variant="solid">
                      {row.userId?.name} {row.userId?.surname}
                    </Chip>
                  </td>
                }

                <td style={{ textAlign: "center" }}>
                  <Typography level="body-xs">
                  {row.carId?.modelId?.brandId?.name} &bull; {row.carId?.modelId?.name}
                  </Typography>
                </td>

                <td style={{ textAlign: "center" }}>
                  <Chip color="success" variant="solid">
                    {row.totalPrice} ₺
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
                          setStartDate(row?.startDate);
                          setEndDate(row?.endDate);
                          setReturnDate(row?.returnDate)
                          setCarId(row?.carId?.id);
                          setExtraId(row.extraId.id);
                          setUserId(row.userId.id);
                          setOpen(true);
                          setIsEdit(true);
                        }}
                      >
                        {t("edit")}
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setId(row.id);
                          setUserId(row.userId?.name);
                          setCarId(
                            row.carId?.modelId?.brandId?.name +
                              "|" +
                              row.carId?.modelId?.name
                          );
                          setOpenDelete(true);
                          setUpdCarId(row.carId?.id)
                          setCarDetails(row.carId)
                         
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
            setCarId(null);
            setUserId(null);
            setStartDate(null);
            setEndDate(null);
            setReturnDate(null);
            setExtraId(null);
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
              {isEdit ? t("updateRental") : t("addRental")}
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
                    <FormLabel>{t("startDate")}</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="startDate"
                        name="startDate"
                        value={formik.values.startDate || startDate}
                        className={
                          formik.errors.startDate &&
                          formik.touched.startDate &&
                          "error form-control"
                        }
                        onChange={(e) => {
                          formik.handleChange(e);
                          setStartDate(e.target.value);
                        }}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          deactivateDateInput();
                        }}
                        onFocus={activateDateInput}
                        type={dateInputType}
                        error={
                          formik.errors.startDate && formik.touched.startDate
                        }
                        placeholder={
                          formik.errors.startDate && formik.touched.startDate
                            ? formik.errors.startDate
                            : t("startDate")
                        }
                      />
                    </FormGroup>
                  </div>
                  <div>
                    <FormLabel>{t("endDate")}</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="endDate"
                        name="endDate"
                        value={formik.values.endDate || endDate}
                        className={
                          formik.errors.endDate &&
                          formik.touched.endDate &&
                          "error form-control"
                        }
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          formik.handleChange(e);
                        }}
                        onBlur={(e) => {
                          formik.handleBlur(e);
                          deactivateDateInput();
                        }}
                        onFocus={activateDateInput}
                        type={dateInputType}
                        error={formik.errors.endDate && formik.touched.endDate}
                        placeholder={
                          formik.errors.endDate && formik.touched.endDate
                            ? formik.errors.endDate
                            : t("endDate")
                        }
                      />
                    </FormGroup>
                  </div>
                  {isEdit && (
                    <div>
                      <FormLabel>{t("returnDate")}</FormLabel>
                      <FormGroup className="">
                        <Input
                          id="returnDate"
                          name="returnDate"
                          value={formik.values.returnDate || returnDate}
                          className={
                            formik.errors.endDate &&
                            formik.touched.endDate &&
                            "error form-control"
                          }
                          onChange={(e) => {
                            setReturnDate(e.target.value);
                            formik.handleChange(e);
                          }}
                          onBlur={(e) => {
                            formik.handleBlur(e);
                            deactivateDateInput();
                          }}
                          onFocus={activateDateInput}
                          type={dateInputType}
                          error={
                            formik.errors.endDate && formik.touched.endDate
                          }
                          placeholder={
                            formik.errors.endDate && formik.touched.endDate
                              ? formik.errors.endDate
                              : t("returnDate")
                          }
                        />
                      </FormGroup>
                    </div>
                  )}

                  <div>
                    {/* <FormLabel>Select a Car</FormLabel> */}
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
                        {items
                          .filter((item) => item.isAvailable === true)
                          .map((car, index) => (
                            <option key={car.id} value={car.id}>
                              {car.modelId?.brandId?.name} - {car.modelId?.name}
                            </option>
                          ))}
                      </select>
                      
                    </FormGroup>
                  </div>
                  <div>
                    {/* <FormLabel>Select a User</FormLabel> */}
                    <FormGroup className="">
                      <select
                        id="user"
                        name="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
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
                        <option value="">{t("selectUser")}</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}{" "}{user.surname}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </div>

                  <div>
                    {/* <FormLabel htmlFor="fuelType">Select a Extra</FormLabel> */}
                    <FormGroup className="">
                      <select
                        id="extra"
                        name="extraId"
                        value={formik.values.extraId || extraId}
                        onChange={(e) => {
                          setExtraId(e.target.value);
                          formik.handleChange(e);
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
                        size="sm"
                        placeholder="Filter by status"
                        slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
                        onBlur={formik.handleBlur}
                        className={
                          formik.errors.extraId &&
                          formik.touched.extraId &&
                          "error"
                        }
                      >
                        <option value="">{t("selectExtra")}</option>
                        <option value="1" key="1">
                          Mini Package - 200.00₺
                        </option>
                        <option value="2" key="2">
                          Medium Package - 350.00₺
                        </option>
                        <option value="3" key="3">
                          Free Package - 0₺
                        </option>
                      </select>
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
        <Modal
          open={openDelete}
          onClose={() => {
            setId(null);
            setUserId(null);
            setCarId(null);
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
              <p style={{ fontWeight: "bold" }}>
                {userId} - {carId}{" "}
              </p>
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
      <RentalList />
    </React.Fragment>
  );
}
