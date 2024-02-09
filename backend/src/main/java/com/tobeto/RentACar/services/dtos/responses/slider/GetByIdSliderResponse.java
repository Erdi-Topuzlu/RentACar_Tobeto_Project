package com.tobeto.RentACar.services.dtos.responses.slider;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetByIdSliderResponse {
    private int id;
    private String imgPath;
    private String title;
    private String description;
    private String buttonLabelName;
}
