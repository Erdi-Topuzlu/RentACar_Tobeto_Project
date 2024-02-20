package com.tobeto.RentACar.services.dtos.requests.slider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddSliderRequest {
    private String title;
    private String description;
    private String buttonLabelName;
}
