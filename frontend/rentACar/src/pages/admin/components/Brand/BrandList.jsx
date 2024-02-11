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
import fetchAllBrandData from "../../../../redux/actions/admin/fetchAllBrandData";
import { Button, FormLabel, Grid, Modal, ModalClose, Sheet, Table } from "@mui/joy";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useFormik } from "formik";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import { Form, FormGroup, Input } from "reactstrap";
import getBrandValidationSchema from "../../../../schemes/brandScheme";
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

export default function BrandList() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);
  const [brandName, setBrandName] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { brands } = useSelector((state) => state.brandAllData);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const brandValidationSchema = getBrandValidationSchema();

  React.useEffect(() => {
    dispatch(fetchAllBrandData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!id) {
      toastError("Brand ID bulunamadı!");
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/brands/${id}`);
        toastSuccess("Brand Başarıyla Silindi.");
        dispatch(fetchAllBrandData());
      } catch (error) {
        console.error("Kayıt hatası:", error);
      }
    }
  };

  const handleUpdate = async (id) => {
    if (!brandName) {
      setOpen(false);
      toastError("Brand Name alanı boş bırakılamaz!");
    } else {
      const data = {
        id: id,
        name: brandName,
      };

      try {
        await axiosInstance.put(`api/v1/admin/brands/${id}`, data);
        toastSuccess("Brand Başarıyla Güncellendi.");
        setOpen(false);
        dispatch(fetchAllBrandData());
      } catch (error) {
        console.log(id);
        console.error("Kayıt hatası:", error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      brandName: "",
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
              {t("brandName")}
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

      {stableSort(brands, getComparator(order, "id")).map((item) => (
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
                      formik.resetForm();
                      setId(item.id);
                      setBrandName(item.name);
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
                      handleDelete(item.id);
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
