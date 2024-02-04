import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Divider, Grid, List, ListItem, Paper, Typography } from '@mui/material';

const Review = ({ steps, activeStep, setActiveStep }) => {
    const [totalDays, setTotalDays] = useState(1);
    const { t } = useTranslation();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const Extras = JSON.parse(localStorage.getItem("Extras"));
    const carData = JSON.parse(localStorage.getItem("carData"));
    const paymentFormData = JSON.parse(localStorage.getItem("PaymentFormData"));

    useEffect(() => {
        const startDate = new Date(userData.pickupDate);
        const endDate = new Date(userData.dropoffDate);
        setTotalDays(startDate.toDateString() === endDate.toDateString() ? 1 : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));
    }, [userData.pickupDate, userData.dropoffDate]);

    const numberWithStars = (number) => {
       
        if (number && typeof number === 'string') {
          const firstFour = number.slice(0, 4);
          const lastFour = number.slice(-4);
      
         
          const numAsterisks = Math.max(0, number.length - 8);
      
          
          const maskedMiddle = '*'.repeat(numAsterisks);
      
          
          const maskedNumber = firstFour + maskedMiddle + lastFour;
          
          return maskedNumber;
        } else {
        
          return '';
        }
        
      };
      const maskedNumber = numberWithStars(paymentFormData.number);

    return (
        <Container>
            <Grid container spacing={2}>
                {/* Left Column */}
                <Grid item xs={12} md={6} className='mt-4'>
                    <Paper elevation={3} className='preview-container'>
                        <Typography padding={"6px"} fontWeight="bold" variant="h6" gutterBottom>{t("Kişisel Bilgiler")}</Typography>
                        <hr />
                        <List>
                            <ListItem>
                                <Typography fontWeight="bold">Ad Soyad: <span style={{fontWeight:"normal"}}>{userData.firstname} {userData.lastname.toUpperCase()}</span></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography fontWeight="bold">E-Mail: <span style={{fontWeight:"normal"}}>{userData.email}</span></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography fontWeight="bold">Telefon: <span style={{fontWeight:"normal"}}>{userData.phoneNumber}</span></Typography>
                            </ListItem>
                        </List>
                        
                    </Paper>

                    <Paper elevation={3} className='preview-container mt-4'>
                    <Typography padding={"6px"} fontWeight="bold" variant="h6" gutterBottom>{t("Ödeme Bilgileri")}</Typography>
                        <hr />
                        {Extras ? (
                            <>
                                <List>
                                    <ListItem>
                                        <Typography fontWeight="bold" >Kart Numarası: <span style={{fontWeight:"normal"}}>{maskedNumber}</span></Typography>
                                    </ListItem>
                                    
                                    <ListItem>
                                        <Typography fontWeight="bold">Kart Sahibi: <span style={{fontWeight:"normal"}}>{paymentFormData.name.toUpperCase()}</span></Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography fontWeight="bold">CVV: <span style={{fontWeight:"normal"}}>***</span></Typography>
                                    </ListItem>

                                    <ListItem>
                                        <Typography fontWeight="bold">Son Kullanım Tarihi: <span style={{fontWeight:"normal"}}>{paymentFormData.expiry}</span></Typography>
                                    </ListItem>
                                </List>
                            </>
                        ) : (
                            <ListItem>
                            <Typography>Herhangi bir paket seçmediniz.</Typography>
                            </ListItem>
                        )}
                        
                    </Paper>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6} className='mt-4'>

                <Paper elevation={3} className='preview-container'>
                    <Typography padding={"6px"} fontWeight="bold" variant="h6" gutterBottom>{t("Ekstralar")}</Typography>
                        <hr />
                        {Extras ? (
                            <>
                                <List>
                                    <ListItem>
                                        <Typography fontWeight="bold" >Seçtiğiniz Paket: <span style={{fontWeight:"normal"}}>{Extras.header}</span></Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Typography fontWeight="bold">Paket Detayları:
                                            <List>
                                                {Extras.features.map((feature, index) => (
                                                    <ListItem key={index}>
                                                        <Typography>
                                                            <span style={{ marginRight: '8px' , fontWeight:"normal" }}>•</span> {feature}
                                                        </Typography>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Typography>
                                    </ListItem>
                                    
                                </List>
                                <div className='d-flex justify-content-between'>
                            <div>
                               <Typography fontWeight="bold"></Typography>
                            </div>
                            <div className='p-2'>
                               <Typography color={'green'} fontWeight="bold" fontSize={16}> Paket Tutarı: {Extras.price} ₺ </Typography>
                            </div>

                            </div>
                            </>
                        ) : (
                            <ListItem>
                            <Typography>Herhangi bir paket seçmediniz.</Typography>
                            </ListItem>
                        )}
                        
                    </Paper>

                    <Paper elevation={3} className='preview-container mt-4'>
                      
                        <List>
                            <Typography padding={"6px"} fontWeight="bold" variant="h6" gutterBottom>{t("Araç Detayları")}</Typography>
                            <hr />
                            <ListItem>
                                <Typography fontWeight="bold">Aracınız:  <span style={{fontWeight:"normal"}}>{carData.modelId.brandId.name} | {carData.modelId.name}</span></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography fontWeight="bold">Daily Price: <span style={{fontWeight:"normal"}}>{carData.dailyPrice}</span></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography fontWeight="bold">Kiralama Tarihleri: <span style={{fontWeight:"normal"}}>{userData.pickupDate} / {userData.dropoffDate} ({totalDays} gün)</span></Typography>
                            </ListItem>

                            <hr />

                            <div className='d-flex justify-content-between'>
                            <div>
                               <Typography fontWeight="bold"></Typography>
                            </div>
                            <div className='p-2'>
                               <Typography color={'green'} fontWeight="bold" fontSize={20}> Toplam Tutar: {(totalDays * carData.dailyPrice) + (Extras?.price || 0)} ₺ </Typography>
                            </div>

                            </div>

                          
                        </List>
                       
                    </Paper>
                </Grid>
            </Grid>

            <hr style={{ margin: "60px 0 30px" }} />


            <div style={{ margin: "60px 0 30px" }}>
                <Grid container justifyContent="space-between">
                    {activeStep !== steps.length - 1 && (
                        <Button
                            disabled={activeStep === 0}
                            color="secondary"
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            {t("previous")}
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveStep(activeStep + 1)} 
                    >
                        {t("Rent this car ")}
                    </Button>
                </Grid>
            </div>
        </Container>
    );
};

export default Review;
