package com.tobeto.RentACar.services.dtos.requests.carImage;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarImageRequest {

    @NotBlank(message = Messages.imgPathNotEmpty)
    private String imgPath;

//    @NotNull(message = Messages.carIdNotEmpty)
    @Positive(message = Messages.carIdPositive)
    private int carId;
}
