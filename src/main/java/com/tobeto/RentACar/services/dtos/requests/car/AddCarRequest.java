package com.tobeto.RentACar.services.dtos.requests.car;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCarRequest {
    @NotNull(message = "Araç kilometresi boş geçilemez!")
    @Positive(message = "Aracın kilometresi 0'dan büyük olmalıdır!")
    private int kilometer;

    @NotBlank(message = "Plaka boş geçilemez!")
    @Pattern(regexp = "^[1-8][0-9]{1}[A-Z]{1,3}[0-9]{1,4}$", message = "Geçersiz plaka formatı!")
    private String plate;

    @NotNull(message = "Araç yılı boş geçilemez!")
    @Min(value = 2005,message = "Model yılı 2005 arasında olmalıdır!" )
    @Max(value = 2024, message = "Model yılı 2024 arasında olmalıdır!")
    private int year;

    @NotNull(message = "Günlük ücret boş geçilemez!")
    @Positive(message = "Günlük ücret 0₺ den küçük olamaz!")
    private double dailyPrice;

    @NotNull(message = "ColorId boş geçilemez!")
    @Positive(message = "ColorId 0'dan farklı pozitif sayı olmalıdır!")
    private int colorId;

    @NotNull(message = "ModelId boş geçilemez!")
    @Positive(message = "ModelId 0'dan farklı pozitif sayı olmalıdır!")
    private int modelId;
}
