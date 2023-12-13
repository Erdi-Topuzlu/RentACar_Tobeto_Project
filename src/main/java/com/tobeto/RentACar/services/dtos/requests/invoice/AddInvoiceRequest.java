package com.tobeto.RentACar.services.dtos.requests.invoice;

import com.tobeto.RentACar.entities.Rental;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddInvoiceRequest {
    private Integer id;
    private LocalDate createDate;
    private Integer rentalId;
}
