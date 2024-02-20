package com.tobeto.RentACar.services.dtos.requests.invoice;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.services.dtos.responses.rental.GetByIdRentalResponse;
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
public class UpdateInvoiceRequest {

    private int id;

    @NotNull(message = Messages.createDateNotEmpty)
    private LocalDate createDate;

    @NotNull(message = Messages.rentalIdNotEmpty)
    @Positive(message = Messages.rentalIdPositive)
    private int rentalId;

}
