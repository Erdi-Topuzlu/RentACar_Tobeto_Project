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
import BrandList from "./BrandList";
import { DialogActions, DialogContent, DialogTitle, Grid, ModalDialog } from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import getBrandValidationSchema from "../../../../schemes/brandScheme";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import fetchAllBrandData from "../../../../redux/actions/admin/fetchAllBrandData";
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

export default function BrandTable() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);
  const [brandName, setBrandName] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { brands, status, error} = useSelector((state) => state.brandAllData);
  const [openDelete, setOpenDelete] = React.useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllBrandData());
  }, [dispatch]);

  const brandValidationSchema = getBrandValidationSchema();

  const handleDelete = async (id) => {
    if (!id) {
      setOpen(false)
      toastError(t("notFoundBrandId"));
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/brands/${id}`);
        toastSuccess(t("brandSuccessDelete"));
        dispatch(fetchAllBrandData());
      } catch (error) {
        setOpen(false)


        toastError(t("connectedDataDelete"))
        dispatch(fetchAllBrandData())

      }
    }
  };

  const handleUpdate = async (id) => {
    if (!brandName){
      setOpen(false);
      toastError(t("schemeBrandName"));
    } else {
      const data = {
        id: id,
        name: brandName,
      };

      try {
        await axiosInstance.put(`api/v1/admin/brands/${id}`, data);
        toastSuccess(t("brandSuccessUpdate"));
        setOpen(false);
        dispatch(fetchAllBrandData());
      } catch (error) {
        setOpen(false);
        if(error.response.data.message === "VALIDATION.EXCEPTION" ){
          toastError(JSON.stringify(error.response.data.validationErrors.name));
          dispatch(fetchAllBrandData)
        }else if(error.response.data.type === "BUSINESS.EXCEPTION"){
          toastError(JSON.stringify(error.response.data.message))
          dispatch(fetchAllBrandData)
        }else{
          toastError(t("unknownError"))
          dispatch(fetchAllBrandData());
        }
    }}
  };

  const formik = useFormik({
    initialValues: {
      brandName: "",
    },
    validationSchema: brandValidationSchema,
    onSubmit: async (values, actions) => {
      const data = {
        name: values.brandName,
      };
      try {
        await axiosInstance.post("api/v1/admin/brands", data);
        toastSuccess(t("brandSuccessAdded"));
        setOpen(false);
        dispatch(fetchAllBrandData());
        formik.resetForm();
      } catch (error) {
        setOpen(false);
        if(error.response.data.message === "VALIDATION.EXCEPTION" ){
          toastError(JSON.stringify(error.response.data.validationErrors.name));
          dispatch(fetchAllBrandData)
        }else if(error.response.data.type === "BUSINESS.EXCEPTION"){
          toastError(JSON.stringify(error.response.data.message))
          dispatch(fetchAllBrandData)
        }else{
          toastError(t("unknownError"))
          dispatch(fetchAllBrandData());
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
        {t("brands").toUpperCase()}
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            setBrandName("");
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
                {t("brandName")}
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
            {stableSort(brands, getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ padding: "0px 12px" }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Typography level="body-xs">{row.name}</Typography>
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
                          setBrandName(row.name);
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
                          setBrandName(row.name);
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
                isEdit ? t("updateBrand"): t("addNewBrand")
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
                    <FormLabel>{t("brandName")}</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="brandName"
                        name="brandName"
                        type="text"
                        value={formik.values.brandName || brandName}
                        className={
                          formik.errors.brandName &&
                          formik.touched.brandName &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setBrandName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.brandName && formik.touched.brandName
                            ? formik.errors.brandName
                            : t("brandName")
                        }
                        error={
                          formik.errors.brandName && formik.touched.brandName
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
            setBrandName(null);
            setOpenDelete(false);
          }}
        sx={{
          zIndex:11000,
        }}
        >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {t("confirmation")}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <p style={{fontWeight:"bold"}}>{brandName}</p>{t("deleteMessage")}
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
      <BrandList />
    </React.Fragment>
  );
}
