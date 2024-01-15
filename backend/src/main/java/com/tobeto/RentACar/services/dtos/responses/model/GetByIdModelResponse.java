package com.tobeto.RentACar.services.dtos.responses.model;

import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdModelResponse{
    private String name;
    GetByIdBrandResponse brandId;
}
