package com.tobeto.RentACar.services.dtos.requests.rental;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRentalRequest {
    private int id;
    @FutureOrPresent(message = "Start date can't be any later than today!") //Biz bunu iş kuralı olarak da yazardık ama yazmadık :)
    private LocalDate startDate;
    private LocalDate endDate;

    private LocalDate returnDate;
    @Nullable
    private Integer endKilometer;
    private double totalPrice;
    private int carId;
    private int userId;
}
