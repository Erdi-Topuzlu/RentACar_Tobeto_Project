package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.tobeto.RentACar.core.utilities.constant.Constant.CAMPAIGNS_PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


@Service
@AllArgsConstructor
@Data
public class CampaignsManager implements CampaignsService {

    private final CampaignsRepository campaignsRepository;
    private final ModelMapperService modelMapperService;


    @Override
    public String addCampaigns(MultipartFile file, AddCampaignsRequest request) {
        var responseCampaigns = modelMapperService.entityToDto().map(request, Campaigns.class);
        String campaignsImageUrl = photoFunction.apply(UUID.randomUUID().toString(), file);
        responseCampaigns.setImgPath(campaignsImageUrl);
        campaignsRepository.save(responseCampaigns);
        return campaignsImageUrl;
    }

    @Override
    public String updateCampaigns(UpdateCampaignsRequest request, MultipartFile file) {
        var responseCampaigns = modelMapperService.entityToDto().map(request, Campaigns.class);
        String campaignsImageUrl = photoFunction.apply(UUID.randomUUID().toString(), file);
        responseCampaigns.setImgPath(campaignsImageUrl);
        campaignsRepository.save(responseCampaigns);
        return campaignsImageUrl;
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
                .map(campaign -> modelMapperService.entityToDto().map(campaign, GetAllCampaignsResponse.class)).toList();
        return campaignsResponses;
    }

    @Override
    public GetByIdCampaignsResponse getById(int id) {
        Campaigns campaigns = campaignsRepository.findById(id).orElseThrow();
        GetByIdCampaignsResponse response = modelMapperService.entityToDto().map(campaigns, GetByIdCampaignsResponse.class);
        return response;
    }



    private Function<String, String> fileExtension() {
        return filename -> Optional.of(filename)
                .filter(name -> name.contains("."))
                .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
                .orElse(".png");
    }

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String fileName = id + fileExtension().apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(CAMPAIGNS_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/campaigns/" + fileName)
                    .toUriString();
        } catch (Exception e) {
            throw new RuntimeException(Messages.unableToSaveImg);
        }
    };
}

