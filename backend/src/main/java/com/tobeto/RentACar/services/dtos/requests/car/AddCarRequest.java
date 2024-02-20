package com.tobeto.RentACar.services.dtos.requests.car;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {


    @NotNull(message = Messages.kilometerNotEmpty)
    @Positive(message = Messages.kilometerPositive)
    private int kilometer;

    @NotBlank(message = Messages.plateNotEmpty)
    @Pattern(regexp = "^[0-8][0-9]{1}[a-zA-Z]{1,3}[0-9]{1,4}$", message = Messages.invalidPlate)
    private String plate;

    public void setPlate(String plate) {
        this.plate = plate != null ? plate.replaceAll("\\s", "") : null;
    }

    @NotNull(message = Messages.yearNotEmpty)
    @Min(value = 2005,message = Messages.minModelYear)
    @Max(value = 2024, message = Messages.maxModelYear)
    private int year;

    @NotNull(message = Messages.dailyPriceNotEmpty)
    @Positive(message = Messages.dailyPricePositive)
    private double dailyPrice;

    private String fuelType;

    private String gearType;

    private String vehicleType;

    private String seatType;

    private Boolean isAvailable;

    @NotNull(message = Messages.colorIdNotEmpty)
    @Positive(message = Messages.colorIdPositive)
    private int colorId;

    @NotNull(message = Messages.modelIdNotEmpty)
    @Positive(message = Messages.modelIdPositive)
    private int modelId;
}
