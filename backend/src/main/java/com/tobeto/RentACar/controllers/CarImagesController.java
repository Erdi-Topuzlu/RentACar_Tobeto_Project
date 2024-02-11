package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.CarImageService;
import com.tobeto.RentACar.services.dtos.requests.carImage.DeleteCarImageRequest;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetByIdCarImageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/car-images")
@AllArgsConstructor
@Tag(name = "CarImages Controller", description = "CarImages Endpoints")
public class CarImagesController {
    private final CarImageService carImageService;

    @GetMapping
    public List<GetAllCarImageResponse> getAll() {
        return carImageService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdCarImageResponse getById(@PathVariable int id) {
        return carImageService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteCarImageRequest delete(@PathVariable int id) {
        return carImageService.delete(id);
    }

    @PostMapping
    public ResponseEntity<String> add(@RequestParam("carId") Integer carId, @RequestParam("file") MultipartFile files) {
        var imageUrls = carImageService.addCarImageUrl(carId, files);
        return ResponseEntity.ok(imageUrls);
    }

    @PutMapping
    public ResponseEntity<String> update(@RequestParam("id") Integer id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(carImageService.updateCarImageUrl(id, file));
    }

}
