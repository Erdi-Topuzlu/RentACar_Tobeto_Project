package com.tobeto.RentACar.services.dtos.requests.invoice;

import com.tobeto.RentACar.entities.Rental;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddInvoiceRequest {

    @NotBlank(message = "createDate cannot be empty!")
    @DateTimeFormat(pattern="yyyy/MM/dd")
    private LocalDate createDate;
    @NotNull(message = "rentalId cannot be empty!")
    @Positive(message = "rentalId must be a positive number other than 0!")
    private int rentalId;

}
