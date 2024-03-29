package com.tobeto.RentACar.rules.user;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserBusinessRulesManager implements UserBusinessRulesService {

    private final UserRepository userRepository;

    @Override
    public void checkIfByEmailExists(String email) {
        if (userRepository.existsByEmail(email)){
            throw new BusinessException(Messages.emailAlreadyExist);
        }
    }

    @Override
    public void checkIfByIdExists(int id) {
        if (!userRepository.existsById(id)) {
            throw new BusinessException(Messages.userIdNotFound);

        }
    }
}
