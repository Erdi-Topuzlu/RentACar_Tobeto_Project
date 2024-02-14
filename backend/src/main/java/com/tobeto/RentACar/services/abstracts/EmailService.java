package com.tobeto.RentACar.services.abstracts;

public interface EmailService {
    void sendHtmlEmail(String name, String to, String confirmationToken);
}
