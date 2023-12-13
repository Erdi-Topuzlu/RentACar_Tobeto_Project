package com.tobeto.RentACar.services.dtos.requests.color;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateColorRequest {
    private int id;
    @NotBlank(message = "Color is not blank!")
    @Size(min = 2, message = "Color must consist of at least 2 letters!")
    private String name;
}
