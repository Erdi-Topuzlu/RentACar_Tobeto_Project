package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.services.abstracts.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

import static com.tobeto.RentACar.core.utilities.EmailUtils.getVerificationUrl;

@Service
@RequiredArgsConstructor
public class EmailManager implements EmailService {
    public static final String NEW_USER_ACCOUNT_VERIFICATION = "New User Account Verification";
    public static final String UTF_8_ENCODING = "UTF-8";
    public static final String EMAIL_TEMPLATE = "emailverificationtemplate";
    private final TemplateEngine templateEngine;

    private final JavaMailSender emailSender;

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
            emailSender.send(message);
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
        try {
            Context context = new Context();
            Map<String, Object> variables = new java.util.HashMap<>();
            variables.put("name", name);
            variables.put("url", getVerificationUrl(host, confirmationToken));
            variables.put("host", getVerificationUrl(host, confirmationToken));
            context.setVariables(variables);
            String text = templateEngine.process(EMAIL_TEMPLATE, context);
            MimeMessage message = getMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, UTF_8_ENCODING);
            helper.setPriority(1);
            helper.setSubject(NEW_USER_ACCOUNT_VERIFICATION);
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setText(text, true);
            emailSender.send(message);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }

    }

    @Override
    public void sendHtmlEmailWithEmbeddedFiles(String name, String to, String confirmationToken) {

    }

    private MimeMessage getMimeMessage() {
        return emailSender.createMimeMessage();
    }

    private String getContentId(String filename) {
        return "<" + filename + ">";
    }
}
