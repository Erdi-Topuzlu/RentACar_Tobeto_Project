package com.tobeto.RentACar.rules.carImage;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.CarImageRepository;
import com.tobeto.RentACar.services.abstracts.CarService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CarImageBussinessRulesManager implements CarImageBusinessRulesService {
    private final CarImageRepository carImageRepository;
    private final CarService carService;
    @Override
    public void checkIfCarIdExists(int id) {
        if (!carService.existsById(id)) {
            throw new BusinessException("CarId is Not Found!");
        }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if (!carImageRepository.existsById(id)) {
            throw new BusinessException("Car Image Id Not Found !");
        }
    }
}
