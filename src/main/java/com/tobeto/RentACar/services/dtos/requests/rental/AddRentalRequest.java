package com.tobeto.RentACar.services.dtos.requests.rental;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddRentalRequest {

    @FutureOrPresent(message = "Start date can't be any later than today!") //Biz bunu iş kuralı olarak da yazardık ama yazmadık :)
    private LocalDate startDate;
    private LocalDate endDate;
    private int carId;
    private int userId;
}
