package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.entities.concretes.user.User;
import com.tobeto.RentACar.services.dtos.requests.user.*;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService{

    void add(AddUserRequest request);
    void update(UpdateUserRequest request , int id);
    DeleteUserRequest delete(int id);

    List<GetAllUserResponse> getAll();

    GetByIdUserResponse getById(int id);

    GetByIdUserResponse getUser();

    boolean existsById(int id);

    Optional<User> findByEmail(String username);

    String uploadUserPhotoUrl(MultipartFile file);

}
