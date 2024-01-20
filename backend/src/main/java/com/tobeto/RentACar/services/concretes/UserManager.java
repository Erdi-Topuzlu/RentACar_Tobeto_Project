package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.User;
import com.tobeto.RentACar.repositories.UserRepository;
import com.tobeto.RentACar.rules.user.UserBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.*;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final ModelMapperService modelMapperService;
    private final UserBusinessRulesService userBusinessRulesService;

    private final PasswordEncoder passwordEncoder;


    @Override
    public void add(AddUserRequest request) {
        userBusinessRulesService.checkIfByEmailExists(request.getEmail());

        User user = modelMapperService.dtoToEntity().map(request, User.class);
        userRepository.save(user);
    }

    @Override
    public void update(UpdateUserRequest request) {
        userBusinessRulesService.checkIfByIdExists(request.getId());
        userBusinessRulesService.checkIfByEmailExists(request.getEmail());
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

    @Override
    public boolean existsById(int id) {
        return userRepository.existsById(id);
    }

    @Override
    public void register(RegisterUserRequest registerUserRequest) {
        User user = User.builder()
                .username(registerUserRequest.getUsername())
                .email(registerUserRequest.getEmail())
                .authorities(registerUserRequest.getRoles())
                .password(passwordEncoder.encode(registerUserRequest.getPassword()))
                .build();
        userRepository.save(user);
    }

    @Override
    public String login(LoginUserRequest loginUserRequest) {
        return "";
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found!"));
    }
}


