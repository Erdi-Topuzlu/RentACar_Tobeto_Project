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

import java.util.HashMap;
import java.util.Map;

import static com.tobeto.RentACar.core.utilities.EmailUtils.getResetPasswordUrl;
import static com.tobeto.RentACar.core.utilities.EmailUtils.getVerificationUrl;

@Service
@RequiredArgsConstructor
public class EmailManager implements EmailService {
    public static final String NEW_USER_ACCOUNT_VERIFICATION = "New User Account Verification";
    public static final String UTF_8_ENCODING = "UTF-8";
    public static final String EMAIL_TEMPLATE = "emailverificationtemplate";
    public static final String PASSWORD_RESET_TEMPLATE = "forgot_password_template";
    public static final String FORGOT_PASSWORD = "Forgot Password";

    public static final String EMAIL_ACCOUNT_CONFIRMED_TEMPLATE = "account_confirmed";

    private final TemplateEngine templateEngine;

    private final JavaMailSender emailSender;

    @Value("${spring.mail.verify.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    @Async
    public void sendEmailVerification(String name, String to, String confirmationToken) {
        sendEmailVerificationHtml(name, to, confirmationToken);

    }

    @Override
    public String sendAccountConfirmedEmail(String name) {
        Context context = new Context();
        Map<String, Object> variables = new HashMap<>();
        variables.put("name", name);
        context.setVariables(variables);
        String accountConfirmed = templateEngine.process(EMAIL_ACCOUNT_CONFIRMED_TEMPLATE, context);
        return accountConfirmed;
    }

    @Override
    public void againSendEmailVerification(String name, String to, String confirmationToken) {
        sendEmailVerificationHtml(name, to, confirmationToken);
    }

    @Override
    public void sendForgotPasswordResetEmail(String name, String to, String confirmationToken) {
        try {
            Context context = new Context();
            Map<String, Object> variables = new HashMap<>();
            variables.put("name", name);
            variables.put("url", getResetPasswordUrl(confirmationToken));
            variables.put("host", getResetPasswordUrl(confirmationToken));
            context.setVariables(variables);
            String text = templateEngine.process(PASSWORD_RESET_TEMPLATE, context);
            MimeMessage message = getMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, UTF_8_ENCODING);
            helper.setPriority(1);
            helper.setSubject(FORGOT_PASSWORD);
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setText(text, true);
            emailSender.send(message);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }

    private void sendEmailVerificationHtml(String name, String to, String confirmationToken) {
        try {
            Context context = new Context();
            Map<String, Object> variables = new HashMap<>();
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
