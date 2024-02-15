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
import fetchAllContactData from "../../../../redux/actions/admin/fetchAllContactData";
import { Button, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, Modal, ModalClose, ModalDialog, Sheet, Table } from "@mui/joy";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
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

export default function ContactList() {
    const [id, setId] = React.useState();
    const [isEdit, setIsEdit] = React.useState(false);
    const [contactName, setContactName] = React.useState();
    const [contactMail, setContactMail] = React.useState();
    const [contactMessage, setContactMessage] = React.useState();
    const [order, setOrder] = React.useState("desc");
    const [open, setOpen] = React.useState(false);
    const { contacts, status, error } = useSelector((state) => state.contactAllData);
    const [openDelete, setOpenDelete] = React.useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();


    React.useEffect(() => {
        dispatch(fetchAllContactData());
        console.log(contacts)
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (!id) {
            setOpen(false)
            toastError(t("notFoundContactId"));
        } else {
            try {
                await axiosInstance.delete(`api/v1/admin/contacts/${id}`);
                toastSuccess(t("contactSuccessDelete"));
                dispatch(fetchAllContactData());
            } catch (error) {
                setOpen(false)


                toastError(t("connectedDataDelete"))
                dispatch(fetchAllContactData())

            }
        }
    };


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
                            {t("Sender")}
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
            ) : (stableSort(contacts, getComparator(order, "id")).map((item) => (
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
                                    {item.name}
                                </Typography>
                                {/* <Typography level="body-xs" gutterBottom>
                  {item.customer.email}
                </Typography> */}
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
                                        root: { variant: "plain", color: "neutral", size: "sm" },
                                    }}
                                >
                                    <MoreHorizRoundedIcon />
                                </MenuButton>
                                <Menu size="sm" sx={{ minWidth: 140 }}>
                                    <MenuItem
                                        onClick={() => {
                                            setId(item.id);
                                            setContactName(item.name);
                                            setContactMessage(item.messages);
                                            setContactMail(item.email);
                                            setOpen(true);
                                            setIsEdit(true);
                                        }}
                                    >
                                        {t("See More")}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem
                                        onClick={() => {
                                            setId(item.id);
                                            setContactName(item.name);
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
            )))}
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
                        {
                            isEdit ? t("Details") : t("addNewBrand")
                        }
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
                                    <FormLabel>Contact Owner</FormLabel>
                                    {contactName}
                                </div>

                                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                                    <FormLabel>Sender</FormLabel>
                                    {contactMail}
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ overflow: 'auto', maxHeight: '200px' }}>
                                    <FormLabel>Message</FormLabel>
                                    {contactMessage}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Sheet>
            </Modal>
            <Modal open={openDelete}
                onClose={() => {
                    setId(null);
                    setContactName(null);
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
                        <p style={{ fontWeight: "bold" }}>{contactName}</p>{t("deleteMessage")}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={() => {
                            handleDelete(id);
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
