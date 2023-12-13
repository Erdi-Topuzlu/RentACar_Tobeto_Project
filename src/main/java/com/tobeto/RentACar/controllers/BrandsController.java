package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.BrandService;
import com.tobeto.RentACar.services.dtos.requests.brand.AddBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.DeleteBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.UpdateBrandRequest;
import com.tobeto.RentACar.services.dtos.responses.brand.GetAllBrandResponse;
import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/brands")
public class BrandsController {

    private final BrandService brandService;

    public BrandsController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public List<GetAllBrandResponse> getAll() {
        return brandService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdBrandResponse getById(@PathVariable int id) {
        return brandService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteBrandRequest delete(@PathVariable int id) {
       return brandService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddBrandRequest request) {
        brandService.add(request);
    }

    @PutMapping
    public void update(@RequestBody UpdateBrandRequest request) {
        brandService.update(request);
    }
}
