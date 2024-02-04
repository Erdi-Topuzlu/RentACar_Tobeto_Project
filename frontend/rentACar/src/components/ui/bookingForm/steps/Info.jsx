import React from 'react'
import { ReactSVG } from "react-svg";
import { Paper, Container } from '@mui/material';
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom";


const Info = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Paper elevation={3} className='mt-4'>
                <div className='d-flex align-items-center text-center justify-content-center'>
                    <span className='mt-2'><ReactSVG src="/src/assets/icons/rent-check.svg" /></span>
                    <h3 className='ml-4 mt-4'>Kiralama İşleminiz Başarıyla Tamamlanmıştır</h3>
                </div>
                <div className='d-flex justify-content-center'>
                    <Button onClick={()=>navigate("/profile")} className='mb-4  form__btn'>Kiralamalarım</Button>
                </div>
            </Paper>
        </Container>


    )
}

export default Info