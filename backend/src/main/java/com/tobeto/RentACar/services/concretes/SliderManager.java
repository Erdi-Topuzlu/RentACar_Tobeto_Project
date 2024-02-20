package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.entities.concretes.slider.Slider;
import com.tobeto.RentACar.repositories.SliderRepository;
import com.tobeto.RentACar.rules.slider.SliderBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.SliderService;
import com.tobeto.RentACar.services.dtos.requests.slider.AddSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.DeleteSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.UpdateSliderRequest;
import com.tobeto.RentACar.services.dtos.responses.slider.GetAllSliderResponse;
import com.tobeto.RentACar.services.dtos.responses.slider.GetByIdSliderResponse;
import lombok.AllArgsConstructor;
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

import static com.tobeto.RentACar.core.utilities.constant.Constant.SLIDER_PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@AllArgsConstructor
public class SliderManager implements SliderService {

    private final SliderRepository sliderRepository;
    private final ModelMapperService modelMapperService;
    private final SliderBusinessRulesService sliderBusinessRulesService;

    @Override
    public DeleteSliderRequest delete(int id) {
        Slider slider = sliderRepository.findById(id).orElseThrow();
        sliderRepository.deleteById(slider.getId());
        return modelMapperService.entityToDto().map(slider, DeleteSliderRequest.class);
    }

    @Override
    public List<GetAllSliderResponse> getAll() {
        List<Slider> sliders = sliderRepository.findAll();
        List<GetAllSliderResponse> sliderResponses = sliders.stream()
                .map(slider -> modelMapperService.entityToDto().map(slider, GetAllSliderResponse.class)).toList();
        return sliderResponses;
    }

    @Override
    public GetByIdSliderResponse getById(int id) {
        Slider slider = sliderRepository.findById(id).orElseThrow();
        GetByIdSliderResponse response = modelMapperService.entityToDto().map(slider, GetByIdSliderResponse.class);
        return response;
    }

    @Override
    public String addSliderPhoto(AddSliderRequest sliderRequest, MultipartFile file) {
        var responseSlider = modelMapperService.entityToDto().map(sliderRequest, Slider.class);
        String sliderImageUrl = photoFunction.apply(UUID.randomUUID().toString(), file);
        responseSlider.setImgPath(sliderImageUrl);
        sliderRepository.save(responseSlider);
        return sliderImageUrl;
    }

    @Override
    public String updateSliderPhoto(UpdateSliderRequest sliderRequest, MultipartFile file) {
        var responseSlider = modelMapperService.entityToDto().map(sliderRequest, Slider.class);
        String sliderImageUrl = photoFunction.apply(UUID.randomUUID().toString(), file);
        responseSlider.setImgPath(sliderImageUrl);
        sliderRepository.save(responseSlider);
        return sliderImageUrl;
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
            Path fileStorageLocation = Paths.get(SLIDER_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/sliderImage/" + fileName)
                    .toUriString();
        } catch (Exception e) {
            throw new RuntimeException(Messages.unableToSaveImg);
        }
    };
}
