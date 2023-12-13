package com.tobeto.RentACar.services.dtos.requests.car;

import com.tobeto.RentACar.entities.Color;
import com.tobeto.RentACar.entities.Model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.Banner;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {
    private int kilometer;
    private String plate;
    private int year;
    private double dailyPrice;
    private int colorId;
    private int modelId;
}
