package com.tobeto.RentACar.services.dtos.responses.color;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetAllColorResponse {
    private int id;
    private String name;
}
