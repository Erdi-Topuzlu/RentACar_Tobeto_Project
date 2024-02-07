package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.AddUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.ChangePasswordUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.DeleteUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
//@CrossOrigin
@Tag(name = "Users Controller", description = "Users Endpoints")
public class UsersController {
    private final UserService userService;

    @GetMapping("/getAll")
    public List<GetAllUserResponse> getAll() {
        return userService.getAll();
    }

//    @GetMapping("/{id}")
//    public GetByIdUserResponse getById(@PathVariable int id) {
//        return userService.getById(id);
//    }

    @GetMapping
    public GetByIdUserResponse getUser() {
        return userService.getUser();
    }

    @DeleteMapping
    public DeleteUserRequest delete(@PathVariable int id) {
        return userService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddUserRequest request) {
        userService.add(request);
    }

    @PatchMapping("/{id}")
    public void update(@RequestBody @Valid UpdateUserRequest request, @PathVariable int id) {
        userService.update(request, id);
    }

    @PatchMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordUserRequest changePasswordRequest, Principal connectedUser) {
        userService.changePasswordUser(changePasswordRequest, connectedUser);
        return ResponseEntity.ok("Password changed successfully!");
    }

}
