package com.tobeto.RentACar.rules.car;

public interface CarBusinessRulesService {
    void checkIfPlateNameExists(String plate);
    void checkIfColorIdExists(int id);
    void checkIfModelIdExists(int id);
}
