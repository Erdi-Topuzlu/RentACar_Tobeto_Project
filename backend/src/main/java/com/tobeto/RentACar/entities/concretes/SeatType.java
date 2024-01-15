package com.tobeto.RentACar.entities.concretes;

import lombok.Getter;

@Getter
public enum SeatType {

    TWO("Two"),
    FIVE("Five"),
    SEVEN("Seven");

    private final String seatType;
    SeatType(String seatType) {
        this.seatType = seatType;
    }
}
