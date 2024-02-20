package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.color.Color;
import com.tobeto.RentACar.repositories.ColorRepository;
import com.tobeto.RentACar.rules.color.ColorBusinessRulesService;
import com.tobeto.RentACar.services.abstracts.ColorService;
import com.tobeto.RentACar.services.dtos.requests.color.AddColorRequest;
import com.tobeto.RentACar.services.dtos.requests.color.DeleteColorRequest;
import com.tobeto.RentACar.services.dtos.requests.color.UpdateColorRequest;
import com.tobeto.RentACar.services.dtos.responses.color.GetAllColorResponse;
import com.tobeto.RentACar.services.dtos.responses.color.GetByIdColorResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorManager implements ColorService {

    private final ColorRepository colorRepository;
    private final ModelMapperService modelMapperService;
    private final ColorBusinessRulesService colorBusinessRulesService;

    public ColorManager(ColorRepository colorRepository, ModelMapperService modelMapperService, ColorBusinessRulesService colorBusinessRulesService) {
        this.colorRepository = colorRepository;
        this.modelMapperService = modelMapperService;
        this.colorBusinessRulesService = colorBusinessRulesService;
    }

    @Override
    public void add(AddColorRequest request) {
        colorBusinessRulesService.checkIfColorNameExists(request.getName());
        Color color = modelMapperService.dtoToEntity().map(request, Color.class);
        colorRepository.save(color);
    }

    @Override
    public void update(UpdateColorRequest request) {
        colorBusinessRulesService.checkIfByIdExists(request.getId());
        colorBusinessRulesService.checkIfColorNameExists(request.getName());
        Color color = modelMapperService.dtoToEntity().map(request, Color.class);
        colorRepository.save(color);
    }


    @Override
    public DeleteColorRequest delete(int id) {
        Color color = colorRepository.findById(id).orElseThrow();
        colorRepository.deleteById(color.getId());
        return modelMapperService.entityToDto().map(color, DeleteColorRequest.class);
    }

    @Override
    public List<GetAllColorResponse> getAll() {
        List<Color> colors = colorRepository.findAll();
        List<GetAllColorResponse> colorResponses = colors.stream()
                .map(color -> modelMapperService.entityToDto().map(color, GetAllColorResponse.class)).toList();
        return colorResponses;
    }

    @Override
    public GetByIdColorResponse getById(int id) {
        Color color = colorRepository.findById(id).orElseThrow();
        GetByIdColorResponse response = modelMapperService.entityToDto().map(color, GetByIdColorResponse.class);
        return response;
    }

    @Override
    public boolean existsById(int id) {
        return colorRepository.existsById(id);
    }


}
