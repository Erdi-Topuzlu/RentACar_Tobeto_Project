package com.tobeto.RentACar.entities.concretes;

import lombok.Getter;

@Getter
public enum SeatType {

    TWO("2"),
    FIVE("5"),
    SEVEN("7");

    private final String seatType;
    SeatType(String seatType) {
        this.seatType = seatType;
    }

}
