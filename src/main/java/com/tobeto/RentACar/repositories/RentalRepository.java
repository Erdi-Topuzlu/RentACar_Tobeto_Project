package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

    boolean existsById(int id);

}
