package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.core.services.JwtService;
import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.*;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
@CrossOrigin
public class UsersController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @GetMapping
    public List<GetAllUserResponse> getAll(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdUserResponse getById(@PathVariable int id){
        return userService.getById(id);
    }

    @DeleteMapping
    public DeleteUserRequest delete(@PathVariable int id){
        return userService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody @Valid AddUserRequest request){
        userService.add(request);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateUserRequest request){
        userService.update(request);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterUserRequest request) {
        userService.register(request);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public String login(@RequestBody LoginUserRequest loginRequest) {
        // TODO: Auth Service'e taşınmalı
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        if(authentication.isAuthenticated())
        {
            return jwtService.generateToken(loginRequest.getEmail());
        }

        throw new RuntimeException("Kullanıcı adı ya da şifre yanlış");
    }
}
