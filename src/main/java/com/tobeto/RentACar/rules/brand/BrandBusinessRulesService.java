package com.tobeto.RentACar.rules.brand;

public interface BrandBusinessRulesService {
    void checkIfBrandNameExists(String name);

    void checkIfById (int id);
}
