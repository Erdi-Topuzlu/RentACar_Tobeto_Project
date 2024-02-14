package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.campaigns.Campaigns;
import com.tobeto.RentACar.repositories.CampaignsRepository;
import com.tobeto.RentACar.services.abstracts.CampaignsService;
import com.tobeto.RentACar.services.dtos.requests.campaigns.AddCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.DeleteCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.UpdateCampaignsRequest;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetAllCampaignsResponse;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetByIdCampaignsResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@AllArgsConstructor
@Data
public class CampaignsManager implements CampaignsService {

    private final CampaignsRepository campaignsRepository;
    private final ModelMapperService modelMapperService;


    @Override
    public void add(AddCampaignsRequest request) {
        Campaigns campaigns = modelMapperService.dtoToEntity().map(request, Campaigns.class);
        campaignsRepository.save(campaigns);

    }

    @Override
    public void update(UpdateCampaignsRequest request) {
        Campaigns campaigns = modelMapperService.dtoToEntity().map(request, Campaigns.class);
        campaignsRepository.save(campaigns);

    }

    @Override
    public DeleteCampaignsRequest delete(int id) {
        Campaigns campaigns = campaignsRepository.findById(id).orElseThrow();
        campaignsRepository.deleteById(campaigns.getId());
        return modelMapperService.entityToDto().map(campaigns, DeleteCampaignsRequest.class);
    }

    @Override
    public List<GetAllCampaignsResponse> getAll() {
        List<Campaigns> campaigns = campaignsRepository.findAll();
        List<GetAllCampaignsResponse> campaignsResponses = campaigns.stream()
                .map(campaigns1 -> modelMapperService.entityToDto().map(campaigns1, GetAllCampaignsResponse.class)).toList();
        return campaignsResponses;
    }

    @Override
    public GetByIdCampaignsResponse getById(int id) {
        Campaigns campaigns = campaignsRepository.findById(id).orElseThrow();
        GetByIdCampaignsResponse response = modelMapperService.entityToDto().map(campaigns, GetByIdCampaignsResponse.class);
        return response;
    }
}