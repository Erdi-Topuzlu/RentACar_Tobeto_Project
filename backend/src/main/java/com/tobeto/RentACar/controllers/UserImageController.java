package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.tobeto.RentACar.core.utilities.constant.Constant.USER_PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("api/v1/userImage")
@AllArgsConstructor
@Tag(name = "Users Image Controller", description = "Users Image Endpoints")
public class UserImageController {
    private final UserService userService;


    @PutMapping()
    public ResponseEntity<String> uploadUserPhoto(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(userService.uploadUserPhotoUrl(file));
    }

    @GetMapping(value = "/{filename}", produces = {IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE})
    public byte[] getUserPhoto(@PathVariable String filename) throws IOException {
        return Files.readAllBytes(Paths.get(USER_PHOTO_DIRECTORY + filename));
    }

}
