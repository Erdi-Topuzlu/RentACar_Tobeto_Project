package com.tobeto.RentACar.rules.model;

public interface ModelBusinessRulesService {
    void checkIfNameExists(String name);
    void checkIfBrandIdExists(int id);

    void checkIfByIdExists(int id);

}
