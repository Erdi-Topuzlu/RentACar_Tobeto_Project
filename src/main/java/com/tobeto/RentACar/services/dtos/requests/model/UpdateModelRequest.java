package com.tobeto.RentACar.services.dtos.requests.model;

import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateModelRequest {
    private int id;

    @NotBlank(message = "Brand is not blank!")
    @Size(min = 2, message = "Model must consist of at least 2 letters!")
    private String name;
    private int brandId;
}
