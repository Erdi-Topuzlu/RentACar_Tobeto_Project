import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
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
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Grid } from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import getModelValidationSchema from "../../../../schemes/modelScheme";
import { toastSuccess } from "../../../../service/ToastifyService";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import ModelList from "./ModelList";


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
  const [carName, setCarName] = React.useState();
  const [order, setOrder] = React.useState("desc");
  const [open, setOpen] = React.useState(false);
  const { items, status, error } = useSelector((state) => state.carAllData);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllCarData());
  }, [dispatch]);

  const modelValidationSchema = getModelValidationSchema();

  const handleDelete = async (id) => {
    if(!id){
      toastError("Color ID bulunamadı!");
    }else{
      try {
        await axiosInstance.delete(`api/v1/cars/${id}`);
        toastSuccess("Car Başarıyla Silindi.");
        dispatch(fetchAllCarData());
      } catch (error) {
          alert(error)
        console.error("Kayıt hatası:", error);
      }
    }   
  };

  const handleUpdate = async (id) => {
   if(!carName){
    setOpen(false);
    toastError("Car name alanı boş bırakılamaz!");
   }else{

    const data = {
      id:id,
      name: carName,
    };

    try {
      await axiosInstance.put(`api/v1/cars/${id}`,
      data);
      toastSuccess("Car Başarıyla Güncellendi.");
      setOpen(false);
      dispatch(fetchAllCarData());
    } catch (error) {
      console.error("Kayıt hatası:" ,error);
    
  };
   } 
}


  const formik = useFormik({
    initialValues: {
        carName: "",
    },
    validationSchema: modelValidationSchema,
    onSubmit: async (values, actions) => {
      const data = {
        name: values.carName,
      };
      
      try {
        await axiosInstance.post("api/v1/cars", data);
        toastSuccess("Car Başarıyla Eklendi.");
        setOpen(false);
        dispatch(fetchAllCarData());
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
          Colors
        </Typography>
        <Button
          color="success"
          size="md"
          onClick={() => {
            formik.resetForm();
            setCarName("");
            setId(null);
            setOpen(true);
          }}
        >
          Add New
        </Button>
      </Box>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for color</FormLabel>
          <Input
            size="sm"
            placeholder="Search"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
      </Box>
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
                Color Name
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {stableSort(items, getComparator(order, "id")).map((row) => (
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
                          setId(row.id);
                          setCarName(row.name);
                          setOpen(true);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setId(row.id);
                          handleDelete(row.id);
                        }}
                        color="danger"
                      >
                        Delete
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
              Add New color
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
                    <FormLabel>Color Name</FormLabel>
                    <FormGroup className="">
                      <Input
                        id="colorName"
                        name="colorName"
                        type="text"
                        value={formik.values.carName || carName}
                        className={
                          formik.errors.carName &&
                          formik.touched.carName &&
                          "error"
                        }
                        onChange={(e) => {
                          // Update the brandName state when the input changes
                          setCarName(e.target.value);
                          formik.handleChange(e); // Invoke Formik's handleChange as well
                        }}
                        onBlur={formik.handleBlur}
                        placeholder={
                          formik.errors.carName && formik.touched.carName
                            ? formik.errors.carName
                            : t("carName")
                        }
                        error={
                          formik.errors.carName && formik.touched.carName
                        }
                      />
                    </FormGroup>
                  </div>
                  {id ? (
                    <Button onClick={()=>{
                      handleUpdate(id);
                    }} className=" form__btn">{t("update")}</Button>
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
      </Sheet>
      <ModelList/>
    </React.Fragment>
  );
}
