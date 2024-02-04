import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap'
import "../../../../styles/review.css"

const Review = ({ steps, activeStep, setActiveStep }) => {

    const [totalDays,setTotalDays] = useState(1)

    const { t } = useTranslation();

    const userData = JSON.parse(localStorage.getItem("userData"))
    const Extras = JSON.parse(localStorage.getItem("Extras"))
    const PaymentFormData = JSON.parse(localStorage.getItem("PaymentFormData"))
    const carData = JSON.parse(localStorage.getItem("carData"))

    useEffect(() => {
        const startDate = new Date(userData.pickupDate);
        const endDate = new Date(userData.dropoffDate);

        // Tarihler aynıysa totalDays 1 olarak ayarlanır, değilse fark hesaplanır
        setTotalDays(startDate.toDateString() === endDate.toDateString() ? 1 : Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));

    }, [userData.pickupDate, userData.dropoffDate]);
    
    

  

    return (
        <div>

            <>
                <Container>
                    <Row>
                        {/* Left Column */}
                        <Col md="6" className='mt-4'>
                           
                           

                            <div className='preview-container'>
                                <p>Kişisel Bilgiler</p>
                                <hr  />

                                <ul>
                                    <li>
                                        <label>Ad Soyad: <span>{userData.firstname} {userData.lastname}</span></label>
                                       
                                    </li>
                                    <li>
                                        <label>E-Mail: <span>{userData.email}</span></label>
                                       
                                    </li>
                                    <li>
                                        <label>Telefon: <span>{userData.phoneNumber}</span></label>
                                        
                                    </li>
                                    
                                </ul>
                                <p>Ekstralar</p>
                                <hr  />

                                <ul>

                                    <li>
                                        <label>Seçtiğiniz Paket: <span>{Extras.header}</span></label>  
                                    </li>
                                    <li>
                                        <label>Paket Detayı:</label>
                                        <ul>
                                        <li>{Extras.features[0]}</li>
                                        <li>{Extras.features[1]}</li>
                                        <li>{Extras.features[2]}</li>
                                        <li>{Extras.features[3]}</li>
                                        </ul>
                                       
                                    </li>
                                    <li>
                                        <label>Paket Tutarı: <span>{Extras.price} ₺</span></label>
                                        
                                    </li>
                                    
                                </ul>

                            </div>

                        </Col>

                        {/* Right Column */}
                        <Col md="6" className='mt-4'>
                        <div className='preview-container'>
                                <ul>
                                    <li>
                                        <label>Aracınız:  <span>{carData.modelId.brandId.name} | {carData.modelId.name}</span></label>
                                       
                                    </li>
                                    
                                    <li>
                                        <label>Daily Price: <span>{carData.dailyPrice}</span> </label>
                                       
                                    </li>
                                    
                                    <li>
                                        <label>Kiralama Tarihleri:</label>
                                        <span> <span>{userData.pickupDate} / {userData.dropoffDate}</span></span>
                                    </li>
                                    <li>
                                        <label>Toplam Kiralama Tutarı:</label>
                                        <span>{totalDays} Gün için : {(totalDays*carData.dailyPrice)+Extras.price} ₺</span>
                                    </li>
                                </ul>

                            </div>
                        </Col>
                    </Row>
                    <hr style={{ margin: "60px 0 30px" }} />

                </Container>
            </>



            <FormGroup>
                <div className="d-flex align-items-center justify-content-between">
                    {activeStep !== steps.length - 2 && (
                        <Button
                            disabled={activeStep === 0}
                            color="secondary"
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            {t("previous")}
                        </Button>
                    )}
                    {
                        <div className="d-flex justify-content-end">
                            <Button
                                type="submit"
                                className="form__btn"

                            >

                                {t("Submit rent")}
                            </Button>
                        </div>
                    }
                </div>
            </FormGroup>

        </div>





    )
}

export default Review