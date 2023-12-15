package com.tobeto.RentACar.services.dtos.requests.brand;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBrandRequest {
    private int id;
    @Size(min = 2,message = "Brand name must consist of at least 2 letters!")
    private String name;
}