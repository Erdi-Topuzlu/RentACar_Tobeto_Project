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
import { Button, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, Modal, ModalClose, ModalDialog, Sheet, Table } from "@mui/joy";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useFormik } from "formik";
import { toastSuccess } from "../../../../service/ToastifyService";
import { Form, FormGroup, Input } from "reactstrap";
import fetchAllModelData from "../../../../redux/actions/admin/fetchAllModelData";
import fetchAllBrandData from "../../../../redux/actions/admin/fetchAllBrandData";
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

export default function CarList() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState();
  const [name, setName] = React.useState();
  const [brandId, setBrandId] = React.useState();  
  const [brandName, setBrandName] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { models, status, error } = useSelector((state) => state.modelAllData);
  const { brands } = useSelector((state) => state.brandAllData);
  const [openDelete, setOpenDelete] = React.useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();


  React.useEffect(() => {
    dispatch(fetchAllModelData());
    dispatch(fetchAllBrandData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!id) {
      toastError("Model ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/models/${id}`);
        toastSuccess("Model Başarıyla Silindi.");
        dispatch(fetchAllModelData());
      } catch (error) {
        alert(error)
        console.error("Kayıt hatası:", error);
      }
    }
  };

  const handleUpdate = async (id) => {
    if (!name) {
      setOpen(false);
      toastError("Model name alanı boş bırakılamaz!");
    } else {

      alert(id)


      const updatedData = {
        id: id,
        name: name,
        brandId: brandId,
      };

      try {
        await axiosInstance.put(`api/v1/admin/models/${id}`,
          updatedData);
        toastSuccess("Model Başarıyla Güncellendi.");
        setOpen(false);
        dispatch(fetchAllModelData());
      } catch (error) {
        console.error("Kayıt hatası:", error);

      };
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      brandId: "",
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
              {t("modelName")}
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
      {status === "LOADING" ? (
          <Loading />
        ) : (stableSort(models, getComparator(order, "id")).map((item) => (
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
                  {/* <Typography level="body-xs">{item.date}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{item.id}</Typography> */}
                </Box>
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
                          setName(item.name);
                          setBrandId(item.brandId?.id);
                          setBrandName(item.brandId?.name);
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
                        setName(item.name);
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
                isEdit ? t("updateModel") : t("addNewModel")
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
                    <FormLabel>{t("modelName")}</FormLabel>
                    <div>
                    <FormGroup className="">
                      <Input
                        id="modelName"
                        name="modelName"
                        type="text"
                        value={formik.values.name || name}
                        className={
                          formik.errors.name &&
                          formik.touched.name &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.name && formik.touched.name
                            ? formik.errors.name
                            : t("modelName")
                        }
                        error={
                          formik.errors.name && formik.touched.name
                        }
                      />
                    </FormGroup>
                    
                      <FormLabel>{t("selectBrand")}</FormLabel>
                      <FormGroup className="">
                      <select
                        id="brandId"
                        name="brandId"
                        value={brandId}
                        onChange={(e) => {
                          const selectedBrandId = e.target.value;
                          setBrandId(selectedBrandId);
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
                         {isEdit ? (
                          // Render the single option in edit mode
                          <option key={brandId} value={brandId}>
                            {brandName}
                          </option>
                        ) : (
                          // Render the options for non-edit mode
                          <>
                            <option value="">{t("selectBrand")}</option>
                            {brands.map((brand) => (
                              <option key={brand.id} value={brand.id}>
                                {brand.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </FormGroup>

                    </div>
                    
                  {id ? (
                    <Button onClick={() => {
                      handleUpdate(id);
                    }} className=" form__btn"
                    style={{ backgroundColor: "#673ab7", color: "white" }}
                    >{t("update")}</Button>
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
        <Modal open={openDelete}
        onClose={() => {
            setId(null);
            setName(null);
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
            <p style={{fontWeight:"bold"}}>{name}</p>{t("deleteMessage")}
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
