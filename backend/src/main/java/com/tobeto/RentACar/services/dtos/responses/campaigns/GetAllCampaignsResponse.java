package com.tobeto.RentACar.services.dtos.responses.campaigns;

import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAllCampaignsResponse {
    private int id;
    private String title;
    private String description;
    private String imgPath;
    GetByIdUserResponse userId;
    private LocalDate createdDate;
}
