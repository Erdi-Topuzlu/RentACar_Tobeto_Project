package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.confirmation.Confirmation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationRepository extends JpaRepository<Confirmation, Long> {
    Confirmation findByConfirmationToken(String confirmationToken);
}
