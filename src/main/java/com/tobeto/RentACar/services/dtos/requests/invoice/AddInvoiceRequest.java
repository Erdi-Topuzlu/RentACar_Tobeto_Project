package com.tobeto.RentACar.services.dtos.requests.invoice;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddInvoiceRequest {

    @NotNull(message = Messages.createDateNotEmpty)
    private LocalDate createDate;

    @NotNull(message = Messages.rentalIdNotEmpty)
    @Positive(message = Messages.rentalIdPositive)
    private int rentalId;

}
