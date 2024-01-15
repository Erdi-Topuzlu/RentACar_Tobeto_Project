package com.tobeto.RentACar.services.dtos.responses.carImage;

import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdCarImageResponse {
    private String imgPath;
    GetByIdCarResponse carId;
}
