package com.tobeto.RentACar.core.utilities.exceptions;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.NoSuchElementException;

@Configuration
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ProblemDetails handleBusinessException(BusinessException businessException){
        ProblemDetails problemDetails = new ProblemDetails();
        problemDetails.setMessage(businessException.getMessage());

        return problemDetails;
    }



    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ProblemDetails handleValidationException(MethodArgumentNotValidException methodArgumentNotValidException){
        ValidationProblemDetails validationProblemDetails = new ValidationProblemDetails();
        validationProblemDetails.setMessage("VALIDATION.EXCEPTION");
        validationProblemDetails.setValidationErrors(new HashMap<String, String>());

        for (FieldError fieldError :
                methodArgumentNotValidException.getBindingResult().getFieldErrors()) {
                validationProblemDetails.getValidationErrors().put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        
        return validationProblemDetails;
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public ProblemDetails handleNoSuchElementException(NoSuchElementException noSuchElementException){
        ProblemDetails problemDetails = new ProblemDetails();
        problemDetails.setMessage("Id Not Found !");
        return problemDetails;
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ProblemDetails handleHttpMessageNotReadableException(HttpMessageNotReadableException httpMessageNotReadableException){
        ProblemDetails problemDetails = new ProblemDetails();
        problemDetails.setMessage(httpMessageNotReadableException.getMessage());
        return problemDetails;
    }

    @ExceptionHandler
    @ResponseStatus(code = HttpStatus.FORBIDDEN)
    public ProblemDetails handleBadCredentialsException(BadCredentialsException badCredentialsException){
        ProblemDetails problemDetails = new ProblemDetails();
        problemDetails.setMessage("E-Mail and password do not match!");
        return problemDetails;
    }
}
