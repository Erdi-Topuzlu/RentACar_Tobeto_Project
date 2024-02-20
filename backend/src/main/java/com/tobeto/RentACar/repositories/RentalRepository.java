package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.rental.Rental;
import com.tobeto.RentACar.entities.concretes.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RentalRepository extends JpaRepository<Rental, Integer> {

    boolean existsById(int id);
    List<Rental>findByUserId(int id);

}
