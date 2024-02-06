package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.ExtrasService;
import com.tobeto.RentACar.services.dtos.responses.extras.GetAllExtrasResponse;
import com.tobeto.RentACar.services.dtos.responses.extras.GetByIdExtrasResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/extras")
@Tag(name = "Extras Controller", description = "Extras Endpoints")
public class ExtrasController {

    private final ExtrasService extrasService;

    @GetMapping
    public List<GetAllExtrasResponse> getAll() {
        return extrasService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdExtrasResponse getById(@PathVariable int id) {
        return extrasService.getById(id);
    }
}
