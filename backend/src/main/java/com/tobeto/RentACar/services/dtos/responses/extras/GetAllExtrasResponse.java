package com.tobeto.RentACar.services.dtos.responses.extras;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllExtrasResponse {
    private String extraName;
    private int extraPrice;
}
