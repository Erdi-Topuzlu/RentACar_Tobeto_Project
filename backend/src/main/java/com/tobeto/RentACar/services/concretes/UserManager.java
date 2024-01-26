package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.user.User;
import com.tobeto.RentACar.repositories.UserRepository;
import com.tobeto.RentACar.rules.user.UserBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.UserService;
import com.tobeto.RentACar.services.dtos.requests.user.*;
import com.tobeto.RentACar.services.dtos.responses.user.GetAllUserResponse;
import com.tobeto.RentACar.services.dtos.responses.user.GetByIdUserResponse;
import io.swagger.v3.oas.annotations.info.Contact;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.tobeto.RentACar.core.utilities.constant.Constant.PHOTO_DIRECTORY;
import static io.swagger.v3.core.util.AnnotationsUtils.getContact;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@AllArgsConstructor
@Service
@Slf4j
public class UserManager implements UserService {
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
    public Optional<User> findByEmail(String username) {
        return userRepository.findByEmail(username);
    }

    // User Photo Upload Url
    @Override
    public String uploadUserPhotoUrl(String id, MultipartFile file) {
        log.info("Saving picture for user with id: {} ", id);
//        GetByIdUserResponse user = getById(Integer.parseInt(id));
        var user = userRepository.findById(Integer.parseInt(id)).orElseThrow();
        String userPhotoUrl = photoFunction.apply(id, file);
        user.setUserPhotoUrl(userPhotoUrl);
        userRepository.save(user);
//        userRepository.save(modelMapperService.dtoToEntity().map(user, User.class));
        return userPhotoUrl;
    }

    private Function<String, String> fileExtension() {
        return filename -> Optional.of(filename)
                .filter(name -> name.contains("."))
                .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1))
                .orElse(".png");
    }

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String fileName = id + fileExtension().apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return  ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/users/userImage/" + fileName)
//                    .path(fileName)
                    .toUriString();
        } catch (Exception e) {
            throw new RuntimeException("Unable to save Image");
        }
    };
}


