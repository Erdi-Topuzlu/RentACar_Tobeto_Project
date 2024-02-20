package com.tobeto.RentACar.rules.brand;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.repositories.BrandRepository;
import lombok.AllArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class BrandBusinessRulesManager implements BrandBusinessRulesService{
    private final BrandRepository brandRepository;

    public void checkIfBrandNameExists(String name){
        if (brandRepository.existsByName(name)){
            throw new BusinessException(Messages.brandNameAlreadyExist);
        }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if(!brandRepository.existsById(id)){
            throw new BusinessException(Messages.brandIdNotFound);
        }
    }

}
