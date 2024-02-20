package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.entities.concretes.confirmation.Confirmation;
import com.tobeto.RentACar.repositories.ConfirmationRepository;
import com.tobeto.RentACar.services.abstracts.ConfirmationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConfirmationManager implements ConfirmationService {

    private final ConfirmationRepository confirmationRepository;

    @Override
    public Confirmation findByConfirmationToken(String confirmationToken) {
        return confirmationRepository.findByConfirmationToken(confirmationToken);
    }

    @Override
    public Confirmation save(Confirmation confirmation) {
        return confirmationRepository.save(confirmation);
    }
}
