import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet";
import CommonSection from "../components/ui/CommonSection";
import CarItem from "../components/ui/CarItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCarData } from "../redux/slices/carDataSlice";
const CarListing = () => {
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.data.items);

  useEffect(() => {
    dispatch(fetchAllCarData());
  }, [dispatch]);

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {cars.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
