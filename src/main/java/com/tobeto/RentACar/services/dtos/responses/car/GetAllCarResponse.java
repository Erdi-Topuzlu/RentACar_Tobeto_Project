package com.tobeto.RentACar.services.dtos.responses.car;

import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCarResponse {
    private int id;
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    private String colorName;
    private String modelName;
}
