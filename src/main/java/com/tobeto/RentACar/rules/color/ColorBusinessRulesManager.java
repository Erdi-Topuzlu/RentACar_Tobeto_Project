package com.tobeto.RentACar.rules.color;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.ColorRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ColorBusinessRulesManager implements ColorBusinessRulesService {
    private final ColorRepository colorRepository;

    @Override
    public void checkIfColorNameExists(String email) {
        if (colorRepository.existsByName(email)) {
            throw new BusinessException("Color Already Exist ! ");
        }
    }
}
