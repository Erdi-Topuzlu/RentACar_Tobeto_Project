package com.tobeto.RentACar.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.tobeto.RentACar.core.utilities.constant.Constant.SLIDER_PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RequestMapping("/api/v1/sliderImage")
@RestController
@RequiredArgsConstructor
@Tag(name = "Slider Image Controller", description = "Slider Image Endpoints")
public class SliderImageController {

    @GetMapping(value = "/{filename}", produces = {IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE})
    public byte[] getSliderPhoto(@PathVariable String filename) throws IOException {
        return Files.readAllBytes(Paths.get(SLIDER_PHOTO_DIRECTORY + filename));
    }

}
