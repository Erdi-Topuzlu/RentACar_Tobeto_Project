package com.tobeto.RentACar.rules.car;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.CarRepository;
import com.tobeto.RentACar.services.abstracts.ColorService;
import com.tobeto.RentACar.services.abstracts.ModelService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CarBusinessRulesManager implements CarBusinessRulesService {
    private final CarRepository carRepository;
    private final ColorService colorService;
    private final ModelService modelService;

    @Override
    public void checkIfPlateNameExists(String plate) {
        if (carRepository.existsByPlate(plate)) {
            throw new BusinessException("Plate already exists!");
        }
    }

    @Override
    public void checkIfColorIdExists(int id) {
        if (!colorService.existsById(id)) {
            throw new BusinessException("ColorId is Not Found!");
        }
    }

    @Override
    public void checkIfModelIdExists(int id) {
        if (!modelService.existsById(id)) {
            throw new BusinessException("ModelId is Not Found!");
        }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if (!carRepository.existsById(id)) {
            throw new BusinessException("carId is Not Found!");

        }
    }
}
