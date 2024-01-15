package com.tobeto.RentACar.services.dtos.responses.model;

import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllModelResponse {
    private String name;
    GetByIdBrandResponse brandId;
}
