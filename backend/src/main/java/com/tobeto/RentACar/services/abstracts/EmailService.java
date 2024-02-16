package com.tobeto.RentACar.services.abstracts;

public interface EmailService {
    void sendEmailVerification(String name, String to, String confirmationToken);
    String sendAccountConfirmedEmail(String name);

    void againSendEmailVerification(String name, String to, String confirmationToken);

}
