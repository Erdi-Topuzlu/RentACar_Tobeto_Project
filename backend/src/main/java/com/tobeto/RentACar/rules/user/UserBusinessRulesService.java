package com.tobeto.RentACar.rules.user;

public interface UserBusinessRulesService {
    void checkIfByEmailExists(String email);

    void checkIfByIdExists(int id);
}
