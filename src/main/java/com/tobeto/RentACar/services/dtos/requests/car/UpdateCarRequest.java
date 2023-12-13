package com.tobeto.RentACar.services.dtos.requests.car;

import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCarRequest {
    private int id;
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    private int colorId;
    private int modelId;
}
