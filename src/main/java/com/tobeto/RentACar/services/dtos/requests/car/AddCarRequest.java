package com.tobeto.RentACar.services.dtos.requests.car;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {
    @NotNull(message = "Kilometer cannot be empty!")
    @Positive(message = "Kilometer of the vehicle must be greater than 0!")
    private int kilometer;

    @NotBlank(message = "Plate cannot be empty!")
    @Pattern(regexp = "^[1-8][0-9]{1}[a-zA-Z]{1,3}[0-9]{1,4}$", message = "Invalid plate format!")
    private String plate;

    public void setPlate(String plate) {
        this.plate = plate != null ? plate.replaceAll("\\s", "") : null;
    }

    @NotNull(message = "Vehicle year cannot be empty!")
    @Min(value = 2005,message = "Model year must be at least 2005!!" )
    @Max(value = 2024, message = "Model year must be smaller than 2024!")
    private int year;

    @NotNull(message = "Daily price cannot be empty!")
    @Positive(message = "Daily price must be greater than 0₺!")
    private double dailyPrice;

    @NotNull(message = "ColorId cannot be empty!")
    @Positive(message = "ColorId must be a positive number other than 0!")
    private int colorId;

    @NotNull(message = "ModelId cannot be empty!")
    @Positive(message = "ModelId must be a positive number other than 0!")
    private int modelId;
}
