package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.CampaignsService;
import com.tobeto.RentACar.services.dtos.requests.campaigns.AddCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.DeleteCampaignsRequest;
import com.tobeto.RentACar.services.dtos.requests.campaigns.UpdateCampaignsRequest;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetAllCampaignsResponse;
import com.tobeto.RentACar.services.dtos.responses.campaigns.GetByIdCampaignsResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/campaigns")
@RequiredArgsConstructor
@Tag(name = "Campaigns Controller", description = "Campaigns Endpoints")
public class CampaignsController {

    private final CampaignsService campaignsService;

    @GetMapping("/getAll")
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

    @PostMapping( consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public String add(@RequestPart MultipartFile file, @RequestPart AddCampaignsRequest request) {
       return campaignsService.addCampaigns(file, request);
    }

    @PutMapping("/{id}")
    public String update(@RequestPart MultipartFile file, @RequestPart UpdateCampaignsRequest request) {
       return campaignsService.updateCampaigns(request, file);
    }
}

