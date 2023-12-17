package com.tobeto.RentACar.services.dtos.requests.rental;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate returnDate;
    @Nullable
    private Integer endKilometer;
    private double totalPrice;
    private int carId;
    private int userId;
}
