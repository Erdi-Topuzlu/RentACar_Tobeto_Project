package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.entities.concretes.user.User;
import com.tobeto.RentACar.services.dtos.requests.user.AddUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.ChangePasswordUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.DeleteUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.register.RegisterUserRequest;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

public interface UserService{

//    void saveUser(RegisterUserRequest user);
//
//    Boolean verifyConfirmationToken(String confirmationToken);
    void add(AddUserRequest request);
    void update(UpdateUserRequest request , int id);
    DeleteUserRequest delete(int id);

    List<GetAllUserResponse> getAll();

//    GetByIdUserResponse getById(int id);

    GetByIdUserResponse getUser();

    boolean existsById(int id);

    String uploadUserPhotoUrl(MultipartFile file);

    void changePasswordUser(ChangePasswordUserRequest changePasswordRequest, Principal connectedUser);

}
