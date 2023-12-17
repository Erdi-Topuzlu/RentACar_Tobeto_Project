package com.tobeto.RentACar.services.dtos.requests.brand;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddBrandRequest {

    @NotBlank(message = Messages.brandNameNotEmpty)
    @Size(min = 2,message = Messages.brandNameSize)
    private String name;
}
