package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.entities.concretes.confirmation.Confirmation;

public interface ConfirmationService {

    Confirmation findByConfirmationToken(String confirmationToken);

    Confirmation save(Confirmation confirmation);
}
