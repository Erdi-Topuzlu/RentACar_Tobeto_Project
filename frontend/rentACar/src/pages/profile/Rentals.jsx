import React, { useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import fetchByUserIdRental from '../../redux/actions/fetchByUserIdRental';
import Loading from '../../components/ui/Loading';
import ErrorPage from '../../components/ui/ErrorPage';
import { Paper } from "@mui/material";
import { Table } from 'react-bootstrap';

const Rentals = () => {
  const dispatch = useDispatch();

const { rentalDetails, status, error } = useSelector(state => state.rentalDetail); 
const { details} = useSelector((state) => state.userDetail);

console.log(details)

useEffect(() => {  
 dispatch(fetchByUserIdRental(details.id))
}, [dispatch]);

console.log("kişisel rentals",rentalDetails)

if (status === "LOADING") {
 return <Loading />;
}
if (status === "FAIL") {
 return <ErrorPage errorMessage={error} />;
}
  return (
    <Accordion defaultActiveKey="0">
       {rentalDetails.length > 0 ? 
   [...rentalDetails].reverse().map((rental, i)=>(
  
  <Accordion.Item key={i} eventKey={i}> 



      
       
        <Accordion.Header><h5><span style={{fontWeight:"bold"}}>{rental.carId.modelId.brandId.name} {rental.carId.modelId.name}</span></h5></Accordion.Header>
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{rental.startDate} / {rental.endDate}</td>
          <td>{details.name} {details.surname}</td>
          <td>{rental.extraId.extraName}</td>
          <td style={{fontWeight:"bold"}}>{rental.totalPrice}₺</td>
        </tr>
        
        
      </tbody>
    </Table>
        </Accordion.Body>
      </Accordion.Item>
      
      )): <Paper>
      <h2 className='p-4 font-bold mt-4'>Geçmiş kiralama bilgisi bulunamadı!</h2>
       </Paper>
       }
       </Accordion>
    
  )
  
}

export default Rentals
