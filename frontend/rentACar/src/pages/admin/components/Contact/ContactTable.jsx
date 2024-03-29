import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
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
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ModalDialog,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/ui/Loading";
import ContactList from "./ContactList";
import fetchAllContactData from "../../../../redux/actions/admin/fetchAllContactData";

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

export default function ContactTable() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);
  const [contactName, setContactName] = React.useState();
  const [contactMail, setContactMail] = React.useState();
  const [contactMessage, setContactMessage] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { contacts, status, error } = useSelector(
    (state) => state.contactAllData
  );
  const [openDelete, setOpenDelete] = React.useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllContactData());
  }, [dispatch]);

  // const brandValidationSchema = getBrandValidationSchema();

  const handleDelete = async (id) => {
    if (!id) {
      setOpen(false);
      setContactName("");
      toastError(t("notFoundContactId"));
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/contacts/${id}`);
        toastSuccess(t("contactSuccessDeleted"));
        dispatch(fetchAllContactData());
      } catch (error) {
        setOpen(false);
        toastError(t("unknownError"));
      }
    }
  };

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
          {t("contact").toUpperCase()}
        </Typography>
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
                  {t("sender")}
                </th>
                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("messages")}
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
              {stableSort(contacts, getComparator(order, "id")).map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: "0px 12px" }}>
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {row.email}
                      </span>
                    </Typography>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {row.messages.length > 10
                          ? `${row.messages.slice(0, 10)}...`
                          : row.messages}
                      </span>
                    </Typography>
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
                            setId(row.id);
                            setContactName(row.name);
                            setContactMessage(row.messages);
                            setContactMail(row.email);
                            setOpen(true);
                            setIsEdit(true);
                          }}
                        >
                          {t("seeMore")}
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={() => {
                            setId(row.id);
                            setContactName(row.name);
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
              {isEdit ? t("details") : t("addNewContact")}
            </Typography>
            <hr />
            <Grid
              textAlign={"center"}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={12}>
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <FormLabel>{t("contactOwner")}</FormLabel>
                    {contactName}
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <FormLabel>{t("sender")}</FormLabel>
                    {contactMail}
                  </div>
                  <div
                    className="d-flex flex-column justify-content-center align-items-center text-center"
                    style={{ flexWrap: "nowrap" }}
                  >
                    <FormLabel>{t("messages")}</FormLabel>
                    <div style={{ whiteSpace: "pre-line", wordWrap: "break-word", overflow:"auto", maxWidth:"300px" }}>
                      {contactMessage}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Sheet>
        </Modal>
        <Modal
          open={openDelete}
          onClose={() => {
            setId(null);
            setContactName(null);
            setContactMessage(null);
            setContactMail(null);
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
              <p style={{ fontWeight: "bold" }}>{contactName}</p>
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
      <ContactList />
    </React.Fragment>
  );
}
