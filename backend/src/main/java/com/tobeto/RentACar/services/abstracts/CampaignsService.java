package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.campaigns.AddCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.DeleteCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.UpdateCampaignsRequest;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetAllCampaignsResponse;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetByIdCampaignsResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CampaignsService {

    String addCampaigns(MultipartFile file, AddCampaignsRequest request);

    String updateCampaigns(UpdateCampaignsRequest sliderRequest, MultipartFile file);

    DeleteCampaignsRequest delete(int id);

    List<GetAllCampaignsResponse> getAll();

    GetByIdCampaignsResponse getById(int id);

}
