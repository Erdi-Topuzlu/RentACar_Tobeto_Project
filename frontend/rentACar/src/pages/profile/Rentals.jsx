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

const Rentals = () => {
  const dispatch = useDispatch();

  const { rentalDetails, status, error } = useSelector(state => state.rentalDetail);
  const { details } = useSelector((state) => state.userDetail);

  const [selectedRental, setSelectedRental] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);


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
      setShowConfirmation(true);
      //console.log(selectedRental)
    } else {
      console.error("Invalid rental start or end date.");
    }
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    handleSubmit();
    // window.location.reload();
    dispatch(fetchByUserIdRental(details.id));

  };

 

  const handleCancel = () => {
    setShowConfirmation(false);
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
                    <th>Start Date / End Date</th>
                    <th>Customer Full Name</th>
                    <th>Extras</th>
                    <th>Total Amount</th>
                    <th style={{ fontWeight: "bold", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{rental.startDate} / {rental.endDate}</td>
                    <td>{details.name} {details.surname}</td>
                    <td>{rental.extraId.extraName}</td>
                    <td style={{ fontWeight: "bold" }}>{rental.totalPrice == 0 ? <span style={{ fontWeight: "normal",color:"red" }}>Kiralama iptal edildi</span> : rental.totalPrice + "₺" }</td>
                    <td style={{ fontWeight: "bold", textAlign: "center" }}>
                      <Button
                        onClick={() => handleClick(rental)}
                        className='bg-primary'
                        disabled={rental?.isFinished}
                      >
                      {today < formatDate(rental?.startDate) ? "Kiralama'yı İptal Et" : "Kiralama'yı Sonlandır"}
                      </Button>
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
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="message">Kiralamayı sonlandırmak istediğinize emin misiniz?</div>
          <div className="actions">
            <Button onClick={handleConfirm} className="btn-confirm">Onayla</Button>
            <Button onClick={handleCancel} className="btn-cancel">Vazgeç</Button>
          </div>
        </div>
      )}
    </Accordion>
  );
};

export default Rentals;
