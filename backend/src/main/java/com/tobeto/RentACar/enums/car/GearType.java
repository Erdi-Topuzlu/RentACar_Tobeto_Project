package com.tobeto.RentACar.enums.car;

import lombok.Data;
import lombok.Getter;

@Getter
public enum GearType {
    MANUAL("Manual"),
    AUTOMATIC("Automatic");

    private final String gearType;
    GearType(String gearType) {
        this.gearType = gearType;
    }

}
