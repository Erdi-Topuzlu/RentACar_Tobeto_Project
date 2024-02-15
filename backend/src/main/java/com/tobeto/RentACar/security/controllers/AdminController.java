package com.tobeto.RentACar.security.controllers;

import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin Controller", description = "Admin Controller")
@RequiredArgsConstructor
public class AdminController {
    private  final UserService userService;

    @Operation(
            summary = "This is a summary for Admin get endpoint",
            description = "Get endpoint for Admin",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Success"
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Unauthorized / Invalid JWT Token"
                    ),
            }
    )
    @GetMapping
    public String get() {
        return "GET:: Admin Controller";
    }

    @PostMapping
    @Hidden
    public String post() {
        return "POST:: Admin Controller";
    }

    @PutMapping("/{id}")
    public void update(@RequestBody @Valid UpdateUserRequest request, @PathVariable int id) {
        userService.update(request, id);
    }

    @DeleteMapping
    public String delete() {
        return "DELETE:: Admin Controller";
    }


}
