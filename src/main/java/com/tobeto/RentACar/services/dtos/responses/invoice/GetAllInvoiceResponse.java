package com.tobeto.RentACar.services.dtos.responses.invoice;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetAllInvoiceResponse {
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate createDate;
    private int rentalId;
}
