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
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Table,
} from "@mui/joy";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useFormik } from "formik";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { Form, FormGroup, Input } from "reactstrap";
import fetchAllRentals from "../../../../redux/actions/fetchAllRentals";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import fetchAllUserData from "../../../../redux/actions/admin/fetchAllUserData";
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

export default function RentalList() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [returnDate, setReturnDate] = React.useState();
  const [carId, setCarId] = React.useState();
  const [userId, setUserId] = React.useState();
  const [extraId, setExtraId] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const [dateInputType, setDateInputType] = React.useState("text");
  const { rentals, status, error } = useSelector((state) => state.allRentals);
  const { items } = useSelector((state) => state.carAllData);
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
    dispatch(fetchAllRentals());
    dispatch(fetchAllCarData());
    dispatch(fetchAllUserData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!id) {
      toastError(t("rentalIdNotFound"));
    } else {
      try {
        await axiosInstance.delete(`api/v1/users/rentals/${id}`);
        toastSuccess(t("rentalSuccessDelete"));
        dispatch(fetchAllRentals());
      }catch (error) {
        setOpen(false);
        if(error.response.data.type === "SQL" ){
          toastError(JSON.stringify(error.response.data.message));
        }else{
        toastError(t("unknownError"));
        }
    }
    }
  };

  const handleUpdate = async (id) => {
    if (!startDate) {
      setOpen(false);
      toastError(t("schemeStartDate"));
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
        toastSuccess(t("rentalSuccessUpdate"));
        setOpen(false);
        dispatch(fetchAllRentals());
      } catch (error) {
        setOpen(false);
        if (error.response.data.message === "VALIDATION.EXCEPTION") {
          toastError(
            JSON.stringify(error.response.data.validationErrors.startDate)
          );
          dispatch(fetchAllRentals());
        } else if (error.response.data.type === "BUSINESS.EXCEPTION") {
          toastError(JSON.stringify(error.response.data.message));
          dispatch(fetchAllRentals());
        } else {
          toastError(t("unknownError"));
          dispatch(fetchAllRentals());
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      startDate: startDate || "",
      endDate: endDate || "",
      returnDate: returnDate || "",
      carId: carId || "",
      userId: userId || "",
      extraId: extraId || "",
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
              {t("rentalOwner")}
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
        stableSort(rentals, getComparator(order, "id")).map((item) => (
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
                    <Chip color="primary" variant="solid">
                      {item.userId?.name} {item.userId?.surname}
                    </Chip>
                  </Typography>
                  <Typography fontWeight={600} gutterBottom>
                    {item.startDate} /{" "}
                    {item.returnDate ? item.returnDate : item.endDate}
                  </Typography>

                  <Typography level="body-xs" gutterBottom>
                    {item.carId?.modelId?.brandId?.name} &bull;{" "}
                    {item.carId?.modelId?.name}
                  </Typography>
                  <Typography level="body-xs">
                    <Chip color="success" variant="solid">
                      {item.carId?.dailyPrice} ₺
                    </Chip>
                  </Typography>
                </div>
              </ListItemContent>
              
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
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
                        setId(item?.id);
                        setStartDate(item?.startDate);
                        setEndDate(item?.endDate);
                        setReturnDate(item?.returnDate);
                        setCarId(item?.carId?.id);
                        setExtraId(item.extraId.id);
                        setUserId(item.userId.id);
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
                        setUserId(item.userId?.name);
                        setCarId(
                          item.carId?.modelId?.brandId?.name +
                            "|" +
                            item.carId?.modelId?.name
                        );
                        setOpenDelete(true);
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
        ))
      )}
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
                <FormLabel>Start Date</FormLabel>
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
                    error={formik.errors.startDate && formik.touched.startDate}
                    placeholder={
                      formik.errors.startDate && formik.touched.startDate
                        ? formik.errors.startDate
                        : t("startDate")
                    }
                  />
                </FormGroup>

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

                {isEdit && (
                  <>
                    <FormLabel>{t("returnDate")}</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="returnDate"
                        name="returnDate"
                        value={formik.values.returnDate || returnDate}
                        className={
                          formik.errors.returnDate &&
                          formik.touched.returnDate &&
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
                          formik.errors.returnDate && formik.touched.returnDate
                        }
                        placeholder={
                          formik.errors.returnDate && formik.touched.returnDate
                            ? formik.errors.returnDate
                            : t("returnDate")
                        }
                      />
                    </FormGroup>
                  </>
                )}

                {/* <FormLabel>Select a Car</FormLabel> */}
                <FormGroup className="">
                  <select
                    id="car"
                    name="carId"
                    value={carId}
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
                        {user.name}
                        {user.surname}
                      </option>
                    ))}
                  </select>
                </FormGroup>

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
                    placeholder={t("filterStatus")}
                    slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.extraId && formik.touched.extraId && "error"
                    }
                  >
                    <option value="">{t("selectExtra")}</option>
                    <option value="1" key="1">
                      {t("miniPackage")} - 200.00₺
                    </option>
                    <option value="2" key="2">
                      {t("mediumPackage")} - 350.00₺
                    </option>
                    <option value="3" key="3">
                      {t("freePackage")} - 0₺
                    </option>
                  </select>
                </FormGroup>

                {id ? (
                  <Button
                    onClick={() => {
                      handleUpdate(id);
                    }}
                    className=" form__btn"
                  >
                    {t("update")}
                  </Button>
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
    </Box>
  );
}
