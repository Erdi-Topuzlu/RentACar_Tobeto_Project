package com.tobeto.RentACar.services.dtos.responses.carImage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarImageResponse {
    private String imgPath;
    private int carId;
}
