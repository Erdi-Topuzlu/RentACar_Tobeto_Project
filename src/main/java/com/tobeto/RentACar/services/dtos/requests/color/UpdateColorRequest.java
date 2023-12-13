package com.tobeto.RentACar.services.dtos.requests.color;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateColorRequest {
    private Integer id;
    private String colorName;
    private Integer carId;
}
