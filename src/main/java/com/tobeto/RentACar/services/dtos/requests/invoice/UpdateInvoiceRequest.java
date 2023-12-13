package com.tobeto.RentACar.services.dtos.requests.invoice;

import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateInvoiceRequest {
    private int id;
    private LocalDate createDate;
    private int rentalId;
}
