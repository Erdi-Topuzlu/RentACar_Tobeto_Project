package com.tobeto.RentACar.rules.car;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.CarRepository;
import com.tobeto.RentACar.repositories.ColorRepository;
import com.tobeto.RentACar.repositories.ModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CarBusinessRulesManager implements CarBusinessRulesService {
    private final CarRepository carRepository;
    private final ColorRepository colorRepository;
    private final ModelRepository modelRepository;

    @Override
    public void checkIfPlateNameExists(String plate) {
        if (carRepository.existsByPlate(plate)) {
            throw new BusinessException("Plate already exists!");
        }
    }

    @Override
    public void checkIfColorIdExists(int id) {
        if (!colorRepository.existsById(id)) {
            throw new BusinessException("ColorId is Not Found!");
        }
    }

    @Override
    public void checkIfModelIdExists(int id) {
        if (!modelRepository.existsById(id)) {
            throw new BusinessException("ModelId is Not Found!");
        }
    }
}
