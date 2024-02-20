package com.tobeto.RentACar.services.dtos.requests.model;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddModelRequest {


    @NotBlank(message = Messages.modelNameNotEmpty)
    @Size(min = 2, message = Messages.modelNameSize)
    private String name;

    @NotNull(message = Messages.brandIdNotEmpty)
    @Positive(message = Messages.brandIdPositive)
    private int brandId;
}
