package com.tobeto.RentACar.services.dtos.requests.invoice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DeleteInvoiceRequest {
    private Integer id;
}
