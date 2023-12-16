package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.user.AddUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.DeleteUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;

import java.util.List;

public interface UserService {

    void add(AddUserRequest request);
    void update(UpdateUserRequest request);
    DeleteUserRequest delete(int id);

    List<GetAllUserResponse> getAll();

    GetByIdUserResponse getById(int id);




}
