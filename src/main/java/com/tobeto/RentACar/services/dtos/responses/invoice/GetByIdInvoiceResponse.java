package com.tobeto.RentACar.services.dtos.responses.invoice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetByIdInvoiceResponse {
    private Integer id;
    private LocalDate createDate;
    private Integer rentalId;
}
