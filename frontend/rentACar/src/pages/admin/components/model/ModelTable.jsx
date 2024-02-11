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
import { Grid } from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import getModelValidationSchema from "../../../../schemes/modelScheme";
import { toastSuccess } from "../../../../service/ToastifyService";
import { useDispatch, useSelector } from "react-redux";
import fetchAllModelData from "../../../../redux/actions/admin/fetchAllModelData";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import ModelList from "./ModelList";
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

export default function ModelTable() {
  const [id, setId] = React.useState();
  const [isEdit, setIsEdit] = React.useState();
  const [name, setName] = React.useState();
  const [brandId, setBrandId] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { models } = useSelector((state) => state.modelAllData);
  const { brands } = useSelector((state) => state.brandAllData);


  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllModelData());
    dispatch(fetchAllBrandData());
  }, [dispatch]);

  const modelValidationSchema = getModelValidationSchema();

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
    validationSchema: modelValidationSchema,
    onSubmit: async (values, actions) => {
      const data = {
        name: values.modelName,
        brandId:brandId,
      };

      try {
        alert(JSON.stringify(data));
        await axiosInstance.post("api/v1/admin/models/add", data);
        toastSuccess("Model Başarıyla Eklendi.");
        setOpen(false);
        dispatch(fetchAllModelData());
        formik.resetForm();
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
        {t("models").toUpperCase()}
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            //setName("")
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
                {t("modelName")}
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
              {/*
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
           
            {stableSort(models, getComparator(order, "id")).map((row) => (
              <tr key={row.id}>
                <td style={{ padding: "0px 12px" }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Typography level="body-xs">{row.name}</Typography>
                </td>
                 <td style={{ textAlign: "center" }}>
                 <Typography level="body-xs">{row.brandId?.name}</Typography>
                </td> 
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
                          setIsEdit(true);

                        }}
                      >
                        {t("edit")}
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setId(row.id);
                          handleDelete(row.id);
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
                    
                      {/* <FormLabel>{t("selectBrand")}</FormLabel> */}
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
                          appearance: 'none',
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          padding: '7px',
                          fontSize: '16px',
                          border: '1px solid #ccc',
                          borderRadius: '10px',
                          width: '50%',
                        }}
                      >
                        <option value="">{t("selectBrand")}</option>
                        {brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
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
      </Sheet>
      <ModelList/>
    </React.Fragment>
  );
}