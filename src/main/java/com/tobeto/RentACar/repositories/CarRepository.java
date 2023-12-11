package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {
}
