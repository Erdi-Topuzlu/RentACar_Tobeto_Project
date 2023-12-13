package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.Model;
import com.tobeto.RentACar.repositories.ModelRepository;
import com.tobeto.RentACar.services.abstracts.ModelService;
import com.tobeto.RentACar.services.dtos.requests.model.AddModelRequest;
import com.tobeto.RentACar.services.dtos.requests.model.DeleteModelRequest;
import com.tobeto.RentACar.services.dtos.requests.model.UpdateModelRequest;
import com.tobeto.RentACar.services.dtos.responses.model.GetAllModelResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ModelManager implements ModelService {
    private final ModelRepository modelRepository;
    private final ModelMapperService modelMapperService;

    @Override
    public void add(AddModelRequest request) {
        Model model = modelMapperService.dtoToEntity().map(request, Model.class);
        modelRepository.save(model);
    }

    @Override
    public void update(UpdateModelRequest request) {
        Model model =modelMapperService.dtoToEntity().map(request, Model.class);
        modelRepository.save(model);
    }

    @Override
    public DeleteModelRequest delete(int id) {
        Model model = modelRepository.findById(id).orElseThrow();
        modelRepository.deleteById(model.getId());
        return modelMapperService.entityToDto().map(model, DeleteModelRequest.class);
    }

    @Override
    public List<GetAllModelResponse> getAll() {
        List<Model>models = modelRepository.findAll();
        List<GetAllModelResponse>modelResponses = models.stream()
                .map(model -> modelMapperService.entityToDto().map(model, GetAllModelResponse.class)).toList();
        return modelResponses;
    }

    @Override
    public GetByIdModelResponse getById(int id) {
        Model model = modelRepository.findById(id).orElseThrow();
        GetByIdModelResponse response = modelMapperService.entityToDto()
                .map(model, GetByIdModelResponse.class);
        return response;
    }


}
