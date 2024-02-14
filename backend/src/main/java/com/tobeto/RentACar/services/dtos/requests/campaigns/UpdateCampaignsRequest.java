package com.tobeto.RentACar.services.dtos.requests.campaigns;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCampaignsRequest {
    private int id;
    private String title;
    private String description;
    @Nullable
    private String imgPath;
}
