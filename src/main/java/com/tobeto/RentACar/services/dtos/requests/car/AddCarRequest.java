package com.tobeto.RentACar.services.dtos.requests.car;

import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {
    @Positive(message = "Aracın kilometresi 0'dan büyük olmalıdır!")
    private int kilometer;

    private String plate;

    @Min(value = 2005,message = "Model yılı 2005 arasında olmalıdır!" )
    @Max(value = 2024, message = "Model yılı 2024 arasında olmalıdır!")
    private int year;

    @NotBlank
    @NotNull
    @Positive(message = "Günlük ücret 0₺ den küçük olamaz!")
    private double dailyPrice;

    @NotBlank
    @NotNull
    @Positive(message = "ColorId 0'dan farklı pozitif sayı olmalıdır!")
    private int colorId;

    @Positive(message = "ModelId 0'dan farklı pozitif sayı olmalıdır!")
    private int modelId;
}
