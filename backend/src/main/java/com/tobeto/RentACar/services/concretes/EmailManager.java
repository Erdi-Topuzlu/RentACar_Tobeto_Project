package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.services.abstracts.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailManager implements EmailService {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.verify.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    @Async
    public void sendSimpleMailMessage(String name, String to, String confirmationToken) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("New User Account Verification");
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText("Hello " + name + ",\n\n" +
                    "Thank you for registering. Please click on the below link to activate your account.\n\n" +
                    host + "/api/v1/auth/confirm-account?token=" + confirmationToken);
            javaMailSender.send(message);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void sendMimeMessageWithAttachments(String name, String to, String confirmationToken) {

    }

    @Override
    public void sendMimeMessageWithEmbeddedImages(String name, String to, String confirmationToken) {

    }

    @Override
    public void sendMimeMessageWithEmbeddedFiles(String name, String to, String confirmationToken) {

    }

    @Override
    public void sendHtmlEmail(String name, String to, String confirmationToken) {

    }

    @Override
    public void sendHtmlEmailWithEmbeddedFiles(String name, String to, String confirmationToken) {

    }
}
