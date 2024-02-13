package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.entities.concretes.user.User;
import com.tobeto.RentACar.repositories.UserRepository;
import com.tobeto.RentACar.rules.user.UserBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.AddUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.ChangePasswordUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.DeleteUserRequest;
import com.tobeto.RentACar.services.dtos.requests.user.UpdateUserRequest;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.tobeto.RentACar.core.utilities.constant.Constant.USER_PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserManager implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ModelMapperService modelMapperService;
    private final UserBusinessRulesService userBusinessRulesService;

    @Override
    public void add(AddUserRequest request) {
        userBusinessRulesService.checkIfByEmailExists(request.getEmail());

        User user = modelMapperService.dtoToEntity().map(request, User.class);
        userRepository.save(user);
    }

    @Override
    public void update(UpdateUserRequest request, int id) {
        userBusinessRulesService.checkIfByIdExists(request.getId());
        //userBusinessRulesService.checkIfByEmailExists(request.getEmail());
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

//    @Override
//    public GetByIdUserResponse getById(int id) {
//        User user = userRepository.findById(id).orElseThrow();
//        GetByIdUserResponse response = modelMapperService.entityToDto().map(user, GetByIdUserResponse.class);
//        return response;
//    }

    // Id olmadan artık jwt authentication filter yöntemi ile ile user bilgilerine ulaşabiliyoruz
    @Override
    public GetByIdUserResponse getUser() {
        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        GetByIdUserResponse response = modelMapperService.entityToDto().map(user, GetByIdUserResponse.class);
        return response;
    }

    @Override
    public boolean existsById(int id) {
        return userRepository.existsById(id);
    }

    // User Photo Upload Url
    @Override
    public String uploadUserPhotoUrl(MultipartFile file) {
        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.info("Saving picture for user with user: {} ",user);
        User response = modelMapperService.entityToDto().map(user, User.class);
        String userPhotoUrl = photoFunction.apply(response.getId(), file);
        response.setUserPhotoUrl(userPhotoUrl);
        userRepository.save(response);
        return userPhotoUrl;
    }

    private Function<String, String> fileExtension() {
        return filename -> Optional.of(filename)
                .filter(name -> name.contains("."))
                .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
                .orElse(".png");
    }

    private final BiFunction<Integer, MultipartFile, String> photoFunction = (id, image) -> {
        String fileName = id + fileExtension().apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(USER_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return  ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/userImage/" + fileName)
//                    .path(fileName)
                    .toUriString();
        } catch (Exception e) {
            throw new RuntimeException(Messages.unableToSaveImg);
        }
    };


    @Override
    public void changePasswordUser(ChangePasswordUserRequest changePasswordRequest, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is not correct
        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException(Messages.currentPswNotCorrect);
        }

        // check if the new password and confirm password are not the same
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new IllegalStateException(Messages.newAndConfirmPswNotSame);
        }

        // check if the new password is the same as the current password
        if (passwordEncoder.matches(changePasswordRequest.getNewPassword(), user.getPassword())) {
            throw new IllegalStateException(Messages.newAndCurrentPswNotSame);
        }

        // change the password
        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        // save the user new password
        userRepository.save(user);

    }
}


