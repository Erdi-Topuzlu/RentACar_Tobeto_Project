package com.tobeto.RentACar.core.utilities;

import java.util.UUID;

public class EmailUtils {
    public static String getEmailMessage(String name, String host, String token) {
        return "Hello " + name + ",\n\nYour new account has been created. Please click the link below to verify your account. \n\n" +
                getVerificationUrl(host, token) + "\n\nThe support Team";
    }

    public static String getVerificationUrl(String host, String token) {
        return host + "/api/v1/auth/confirm-account?token=" + token;
    }

    String uniqueToken = UUID.randomUUID().toString();
    public static String getResetPasswordUrl(String uniqueToken) {
        return "http://localhost:5173/reset-password?token="+uniqueToken;
    }
}
