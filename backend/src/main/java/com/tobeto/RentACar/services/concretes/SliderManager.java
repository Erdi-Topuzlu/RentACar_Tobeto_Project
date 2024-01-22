package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
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

import java.util.List;

@Service
@AllArgsConstructor
public class SliderManager implements SliderService {

    private final SliderRepository sliderRepository;
    private final ModelMapperService modelMapperService;
    private final SliderBusinessRulesService sliderBusinessRulesService;


    @Override
    public void add(AddSliderRequest request) {
        Slider slider = modelMapperService.dtoToEntity().map(request, Slider.class);
        sliderRepository.save(slider);
    }

    @Override
    public void update(UpdateSliderRequest request) {
        sliderBusinessRulesService.checkIfByIdExists(request.getId());
        Slider slider = modelMapperService.dtoToEntity().map(request, Slider.class);
        sliderRepository.save(slider);
    }

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
}
