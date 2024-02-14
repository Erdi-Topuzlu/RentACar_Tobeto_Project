package com.tobeto.RentACar.services.dtos.responses.campaigns;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCampaignsResponse {
    private int id;
    private String title;
    private String description;
    private String imgPath;


}
