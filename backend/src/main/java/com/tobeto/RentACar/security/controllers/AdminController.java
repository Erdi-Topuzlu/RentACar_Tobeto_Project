package com.tobeto.RentACar.security.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@Tag(name = "Admin Controller", description = "Admin Controller")
public class AdminController {

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

    @PutMapping
    public String put() {
        return "PUT:: Admin Controller";
    }

    @DeleteMapping
    public String delete() {
        return "DELETE:: Admin Controller";
    }


}
