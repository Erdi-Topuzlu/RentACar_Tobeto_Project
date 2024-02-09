package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.SliderService;
import com.tobeto.RentACar.services.dtos.requests.slider.AddSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.DeleteSliderRequest;
import com.tobeto.RentACar.services.dtos.requests.slider.UpdateSliderRequest;
import com.tobeto.RentACar.services.dtos.responses.slider.GetAllSliderResponse;
import com.tobeto.RentACar.services.dtos.responses.slider.GetByIdSliderResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/slider")
@RequiredArgsConstructor
@Tag(name = "Slider Controller", description = "Slider Endpoints")
public class SliderController {

    private final SliderService sliderService;

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

    @PatchMapping
    public void update(@RequestBody @Valid UpdateSliderRequest request) {
        sliderService.update(request);
    }

    @PutMapping
    public ResponseEntity<String> uploadSliderPhoto(@RequestParam("id") Integer id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(sliderService.uploadSliderPhotoUrl(id, file));
    }
}
