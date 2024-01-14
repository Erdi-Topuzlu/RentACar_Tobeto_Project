package com.tobeto.RentACar.rules.slider;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.SliderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SliderBusinessRulesManager implements SliderBusinessRulesService {

    private  final SliderRepository sliderRepository;
    @Override
    public void checkIfByIdExists(int id) {
        if (!sliderRepository.existsById(id)) {
            throw new BusinessException("Slider Id Not Found !");
        }
    }
}
