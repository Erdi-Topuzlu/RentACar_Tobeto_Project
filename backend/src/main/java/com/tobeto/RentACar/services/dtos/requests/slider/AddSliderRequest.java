package com.tobeto.RentACar.services.dtos.requests.slider;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSliderRequest {
    @NotBlank(message = Messages.imgPathNotEmpty)
    private String imgPath;
    private String title;
    private String description;
    private String buttonLabelName;
}
