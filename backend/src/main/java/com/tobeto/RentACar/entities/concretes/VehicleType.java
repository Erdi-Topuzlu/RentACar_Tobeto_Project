package com.tobeto.RentACar.entities.concretes;

import lombok.Getter;

@Getter
public enum VehicleType {
    SUV("Suv"),
    SEDAN("Sedan"),
    HB("Hatchback");

    private final String vehicleType;

    VehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }
}
