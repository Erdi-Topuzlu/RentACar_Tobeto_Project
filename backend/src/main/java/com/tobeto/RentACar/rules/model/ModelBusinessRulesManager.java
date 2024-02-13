package com.tobeto.RentACar.rules.model;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.repositories.BrandRepository;
import com.tobeto.RentACar.repositories.ModelRepository;
import com.tobeto.RentACar.services.abstracts.BrandService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ModelBusinessRulesManager implements ModelBusinessRulesService {

    private final ModelRepository modelRepository;
    private final BrandService brandService;
    @Override
    public void checkIfNameExists(String name) {
        if (modelRepository.existsByName(name)){
            throw new BusinessException(Messages.modelNameAlreadyExists);
        }
    }

    @Override
    public void checkIfBrandIdExists(int id) {
        if (!brandService.existsById(id)){
            throw new BusinessException(Messages.brandIdNotFound);
        }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if (!modelRepository.existsById(id)) {
            throw new BusinessException(Messages.modelIdNotFound);
        }
    }
}
