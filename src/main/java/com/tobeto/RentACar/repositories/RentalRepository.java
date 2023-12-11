package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
}
