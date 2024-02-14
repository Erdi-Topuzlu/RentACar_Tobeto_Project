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
import fetchAllColorData from "../../../../redux/actions/admin/fetchAllColorData";
import fetchAllCarData from "../../../../redux/actions/fetchAllCarData";
import fetchAllModelData from "../../../../redux/actions/admin/fetchAllModelData";
import fetchAllBrandData from "../../../../redux/actions/admin/fetchAllBrandData";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Loading from "../../../../components/ui/Loading";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

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

export default function CarImagesList() {
  const [id, setId] = React.useState();
  const [isChecked, setIsChecked] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [kilometer, setKilometer] = React.useState();
  const [plate, setPlate] = React.useState();
  const [year, setYear] = React.useState();
  const [dailyPrice, setDailyPrice] = React.useState();
  const [fuelType, setFuelType] = React.useState();
  const [gearType, setGearType] = React.useState();
  const [vehicleType, setVehicleType] = React.useState("");
  const [seatType, setSeatType] = React.useState("");
  const [colorId, setColorId] = React.useState("");
  const [modelId, setModelId] = React.useState("");
  const [brandId, setBrandId] = React.useState("");
  const [carName, setCarName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [order, setOrder] = React.useState("");
  const { items, status, error } = useSelector((state) => state.carAllData);
  const { colors } = useSelector((state) => state.colorAllData);
  const { models } = useSelector((state) => state.modelAllData);
  const { brands } = useSelector((state) => state.brandAllData);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [deletedFiles, setDeletedFiles] = React.useState([]);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchAllCarData());
  }, [dispatch]);

  const handleDelete = async () => {
    if (!deletedFiles || deletedFiles.length === 0) {
      setOpen(false);
      toastError("Images ID'ler bulunamadı!");
    } else {
      try {
        for (const fileId of deletedFiles) {
          await axiosInstance.delete(`api/v1/admin/car-images/${fileId}`);
        }
        toastSuccess("Car Images Başarıyla Silindi.");
        dispatch(fetchAllCarData());
        setId(null);
      } catch (error) {
        setOpen(false);
        alert(JSON.stringify(error.response.data));
        toastError("Bilinmeyen Hata", error.response.data);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      carId: "",
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
              {t("cars")} & {t("images")}
            </th>
            <th
              style={{
                width: "80px",
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
        stableSort(items, getComparator(order, "id")).map((item) => (
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
                <div>
                  {!item || !item.carImages || item.carImages.length === 0 ? (
                    <>
                      {[...Array(3)].map((_, index) => (
                        <img
                          key={index + 2}
                          style={{
                            height: "100px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src="https://placehold.co/600x400?text=Empty"
                        />
                      ))}
                    </>
                  ) : (
                    item.carImages
                      .map((img, index) => (
                        <img
                          key={index}
                          style={{
                            height: "100px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          src={img.imgPath}
                          alt={`Car Image ${index + 1}`}
                        />
                      ))
                      .concat(
                        [...Array(Math.max(0, 3 - item.carImages.length))].map(
                          (_, index) => (
                            <img
                              key={index + 1}
                              style={{
                                height: "100px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                              src="https://placehold.co/600x400?text=Empty"
                              alt={`Placeholder ${
                                item.carImages.length + index + 1
                              }`}
                            />
                          )
                        )
                      )
                  )}
                </div>
                <List
                  style={{
                    padding: "6px 60px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontWeight={600} gutterBottom>
                      {item?.modelId?.brandId?.name}
                    </Typography>
                    <Typography fontWeight={600} gutterBottom>
                      {item?.modelId?.name}
                    </Typography>
                  </div>
                </List>
              </ListItemContent>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <IconButton
                  onClick={() => {
                    if (item.carImages && item.carImages.length > 0) {
                      const imagesToDelete = item.carImages.map(
                        (img) => img.id
                      );
                      setDeletedFiles(imagesToDelete);
                    }
                    setOpenDelete(true);
                  }}
                  disabled={item.carImages && item.carImages.length === 0}
                  variant="plain"
                >
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Box>
            </ListItem>
            <ListDivider />
          </List>
        ))
      )}

      <Modal
        open={openDelete}
        onClose={() => {
          setId(null);
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
          <DialogContent>{t("deleteMessage")}</DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                handleDelete();
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
