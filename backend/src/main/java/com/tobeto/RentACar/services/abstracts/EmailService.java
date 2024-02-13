package com.tobeto.RentACar.services.abstracts;

public interface EmailService {
    void sendSimpleMailMessage(String name, String to, String confirmationToken);
    void sendMimeMessageWithAttachments(String name, String to, String confirmationToken);
    void sendMimeMessageWithEmbeddedImages(String name, String to, String confirmationToken);
    void sendMimeMessageWithEmbeddedFiles(String name, String to, String confirmationToken);
    void sendHtmlEmail(String name, String to, String confirmationToken);
    void sendHtmlEmailWithEmbeddedFiles(String name, String to, String confirmationToken);
}
