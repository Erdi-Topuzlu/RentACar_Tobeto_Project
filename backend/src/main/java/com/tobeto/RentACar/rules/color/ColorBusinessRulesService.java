package com.tobeto.RentACar.rules.color;

public interface ColorBusinessRulesService {
    void checkIfColorNameExists(String email);
    void checkIfByIdExists(int id);
}
