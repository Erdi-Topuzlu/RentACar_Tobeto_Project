package com.tobeto.RentACar.services.dtos.requests.rental;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
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
    @FutureOrPresent(message = Messages.startDateNotBeforeToday) //Biz bunu iş kuralı olarak da yazardık ama yazmadık :)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate returnDate;
    @Nullable
    private Integer endKilometer;
    private double totalPrice;
    @NotNull(message = Messages.carIdNotEmpty)
    @Positive(message = Messages.carIdPositive)
    private int carId;

    @NotNull(message = Messages.userIdNotEmpty)
    @Positive(message = Messages.userIdPositive)
    private int userId;
}
