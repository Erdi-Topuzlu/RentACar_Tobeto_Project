import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import CarItem from "../components/ui/CarItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCarData } from "../redux/slices/carDataSlice";
import Loading from "../components/ui/Loading";
import { useTranslation } from "react-i18next";

const CarListing = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, status, error } = useSelector((state) => state.carAllData);
  const [sortType, setSortType] = useState("low");

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchAllCarData());
  }, [dispatch]);

  if (status === "LOADING") {
    return <Loading />;
  }

  let sortedItems = [...items];

  if (sortType === "low") {
    sortedItems.sort((a, b) => a.dailyPrice - b.dailyPrice);
  } else if (sortType === "high") {
    sortedItems.sort((a, b) => b.dailyPrice - a.dailyPrice);
  }

  return (
    <Helmet title={t('cars')}>
      <CommonSection title={t('cars')} />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> {t('sort')}
                </span>
                <select
                  className="form-control"
                  value={sortType}
                  onChange={handleSortChange}
                >
                  <option value="">{t('select')}</option>
                  <option value="low">{t('ltoh')}</option>
                  <option value="high">{t('htol')}</option>
                </select>
              </div>
            </Col>

            {sortedItems.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
