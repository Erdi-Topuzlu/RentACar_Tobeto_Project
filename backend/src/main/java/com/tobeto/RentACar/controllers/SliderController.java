package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.SliderService;
import com.tobeto.RentACar.services.dtos.requests.slider.AddSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.DeleteSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.UpdateSliderRequest;
import com.tobeto.RentACar.services.dtos.responses.slider.GetAllSliderResponse;
import com.tobeto.RentACar.services.dtos.responses.slider.GetByIdSliderResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/slider")
public class SliderController {

    private final SliderService sliderService;

    public SliderController(SliderService sliderService) {
        this.sliderService = sliderService;
    }

    @GetMapping
    public List<GetAllSliderResponse> getAll() {
        return sliderService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdSliderResponse getById(@PathVariable int id) {
        return sliderService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteSliderRequest delete(@PathVariable int id) {
        return sliderService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddSliderRequest request) {
        sliderService.add(request);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateSliderRequest request) {
        sliderService.update(request);
    }
}
