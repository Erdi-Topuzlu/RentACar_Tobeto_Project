import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import fetchByUserIdRental from '../../redux/actions/fetchByUserIdRental';
import Loading from '../../components/ui/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import { Paper } from "@mui/material";
import { Table } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { toastError, toastSuccess } from '../../service/ToastifyService';
import axiosInstance from '../../redux/utilities/interceptors/axiosInterceptors';
import { DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy';
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useTranslation } from 'react-i18next';









const Rentals = () => {
  const { rentalDetails, status, error } = useSelector(state => state.rentalDetail);
  const { details } = useSelector((state) => state.userDetail);


  const { t } = useTranslation();


  const dispatch = useDispatch();



  const [selectedRental, setSelectedRental] = useState(null);
  const [cancel, setCancel] = useState();
  const [finished, setFinished] = useState();
  const [openDelete, setOpenDelete] = useState(false);


  const formatToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const formatDate = (tarih) => {
    const [gun, ay, yil] = tarih.split('-');
    return `${yil}-${ay}-${gun}`;
  }

  const today = formatToday();



  useEffect(() => {
    dispatch(fetchByUserIdRental(details.id));
  }, [dispatch]);

  const handleSubmit = async () => {
    const updatedDataRental = {
      id: selectedRental.id,
      startDate: selectedRental?.startDate,
      endDate: selectedRental?.endDate,
      returnDate: today,
      isFinished: "true",
      endKilometer: null,
      carId: selectedRental.carId,
      userId: selectedRental.userId,
      extraId: selectedRental.extraId,
    };

    const updatedDataCar = {
      id: selectedRental.carId,
      kilometer: selectedRental.kilometer,
      plate: selectedRental.plate,
      year: selectedRental.year,
      dailyPrice: selectedRental.dailyPrice,
      fuelType: selectedRental.fuelType,
      gearType: selectedRental.gearType,
      vehicleType: selectedRental.vehicleType,
      seatType: selectedRental.seatType,
      isAvailable: "true",
      modelId: selectedRental.modelId,
      colorId: selectedRental.colorId,
    };

    console.log(updatedDataCar, updatedDataRental)

    try {
      await axiosInstance.put(`api/v1/users/rentals/${selectedRental.id}`, updatedDataRental);
      toastSuccess("Kiralama işlemi sonlandırıldı");

      await axiosInstance.put(`api/v1/admin/cars/${selectedRental.carId}`, updatedDataCar);
    } catch (error) {
      if (error.response.data.message === "VALIDATION.EXCEPTION") {
        toastError(JSON.stringify(error.response.data.validationErrors.startDate));
      } else if (error.response.data.type === "BUSINESS.EXCEPTION") {
        toastError(JSON.stringify(error.response.data.message));
      } else {
        toastError("Bilinmeyen hata");
      }
    } finally {
      dispatch(fetchByUserIdRental(details.id));
    }
  }

  const handleClick = (rental) => {
    if (rental.startDate && rental.endDate != "NaN-NaN-NaN") {
      const formattedRental = {
        id: rental?.id,
        startDate: formatDate(rental?.startDate),
        endDate: formatDate(rental?.endDate),
        carId: rental?.carId?.id,
        userId: rental?.userId?.id,
        extraId: rental?.extraId?.id,
        isFinished: rental?.isFinished,
        // car için
        isAvailable: rental?.carId?.isAvailable,
        kilometer: rental?.carId?.kilometer,
        plate: rental?.carId?.plate,
        year: rental?.carId?.year,
        dailyPrice: rental?.carId?.dailyPrice,
        fuelType: rental?.carId?.fuelType,
        gearType: rental?.carId?.gearType,
        vehicleType: rental?.carId?.vehicleType,
        seatType: rental?.carId?.seatType,
        colorId: rental?.carId?.colorId?.id,
        modelId: rental?.carId?.modelId?.id
      };
      setSelectedRental(formattedRental);
      setOpenDelete(true);

    } else {
      console.error("Invalid rental start or end date.");
    }
  };

  const handleConfirm = () => {
    handleSubmit();
    dispatch(fetchByUserIdRental(details.id));

  };

  if (status === "LOADING") {
    return <Loading />;
  }
  if (status === "FAIL") {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <Accordion defaultActiveKey="0">
      {rentalDetails.length > 0 ?
        [...rentalDetails].reverse().map((rental, i) => (
          <Accordion.Item key={i} eventKey={i}>
            <Accordion.Header>
              <h5><span style={{ fontWeight: "bold" }}>{rental.carId.modelId.brandId.name} {rental.carId.modelId.name}</span></h5>
            </Accordion.Header>
            <Accordion.Body>
              <h3>Details & Invoice</h3>
              <hr />
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{rental.returnDate ? t("StartDateReturnDate") : t("StartDateEndDate")}</th>
                    <th>Customer Full Name</th>
                    <th>Extras</th>
                    <th>Total Amount</th>
                    <th style={{ fontWeight: "bold", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{rental.startDate} / {rental.returnDate ? rental.returnDate : rental.endDate}</td>
                    <td>{details.name} {details.surname}</td>
                    <td>{rental.extraId.extraName}</td>
                    <td style={{ fontWeight: "bold" }}>
                      {rental?.returnDate && rental?.startDate && formatDate(rental.returnDate) < formatDate(rental.startDate) ? (
                        <span style={{ fontWeight: "normal", color: "red" }}>
                          {rental.returnDate} Tarihinde kiralamadan vazgeçildi, faturaya yansıyacak tutar: 0₺
                        </span>
                      ) : (
                        `${rental.totalPrice}₺`
                      )}
                    </td>
                    <td style={{ fontWeight: "bold", textAlign: "center" }}>
                      {today < formatDate(rental?.startDate) ?
                        <Button
                          onClick={() => {
                            setFinished(false)
                            setCancel(true)
                            handleClick(rental)
                          }
                          }
                          className='bg-primary'
                          disabled={rental?.isFinished}
                        >
                          {!rental.returnDate ? "Kiralamayı İptal Et" : "Kiralama iptal edildi"}

                        </Button> :

                        <Button
                          onClick={() => {
                            setCancel(false)
                            setFinished(true)
                            handleClick(rental)
                          }
                          }
                          className='bg-primary'
                          disabled={rental?.isFinished}
                        >
                         
                          {!rental.returnDate ? "Kiralamayı sonlandır" : "Kiralama sonlandırıldı" }
                        </Button>


                      }

                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        )) : <Paper>
          <h2 className='p-4 font-bold mt-4'>Geçmiş kiralama bilgisi bulunamadı!</h2>
        </Paper>
      }

      {/* Onay */}

      <Modal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
          setFinished(false)
          setCancel(false)
        }}
        sx={{
          zIndex: 11000,

        }}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {cancel ?
              t("cancelMessageTitle") :
              t("finishMessageTitle")
            }
          </DialogTitle>
          <Divider />
          <DialogContent>
            {
              cancel &&
              <p>{t("infoMessageCancel")}</p>
            }

            {finished &&
              <p>{t("infoMessageFinish")}</p>
            }

          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="success"
              onClick={() => {
                handleConfirm();
                setOpenDelete(false);
              }}
            >
              {t("submit")}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() =>
                setOpenDelete(false)}
            >
              {t("cancel")}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Accordion>

  );
};


export default Rentals;
