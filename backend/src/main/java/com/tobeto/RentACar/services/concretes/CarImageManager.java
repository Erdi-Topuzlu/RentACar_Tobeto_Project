package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.entities.concretes.carImage.CarImage;
import com.tobeto.RentACar.repositories.CarImageRepository;
import com.tobeto.RentACar.services.abstracts.CarImageService;
import com.tobeto.RentACar.services.dtos.requests.carImage.AddCarImageRequest;
import com.tobeto.RentACar.services.dtos.requests.carImage.DeleteCarImageRequest;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetAllCarImageResponse;
import com.tobeto.RentACar.services.dtos.responses.carImage.GetByIdCarImageResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.tobeto.RentACar.core.utilities.constant.Constant.CAR_IMAGES_PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@AllArgsConstructor
public class CarImageManager implements CarImageService {

    private final CarImageRepository carImageRepository;
    private final ModelMapperService modelMapperService;

    @Override
    public DeleteCarImageRequest delete(int id) {
        CarImage carImage = carImageRepository.findById(id).orElseThrow();
        carImageRepository.deleteById(carImage.getId());
        return modelMapperService.entityToDto().map(carImage, DeleteCarImageRequest.class);
    }

    @Override
    public List<GetAllCarImageResponse> getAll() {
        List<CarImage> carImages = carImageRepository.findAll();
        List<GetAllCarImageResponse> carImageResponses = carImages.stream()
                .map(carImage -> modelMapperService.entityToDto().map(carImage, GetAllCarImageResponse.class)).toList();
        return carImageResponses;
    }

    @Override
    public GetByIdCarImageResponse getById(int id) {
        CarImage carImage = carImageRepository.findById(id).orElseThrow();
        GetByIdCarImageResponse response = modelMapperService.entityToDto().map(carImage, GetByIdCarImageResponse.class);
        return response;
    }

    @Override
    public String addCarImageUrl(Integer carId, MultipartFile file) {
        String carImageUrl = photoFunction.apply(UUID.randomUUID().toString(), file);
        var carsImages = new AddCarImageRequest();
        carsImages.setImgPath(carImageUrl);
        carsImages.setCarId(carId);
        var responseCarImage = modelMapperService.dtoToEntity().map(carsImages, CarImage.class);
        carImageRepository.save(responseCarImage);
        return carImageUrl;
    }

    @Override
    public String updateCarImageUrl(Integer id, MultipartFile file) {
        var carImage = getById(id);
        var responseCarImage = modelMapperService.entityToDto().map(carImage, CarImage.class);
        String carImageUrl = photoFunction.apply(UUID.randomUUID().toString(), file);
        responseCarImage.setImgPath(carImageUrl);
        carImageRepository.save(responseCarImage);
        return carImageUrl;
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
            Path fileStorageLocation = Paths.get(CAR_IMAGES_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/carImage/" + fileName)
                    .toUriString();
        } catch (Exception e) {
            throw new BusinessException(Messages.unableToSaveImg);
        }
    };
}
