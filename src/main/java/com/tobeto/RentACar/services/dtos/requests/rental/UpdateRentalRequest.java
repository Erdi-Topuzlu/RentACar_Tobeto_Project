package com.tobeto.RentACar.services.dtos.requests.rental;

import com.tobeto.RentACar.services.dtos.responses.car.GetByIdCarResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRentalRequest {
    private int id;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate returnDate;
    private int startKilometer;
    private int endKilometer;
    private double totalPrice;
    private int carId;
    private int userId;
}
