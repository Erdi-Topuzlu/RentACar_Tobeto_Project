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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ModalDialog,
  SvgIcon,
  styled,
} from "@mui/joy";
import { Form, FormGroup } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { toastError, toastSuccess } from "../../../../service/ToastifyService";
import axiosInstance from "../../../../redux/utilities/interceptors/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import fetchAllCampaignsData from "../../../../redux/actions/admin/fetchAllCampaignsData";
import Loading from "../../../../components/ui/Loading";
import CampaignsList from "./CampaignsList";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Editor } from "@tinymce/tinymce-react";
import fetchUserData from "../../../../redux/actions/fetchUserData";

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
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { campaigns, status, error } = useSelector(
    (state) => state.campaignsAllData
  );
  const { details } = useSelector((state) => state.userDetail);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [eventFile, setEventFile] = React.useState(null);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  React.useEffect(() => {
    dispatch(fetchAllCampaignsData());
    dispatch(fetchUserData());
  }, [dispatch]);

  //const brandValidationSchema = getBrandValidationSchema();

  function sanitizeHtml(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const sanitizedDescription = sanitizeHtml();

  const handleDelete = async (id) => {
    if (!id) {
      setOpen(false);
      toastError(t("notFoundCampaignsId"));
    } else {
      try {
        await axiosInstance.delete(`api/v1/admin/campaigns/${id}`);
        toastSuccess(t("campaignsSuccessDelete"));
        dispatch(fetchAllCampaignsData());
      } catch (error) {
        setOpen(false);

        toastError(t("connectedDataDelete"));
        dispatch(fetchAllCampaignsData());
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
      setOpen(false);
      const file = eventFile;
      const campaign = {
        title: values.campaignsTitle,
        description: campaignsDescription,
        userId: userId,
      };
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append(
        "request",
        new Blob([JSON.stringify(campaign)], {
          type: "application/json",
        })
      );

      const { access_token } = localStorage.getItem("access_token");

      const headers = {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      };

      if (file) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          try {
            const response = await axiosInstance.post(
              "api/v1/admin/campaigns",
              formData,
              {
                headers: headers,
              }
            );

            if (response.status === 200) {
              toastSuccess("Uploaded Photo");
              dispatch(fetchAllCampaignsData());
            } else {
              toastError("Bilinmeyen hata");
              dispatch(fetchAllCampaignsData());
            }
          } catch (error) {
            toastError("Bilinmeyen hata", error.response.data);
          }
        };

        reader.readAsDataURL(file);
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
            setUserId(details.id);
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

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("campaignsDescription")}
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("campaignPhoto")}
                </th>

                <th
                  style={{
                    width: "auto",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  {t("author")}
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
              {stableSort(campaigns, getComparator(order, "id")).map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: "0px 12px" }}>
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {row.title}
                      </span>
                    </Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {sanitizeHtml(row?.description).length > 20
                          ? sanitizeHtml(row?.description).substr(0, 20)
                          : sanitizeHtml(row?.description)}
                      </span>
                    </Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <img
                      style={{
                        height: "150px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={row.imgPath}
                    />
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Typography level="body-xs">
                      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {row.userId.name + " " + row.userId.surname}
                      </span>
                    </Typography>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <IconButton
                      onClick={() => {
                        setId(row.id);
                        setOpenDelete(true);
                      }}
                      variant="plain"
                    >
                      <DeleteOutlineRoundedIcon />
                    </IconButton>
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
              width: 800,
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
              {t("addNewCampaigns")}
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
                        formik.errors.campaignsTitle &&
                        formik.touched.campaignsTitle
                          ? formik.errors.campaignsTitle
                          : t("campaignsTitle")
                      }
                      error={
                        formik.errors.campaignsTitle &&
                        formik.touched.campaignsTitle
                      }
                    />
                  </FormGroup>

                  <FormLabel>{t("campaignsDescription")}</FormLabel>
                  <FormGroup className="">
                    <Editor
                      id="campaignsDescription"
                      name="campaignsDescription"
                      apiKey="j2v42dbp6jifrp59u3yguj7h8brwzlq62mmzoolmk5p0gz78"
                      className={
                        formik.errors.campaignsDescription &&
                        formik.touched.campaignsDescription &&
                        "error"
                      }
                      onEditorChange={(content, editor) => {
                        setCampaignsDescription(content);
                        formik.handleChange({
                          target: {
                            name: "campaignsDescription",
                            value: content,
                          },
                        });
                      }}
                      onBlur={formik.handleBlur}
                      placeholder={
                        formik.errors.campaignsDescription &&
                        formik.touched.campaignsDescription
                          ? formik.errors.campaignsDescription
                          : t("campaignsDescription")
                      }
                      init={{
                        selector: "textarea#basic-example",
                        height: 500,
                        menubar: false,

                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button
                      component="label"
                      role={undefined}
                      tabIndex={-1}
                      variant="outlined"
                      color="neutral"
                      startDecorator={
                        <SvgIcon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            />
                          </svg>
                        </SvgIcon>
                      }
                    >
                      {t("uploadCampaignPhoto")}
                      <VisuallyHiddenInput
                        onChange={(e) => {
                          setEventFile(e.target.files[0]);
                        }}
                        type="file"
                        accept="image/*"
                        id="image-upload"
                      />
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    {!eventFile ? (
                      ""
                    ) : (
                      <>
                        {t("toBeUploadImg")}{" "}
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          {eventFile.name}
                        </span>
                      </>
                    )}
                  </FormGroup>

                  <Button
                    className=" form__btn"
                    type="submit"
                    style={{ backgroundColor: "#673ab7", color: "white" }}
                    disabled={formik.isSubmitting}
                  >
                    {t("add")}
                  </Button>
                </Form>
              </Grid>
            </Grid>
          </Sheet>
        </Modal>
        <Modal
          open={openDelete}
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
      <CampaignsList />
    </React.Fragment>
  );
}
