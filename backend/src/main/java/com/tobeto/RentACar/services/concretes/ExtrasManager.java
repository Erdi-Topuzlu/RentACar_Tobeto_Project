package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.extras.Extras;
import com.tobeto.RentACar.repositories.ColorRepository;
import com.tobeto.RentACar.repositories.ExtrasRepository;
import com.tobeto.RentACar.services.abstracts.ExtrasService;
import com.tobeto.RentACar.services.dtos.responses.extras.GetAllExtrasResponse;
import com.tobeto.RentACar.services.dtos.responses.extras.GetByIdExtrasResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ExtrasManager implements ExtrasService {

    private final ExtrasRepository extrasRepository;
    private final ModelMapperService modelMapperService;



    @Override
    public List<GetAllExtrasResponse> getAll() {
        List<Extras> extras = extrasRepository.findAll();
        List<GetAllExtrasResponse> extrasResponses = extras.stream()
                .map(extras1 -> modelMapperService.entityToDto()
                .map(extras1,GetAllExtrasResponse.class)).toList();
        return extrasResponses;
    }

    @Override
    public GetByIdExtrasResponse getById(int id) {
        Extras extras = extrasRepository.findById(id).orElseThrow();
        GetByIdExtrasResponse extra = modelMapperService.entityToDto().map(extras,GetByIdExtrasResponse.class);
        return extra;
    }
}
