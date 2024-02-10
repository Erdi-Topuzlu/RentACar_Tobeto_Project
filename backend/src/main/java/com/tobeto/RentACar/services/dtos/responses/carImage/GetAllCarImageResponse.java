package com.tobeto.RentACar.services.dtos.responses.carImage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCarImageResponse {
    private String imgPath;
    @JsonIgnore
    GetByIdCarResponse carId;
}
