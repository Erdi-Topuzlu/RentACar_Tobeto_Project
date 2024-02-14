package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.services.abstracts.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
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

    private MimeMessage getMimeMessage() {
        return emailSender.createMimeMessage();
    }

}