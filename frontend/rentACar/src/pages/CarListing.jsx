import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import CarItem from "../components/ui/CarItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCarData } from "../redux/slices/carDataSlice";
import Loading from "../components/ui/Loading";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import ErrorPage from "../components/ui/ErrorPage";

const CarListing = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status, error } = useSelector((state) => state.carAllData);
  const [sortType, setSortType] = useState("low");
  const [gearType, setGearType] = useState("all");
  const [fuelType, setFuelType] = useState("all");
  const [vehicleType, setVehicleType] = useState("all");
  const [seatType, setSeatType] = useState("all");

  useEffect(() => {
    dispatch(fetchAllCarData());
  }, [dispatch]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  const handleGearTypeChange = (e) => {
    setGearType(e.target.value);
  };
  const handleFuelTypeChange = (e) => {
    setFuelType(e.target.value);
  };
  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
  };

  if (status === "LOADING") {
    return <Loading />;
  }else if (status === "FAIL"){
    return <ErrorPage errorMessage={error} />
  }

  let filteredItems = [...items];

  filteredItems = filteredItems.filter((item) => item.isAvailable === true);

  if (gearType === "MANUAL") {
    filteredItems = filteredItems.filter((item) => item.gearType === gearType);
  } else if (gearType === "AUTOMATIC") {
    filteredItems = filteredItems.filter((item) => item.gearType === gearType);
  }

  if (fuelType === "GASOLINE") {
    filteredItems = filteredItems.filter((item) => item.fuelType === fuelType);
  } else if (fuelType === "DIESEL") {
    filteredItems = filteredItems.filter((item) => item.fuelType === fuelType);
  } else if (fuelType === "HYBRID") {
    filteredItems = filteredItems.filter((item) => item.fuelType === fuelType);
  } else if (fuelType === "ELECTRIC") {
    filteredItems = filteredItems.filter((item) => item.fuelType === fuelType);
  }

  if (vehicleType === "SUV") {
    filteredItems = filteredItems.filter(
      (item) => item.vehicleType === vehicleType
    );
  } else if (vehicleType === "SEDAN") {
    filteredItems = filteredItems.filter(
      (item) => item.vehicleType === vehicleType
    );
  } else if (vehicleType === "HB") {
    filteredItems = filteredItems.filter(
      (item) => item.vehicleType === vehicleType
    );
  }

  if (sortType === "low") {
    filteredItems.sort((a, b) => a.dailyPrice - b.dailyPrice);
  } else if (sortType === "high") {
    filteredItems.sort((a, b) => b.dailyPrice - a.dailyPrice);
  }

  console.log(filteredItems);
  return (
    <Helmet title={t("cars")}>
      <CommonSection title={t("cars")} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <Container>
              <h4 className="section__title">{t('filter')}</h4>
                <hr />
                <Row className="mt-4">
                  <Col lg="4" md="4" sm="6" className="mb-3">
                  <div className="d-flex align-items-center gap-3">
                      <span className="d-flex align-items-center gap-2">
                      <i className="ri-settings-2-line"></i> {t("gearType")}
                      </span>
                      <Form.Select
                      value={gearType}
                      onChange={handleGearTypeChange}
                    >
                      <option value="all">{t("all")}</option>
                      <option value="MANUAL">{t("manual")}</option>
                      <option value="AUTOMATIC">{t("automatic")}</option>
                    </Form.Select>
                    </div>
                    
                  </Col>
                  <Col lg="4" md="4" sm="6" className="mb-3">
                  <div className="d-flex align-items-center gap-3">
                      <span className="d-flex align-items-center gap-2">
                      <i className="ri-gas-station-fill"></i> {t("fuelType")}
                      </span>
                      <Form.Select
                      value={fuelType}
                      onChange={handleFuelTypeChange}
                    >
                      <option value="all">{t("all")}</option>
                      <option value="GASOLINE">{t("gasoline")}</option>
                      <option value="DIESEL">{t("diesel")}</option>
                      <option value="HYBRID">{t("hybrid")}</option>
                      <option value="ELECTRIC">{t("electric")}</option>
                    </Form.Select>
                    </div>
                    
                  </Col>
                  <Col lg="4" md="4" sm="6" className="mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <span className="d-flex align-items-center gap-2">
                      <i className="ri-caravan-line"></i> {t("vehicleType")}
                      </span>
                      <Form.Select
                      value={vehicleType}
                      onChange={handleVehicleTypeChange}
                    >
                      <option value="all">{t("all")}</option>
                      <option value="SUV">{t("suv")}</option>
                      <option value="SEDAN">{t("sedan")}</option>
                      <option value="HB">{t("hatchback")}</option>
                    </Form.Select>
                    </div>

                    
                  </Col>
                </Row>
                <Col lg="9"></Col>
                <div className="d-flex justify-content-end mt-4">
                  <Col lg="3">
                    <Col lg="12">
                      <div className="d-flex align-items-center gap-3">
                        <span className="d-flex align-items-center gap-2">
                          <i className="ri-sort-asc"></i> {t("sort")}
                        </span>
                        <select
                          className="form-control"
                          value={sortType}
                          onChange={handleSortChange}
                        >
                          <option value="">{t("select")}</option>
                          <option value="low">{t("ltoh")}</option>
                          <option value="high">{t("htol")}</option>
                        </select>
                      </div>
                    </Col>
                  </Col>
                </div>
              </Container>
            </Col>

            {filteredItems.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
