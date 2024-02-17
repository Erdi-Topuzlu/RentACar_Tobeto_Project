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
  Avatar,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ModalDialog,
} from "@mui/joy";
import { Form, FormGroup, List } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Loading from "../../../../components/ui/Loading";
import fetchAllUserData from "../../../../redux/actions/admin/fetchAllUserData";

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

export default function UserList() {
  const [isEdit, setIsEdit] = React.useState();
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userSurname, setUserSurname] = React.useState("");
  const [userTcNo, setUserTcNo] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userIsEnabled, setUserIsEnabled] = React.useState("");
  const [userBirthDate, setUserBirthDate] = React.useState("");
  const [userPhotoUrl, setUserPhotoUrl] = React.useState("");
  const [userRole, setUserRole] = React.useState("");
  const [curentRole, setCurentRole] = React.useState("");
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { users } = useSelector((state) => state.userAllData);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllUserData());
  }, [dispatch]);


  const handleDelete = async (id) => {
    if (!id) {
      toastError(t("userIdNotFound"));
    } else {
      try {
        await axiosInstance.delete(`api/v1/users/${userId}`);
        toastSuccess(t("userIdNotFound"));
        dispatch(fetchAllUserData());
      } catch (error) {
        setOpen(false)
        toastError(t("connectedDataDelete"))
        dispatch(fetchAllUserData());
      }
    }
  };

  const handleUpdate = async (id) => {

    const updatedData = {
      id: userId,
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      role: userRole,
      tcNo: userTcNo,
      birthDate: userBirthDate,
      userPhotoUrl: userPhotoUrl,
      isEnabled: userIsEnabled,
    };

    try {
      await axiosInstance.patch(
        `api/v1/users/${id}`,
        updatedData
      );
      toastSuccess(t("usersSuccessUpdate"));
      setOpen(false);
      dispatch(fetchAllUserData());
    } catch (error) {
      setOpen(false);
      if (error.response.data.message === "VALIDATION.EXCEPTION") {
        toastError(JSON.stringify(error.response.data.validationErrors.name));
        dispatch(fetchAllUserData());
      } else if (error.response.data.type === "BUSINESS.EXCEPTION") {
        toastError(JSON.stringify(error.response.data.message))
        dispatch(fetchAllUserData());
      } else {
        toastError(t("unknownError"))
        dispatch(fetchAllUserData());
      }
    }
  }


  const formik = useFormik({
    initialValues: {
      role: "",

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
              {t("userName")}
            </th>
            <th
              style={{
                width: "auto",
                padding: "12px 6px",
                textAlign: "center",
              }}
            >
              {t("email")}
            </th>
            <th
              style={{
                width: "auto",
                padding: "12px 6px",
                textAlign: "center",
              }}
            >
              {t("status")}
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
      </Table>
      {status === "LOADING" ? (
        <Loading />
      ) : (stableSort(users, getComparator(order, "id")).map((item) => (
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
                  {item.name}{item.surname}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {item.email}
                </Typography>
                <Typography level="body-xs">
                  {item.isEnabled ? (
                    <React.Fragment>
                      <span style={{ marginLeft: "8px", marginBottom: "4px" }}>
                        <img title={t("verifiedAccount")} src="/src/assets/icons/verified.svg" />
                      </span>
                      {t("verifiedAccount")}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span style={{ marginLeft: "8px", marginBottom: "4px" }}>
                        <img title={t("verifyAccound")} src="/src/assets/icons/not-verified.svg" />
                      </span>
                      {t("unverifiedAccount")}
                    </React.Fragment>
                  )}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                >

                </Box>
              </div>
            </ListItemContent>

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
                      setUserId(item?.id);
                      setUserName(item.name);
                      setUserSurname(item.surname);
                      setUserTcNo(item.tcNo);
                      setUserEmail(item.email);
                      setUserPassword(item.password);
                      setUserIsEnabled(item.isEnabled);
                      setUserBirthDate(item.birthDate);
                      setUserPhotoUrl(item.userPhotoUrl);
                      setCurentRole(item.role);
                      setOpen(true);
                      setIsEdit(true);
                    }}
                  >
                    {t("editRole")}
                  </MenuItem>

                </Menu>
              </Dropdown>
            </Box>
          </ListItem>
          <ListDivider />
        </List>
      )))}
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => {
          formik.resetForm();
          setUserId(null);
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

            {isEdit && t("updateUserRole")}

          </Typography>
          <hr />
          <Grid
            textAlign={"center"}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid xs={12}>
            <FormLabel className={"align-items-center d-flex justify-content-center mb-4"}>{curentRole === "ADMIN" ? ("currentRoleAdmin") : ("currentRoleUser")}</FormLabel>
              <Form onSubmit={formik.handleSubmit}>
                <div>
                  <FormGroup>
                    <select
                      id="role"
                      name="role"
                      type="text"
                      value={formik.values.role || userRole}
                      className={
                        formik.errors.role &&
                        formik.touched.role &&
                        "error"
                      }
                      onChange={(e) => {
                        setUserRole(e.target.value);
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
                      onBlur={formik.handleBlur}
                    >
                      <option disabled={true} value="">{t("selectRole")}</option>
                      <option value="USER" key="1">
                        {t("user")}
                      </option>
                      <option value="ADMIN" key="2">
                        {t("admin")}
                      </option>

                    </select>
                  </FormGroup>

                </div>
                <Button
                  onClick={() => {
                    handleUpdate(userId)
                  }}
                  className=" form__btn"
                  style={{ backgroundColor: "#673ab7", color: "white" }}
                >
                  {t("update")}
                </Button>

              </Form>
            </Grid>
          </Grid>
        </Sheet>
      </Modal>
      <Modal open={openDelete}
        onClose={() => {
          setUserId(null);
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
            <p style={{ fontWeight: "bold" }}>{ }</p>{t("deleteMessage")}
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => {
              handleDelete(userId);
              setOpenDelete(false)
            }}>
              {t("delete")}
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpenDelete(false)}>
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
