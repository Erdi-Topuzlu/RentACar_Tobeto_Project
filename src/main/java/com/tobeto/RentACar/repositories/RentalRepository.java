package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.Rental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

    boolean existsById(int id);

}
