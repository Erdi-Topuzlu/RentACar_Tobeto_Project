package com.tobeto.RentACar.services.dtos.responses.rental;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import jakarta.validation.constraints.Null;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllRentalResponse {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate returnDate;
    private int startKilometer;
    private Integer endKilometer;
    private double totalPrice;
    GetByIdCarResponse carId;
    GetByIdUserResponse userId;
}
