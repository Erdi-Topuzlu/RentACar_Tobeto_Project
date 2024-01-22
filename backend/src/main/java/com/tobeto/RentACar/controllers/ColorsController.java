package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.ColorService;
import com.tobeto.RentACar.services.dtos.requests.color.AddColorRequest;
import com.tobeto.RentACar.services.dtos.requests.color.DeleteColorRequest;
import com.tobeto.RentACar.services.dtos.requests.color.UpdateColorRequest;
import com.tobeto.RentACar.services.dtos.responses.color.GetAllColorResponse;
import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/colors")
@Tag(name = "Color Controller", description = "Colors Endpoints")
public class ColorsController {

    private final ColorService colorService;

    public ColorsController(ColorService colorService) {
        this.colorService = colorService;
    }

    @PostMapping
    public void add(@RequestBody @Valid AddColorRequest request) {
        colorService.add(request);
    }

    @GetMapping
    public List<GetAllColorResponse> getAll() {
        return colorService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdColorResponse getById(@PathVariable int id) {
        return colorService.getById(id);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateColorRequest request) {
        colorService.update(request);
    }

    @DeleteMapping("/{id}")
    public DeleteColorRequest delete(@PathVariable int id) {
        return colorService.delete(id);
    }
}
