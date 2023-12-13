package com.tobeto.RentACar.services.dtos.requests.model;

import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateModelRequest {
    private int id;
    private String name;
    private String brandName;
}
