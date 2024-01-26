package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.AddUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.DeleteUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.tobeto.RentACar.core.utilities.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
//@CrossOrigin
@Tag(name = "Users Controller", description = "Users Endpoints")
public class UsersController {
    private final UserService userService;

    @GetMapping
    public List<GetAllUserResponse> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdUserResponse getById(@PathVariable int id) {
        return userService.getById(id);
    }

    @DeleteMapping
    public DeleteUserRequest delete(@PathVariable int id) {
        return userService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddUserRequest request) {
        userService.add(request);
    }

    @PutMapping("/{id}")
    public void update(@RequestBody @Valid UpdateUserRequest request, @PathVariable int id) {
        userService.update(request,id);
    }

    @PutMapping("/userImage")
    public ResponseEntity<String> uploadUserPhoto(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(userService.uploadUserPhotoUrl(id, file));
    }

    @GetMapping(value = "/userImage/{filename}", produces = {IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE})
    public byte[] getUserPhoto(@PathVariable String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }

}
