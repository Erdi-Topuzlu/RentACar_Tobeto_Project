package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.car.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {
    boolean existsByPlate(String plate);
    boolean existsById(int id);

}
