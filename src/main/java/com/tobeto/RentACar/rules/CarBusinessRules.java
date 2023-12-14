package com.tobeto.RentACar.rules;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.CarRepository;
import com.tobeto.RentACar.repositories.ColorRepository;
import com.tobeto.RentACar.repositories.ModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CarBusinessRules {
    private final CarRepository carRepository;
    private final ColorRepository colorRepository;
    private final ModelRepository modelRepository;

    public void checkIfPlateNameExists(String plate){
        if (carRepository.existsByPlate(plate)){
            throw new BusinessException("Plate already exists!");
        }
    }

    public void checkIfColorIdExists(int id){
        if(!colorRepository.existsById(id)){
            throw new BusinessException("ColorId is Not Found!");
        }
    }

    public void checkIfModelIdExists(int id){
        if(!modelRepository.existsById(id)){
            throw new BusinessException("ModelId is Not Found!");
        }
    }
}
