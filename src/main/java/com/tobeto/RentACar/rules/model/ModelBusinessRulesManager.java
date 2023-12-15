package com.tobeto.RentACar.rules.model;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.repositories.BrandRepository;
import com.tobeto.RentACar.repositories.ModelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ModelBusinessRulesManager implements ModelBusinessRulesService {

    private final ModelRepository modelRepository;
    private final BrandRepository brandRepository;
    @Override
    public void checkIfNameExists(String name) {
        if (modelRepository.existsByName(name)){
            throw new BusinessException("Name already exists!");
        }
    }

    @Override
    public void checkIfBrandIdExists(int id) {
        if (!brandRepository.existsById(id)){
            throw new BusinessException("BrandId is Not Found!");
        }
    }
}
