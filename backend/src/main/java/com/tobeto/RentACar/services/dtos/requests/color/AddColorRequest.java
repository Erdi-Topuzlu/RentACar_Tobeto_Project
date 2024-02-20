package com.tobeto.RentACar.services.dtos.requests.color;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddColorRequest {

    @NotBlank(message = Messages.colorNameNotEmpty)
    @Size(min = 2, message = Messages.colorNameSize)
    private String name;
}
