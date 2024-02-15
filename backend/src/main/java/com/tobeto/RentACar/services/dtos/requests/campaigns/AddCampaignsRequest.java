package com.tobeto.RentACar.services.dtos.requests.campaigns;

import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCampaignsRequest {
    private String title;
    private String description;

    @NotNull(message = Messages.userIdNotEmpty)
    @Positive(message = Messages.userIdPositive)
    private int userId;
}
