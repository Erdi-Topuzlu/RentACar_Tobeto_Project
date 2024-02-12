import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import fetchByUserIdRental from '../../redux/actions/fetchByUserIdRental';
import Loading from '../../components/ui/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import { Paper } from "@mui/material";
import { Table } from 'react-bootstrap';
import { Button } from 'reactstrap';

const Rentals = () => {
  const dispatch = useDispatch();
  

  const { rentalDetails, status, error } = useSelector(state => state.rentalDetail);
  const { details } = useSelector((state) => state.userDetail);
  const [isActive,setIsActive] = useState()

  useEffect(() => {
    dispatch(fetchByUserIdRental(details.id))
  }, [dispatch]);

  console.log("kişisel rentals", rentalDetails)

  function formatToday() {
    // Bugünün tarihini temsil eden bir Date nesnesi oluşturun
    const today = new Date();
  
    // Gün, ay ve yıl bilgilerini alın
    const day = String(today.getDate()).padStart(2, '0'); // Günü alır ve gerekirse 0 ile başlar
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ayı alır (0 - 11 arasında) ve gerekirse 0 ile başlar
    const year = today.getFullYear(); // Yılı alır
  
    // Tarihi istenen formatta birleştirin (gg-aa-yyyy)
    const formattedToday = `${day}-${month}-${year}`;
  
    return formattedToday;
  }

  const bugununTarihi = formatToday();
  
  const handleClick = () => {
    console.log("teslim başarılı")
  }

  function tarihKarsilastir(endDate, today) {
    // Gelen tarihlerin string formatını Date nesnesine dönüştürüyoruz
    const [endGun, endAy, endYil] = endDate.split("-").map(Number);
    const [todayGun, todayAy, todayYil] = today.split("-").map(Number);

    // Tarihlerin gün, ay ve yıl olarak karşılaştırılması
    const esitMi =  (endYil > todayYil) ||
    (endYil === todayYil && endAy > todayAy) ||
    (endYil === todayYil && endAy === todayAy && endGun >= todayGun);

    return esitMi;
}



  


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


            <Accordion.Header><h5><span style={{ fontWeight: "bold" }}>{rental.carId.modelId.brandId.name} {rental.carId.modelId.name}</span></h5></Accordion.Header>
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
                    <th style={{ fontWeight: "bold", textAlign:"center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{rental.startDate} / {rental.endDate}</td>
                    <td>{details.name} {details.surname}</td>
                    <td>{rental.extraId.extraName}</td>
                    <td style={{ fontWeight: "bold" }}>{rental.totalPrice}₺</td>
                    <td style={{ fontWeight: "bold", textAlign:"center" }}>{tarihKarsilastir(bugununTarihi,rental.endDate) ? <Button onClick={handleClick} className='bg-success'>Aracı teslim et</Button> : <Button disabled={true} onClick={handleClick} className='bg-secondary'>Aracı teslim et</Button>}</td>
                  </tr>


                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>

        )) : <Paper>
          <h2 className='p-4 font-bold mt-4'>Geçmiş kiralama bilgisi bulunamadı!</h2>
        </Paper>
      }
    </Accordion>

  )

}

export default Rentals
