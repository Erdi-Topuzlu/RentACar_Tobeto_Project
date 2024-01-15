package com.tobeto.RentACar.entities.concretes;

import lombok.Getter;

@Getter
public enum FuelType {

    DIESEL("Diesel"),
    ELECTRIC("Electric"),
    HYBRID("Hybrid"),
    GASOLINE("Gasoline");

    private final String fuelType;

    FuelType(String fuelType) {
        this.fuelType = fuelType;
    }
}
