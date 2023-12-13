package com.tobeto.RentACar.services.dtos.responses.car;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarResponse {
    private int id;
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    private int colorId;
    private int modelId;
}
