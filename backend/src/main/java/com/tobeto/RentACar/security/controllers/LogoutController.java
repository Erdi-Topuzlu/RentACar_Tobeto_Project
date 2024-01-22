/*
package com.tobeto.RentACar.security.controllers;

import com.tobeto.RentACar.security.services.LogoutService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/logout")
@Tag(name = "Logout Controller", description = "Logout Endpoints")
@RequiredArgsConstructor
public class LogoutController {

    private final LogoutService logoutService;

    @PostMapping
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Kullanıcı oturumunu sonlandırma işlemleri
        // Örneğin, JWT'yi karaliste (blacklist) eklemek gibi
        logoutService.logout(request);
        // Oturumu sonlandırıldıktan sonra başarılı bir yanıt döndür
        return ResponseEntity.ok("Çıkış başarılı!");
    }
}
*/
