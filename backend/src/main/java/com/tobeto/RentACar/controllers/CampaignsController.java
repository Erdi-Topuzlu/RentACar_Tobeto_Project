package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.CampaignsService;
import com.tobeto.RentACar.services.dtos.requests.campaigns.AddCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.DeleteCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.UpdateCampaignsRequest;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetAllCampaignsResponse;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetByIdCampaignsResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/campaigns")
@RequiredArgsConstructor
@Tag(name = "Campaigns Controller", description = "Campaigns Endpoints")
public class CampaignsController {

    private final CampaignsService campaignsService;

    @GetMapping
    public List<GetAllCampaignsResponse> getAll() {
        return campaignsService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdCampaignsResponse getById(@PathVariable int id) {
        return campaignsService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteCampaignsRequest delete(@PathVariable int id) {
        return campaignsService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddCampaignsRequest request) {
        campaignsService.add(request);
    }

    @PutMapping("/{id}")
    public void update(@RequestBody @Valid UpdateCampaignsRequest request) {
        campaignsService.update(request);
    }
}

