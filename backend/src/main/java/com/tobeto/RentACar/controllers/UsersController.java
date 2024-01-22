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
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping
    public void update(@RequestBody @Valid UpdateUserRequest request) {
        userService.update(request);
    }

}
