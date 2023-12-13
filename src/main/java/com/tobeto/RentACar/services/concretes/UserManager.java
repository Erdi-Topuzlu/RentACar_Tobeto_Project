package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.User;
import com.tobeto.RentACar.repositories.UserRepository;
import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.AddUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.DeleteUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final ModelMapperService modelMapperService;

    public UserManager(UserRepository userRepository, ModelMapperService modelMapperService) {
        this.userRepository = userRepository;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public void add(AddUserRequest request) {
        User user = modelMapperService.dtoToEntity().map(request, User.class);
        userRepository.save(user);
    }

    @Override
    public void update(UpdateUserRequest request) {
        User user = modelMapperService.dtoToEntity().map(request, User.class);
        userRepository.save(user);
    }

    @Override
    public DeleteUserRequest delete(int id) {
        User user = userRepository.findById(id).orElseThrow();
        userRepository.deleteById(user.getId());
        return modelMapperService.entityToDto().map(user, DeleteUserRequest.class);
    }

    @Override
    public List<GetAllUserResponse> getAll() {
        List<User> users = userRepository.findAll();
        List<GetAllUserResponse> userResponses = users.stream()
                .map(user -> modelMapperService.entityToDto().map(user, GetAllUserResponse.class)).toList();
        return userResponses;
    }

    @Override
    public GetByIdUserResponse getById(int id) {
        User user = userRepository.findById(id).orElseThrow();
        GetByIdUserResponse response = modelMapperService.entityToDto().map(user, GetByIdUserResponse.class);
        return response;
    }
}
