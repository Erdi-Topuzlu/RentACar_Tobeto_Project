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
import { DialogActions, DialogContent, DialogTitle, Grid, ModalDialog } from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCampaignsData from "../../../../redux/actions/admin/fetchAllCampaignsData";
import Loading from "../../../../components/ui/Loading";
import CampaignsList from "./CampaignsList";

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

export default function CampaignsTable() {
    const [id, setId] = React.useState();
    const [isEdit, setIsEdit] = React.useState(false);
    const [campaignsDescription, setCampaignsDescription] = React.useState();
    const [campaignsTitle, setCampaignsTitle] = React.useState();
    const [order, setOrder] = React.useState("desc");
    const [open, setOpen] = React.useState(false);
    const { campaigns, status, error } = useSelector((state) => state.campaignsAllData);
    const [openDelete, setOpenDelete] = React.useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    React.useEffect(() => {
        dispatch(fetchAllCampaignsData());
    }, [dispatch]);

    //const brandValidationSchema = getBrandValidationSchema();

    const handleDelete = async (id) => {
        if (!id) {
            setOpen(false)
            toastError(t("notFoundCampaignsId"));
        } else {
            try {
                await axiosInstance.delete(`api/v1/admin/campaigns/${id}`);
                toastSuccess(t("campaignsSuccessDelete"));
                dispatch(fetchAllCampaignsData());
            } catch (error) {
                setOpen(false)


                toastError(t("connectedDataDelete"))
                dispatch(fetchAllCampaignsData())

            }
        }
    };

    const handleUpdate = async (id) => {
        if (!campaignsDescription) {
            setOpen(false);
            toastError(t("schemeCampaignsDescription"));
        } else {
            const data = {
                id: id,
                title: campaignsTitle,
                description: campaignsDescription,
                imgPath:null
            };

            try {
                await axiosInstance.put(`api/v1/admin/campaigns/${id}`, data);
                toastSuccess(t("campaignsSuccessUpdate"));
                setOpen(false);
                dispatch(fetchAllCampaignsData());
            } catch (error) {
                setOpen(false);
                if (error.response.data.message === "VALIDATION.EXCEPTION") {
                    toastError(JSON.stringify(error.response.data.validationErrors.name));
                    dispatch(fetchAllCampaignsData)
                } else if (error.response.data.type === "BUSINESS.EXCEPTION") {
                    toastError(JSON.stringify(error.response.data.message))
                    dispatch(fetchAllCampaignsData)
                } else {
                    toastError(t("unknownError"))
                    dispatch(fetchAllCampaignsData());
                }
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            campaignsDescription: "",
            campaignsTitle: "",
        },
        //validationSchema: brandValidationSchema,
        onSubmit: async (values, actions) => {
            const data = {
                description: values.campaignsDescription,
                title: values.campaignsTitle,
                imgPath:null

            };
            try {
                await axiosInstance.post("api/v1/admin/campaigns", data);
                toastSuccess(t("campaignsSuccessAdded"));
                setOpen(false);
                dispatch(fetchAllCampaignsData());
                formik.resetForm();
            } catch (error) {
                setOpen(false);
                if (error.response.data.message === "VALIDATION.EXCEPTION") {
                    toastError(JSON.stringify(error.response.data.validationErrors.name));
                    dispatch(fetchAllCampaignsData)
                } else if (error.response.data.type === "BUSINESS.EXCEPTION") {
                    toastError(JSON.stringify(error.response.data.message))
                    dispatch(fetchAllCampaignsData)
                } else {
                    toastError(t("unknownError"))
                    dispatch(fetchAllCampaignsData());
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
                    {t("campaigns").toUpperCase()}
                </Typography>
                <Button
                    color="success"
                    size="md"
                    onClick={() => {
                        formik.resetForm();
                        setCampaignsDescription("");
                        setCampaignsTitle("");
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
                                    {t("campaignsTitle")}
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
                            {stableSort(campaigns, getComparator(order, "id")).map((row) => (
                                <tr key={row.id}>
                                    <td style={{ padding: "0px 12px" }}>
                                        <Typography level="body-xs">{row.id}</Typography>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Typography level="body-xs"><span style={{ fontWeight: "bold", fontSize: "16px" }}>{row.title}</span></Typography>
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
                                                        formik.resetForm();
                                                        setId(row.id);
                                                        setCampaignsDescription(row.description);
                                                        setCampaignsTitle(row.title);
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
                                                        setCampaignsDescription(row.title);
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
                                isEdit ? t("updateCampaigns") : t("addNewCampaigns")
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
                                <Form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <FormLabel>{t("campaignsTitle")}</FormLabel>
                                        <FormGroup className="">
                                            <Input
                                                id="campaignsTitle"
                                                name="campaignsTitle"
                                                type="text"
                                                value={formik.values.campaignsTitle || campaignsTitle}
                                                className={
                                                    formik.errors.campaignsTitle &&
                                                    formik.touched.campaignsTitle &&
                                                    "error"
                                                }
                                                onChange={(e) => {
                                                    // Update the brandName state when the input changes
                                                    setCampaignsTitle(e.target.value);
                                                    formik.handleChange(e); // Invoke Formik's handleChange as well
                                                }}
                                                onBlur={formik.handleBlur}
                                                placeholder={
                                                    formik.errors.campaignsTitle && formik.touched.campaignsTitle
                                                        ? formik.errors.campaignsTitle
                                                        : t("campaignsTitle")
                                                }
                                                error={
                                                    formik.errors.campaignsTitle && formik.touched.campaignsTitle
                                                }
                                            />
                                        </FormGroup>
                                    </div>
                                    <div>
                                        <FormLabel>{t("campaignsDescription")}</FormLabel>
                                        <FormGroup className="">
                                            <Input
                                                id="campaignsDescription"
                                                name="campaignsDescription"
                                                type="text"
                                                value={formik.values.campaignsDescription || campaignsDescription}
                                                className={
                                                    formik.errors.campaignsDescription &&
                                                    formik.touched.campaignsDescription &&
                                                    "error"
                                                }
                                                onChange={(e) => {
                                                    // Update the brandName state when the input changes
                                                    setCampaignsDescription(e.target.value);
                                                    formik.handleChange(e); // Invoke Formik's handleChange as well
                                                }}
                                                onBlur={formik.handleBlur}
                                                placeholder={
                                                    formik.errors.campaignsDescription && formik.touched.campaignsDescription
                                                        ? formik.errors.campaignsDescription
                                                        : t("campaignsDescription")
                                                }
                                                error={
                                                    formik.errors.campaignsDescription && formik.touched.campaignsDescription
                                                }
                                            />
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
                <Modal open={openDelete}
                    onClose={() => {
                        setId(null);
                        setCampaignsDescription(null);
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
                            <p style={{ fontWeight: "bold" }}>{campaignsDescription}</p>{t("deleteMessage")}
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
            </Sheet>
            <CampaignsList />
        </React.Fragment>
    );
}
