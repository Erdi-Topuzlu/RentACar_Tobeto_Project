package com.tobeto.RentACar.core.mapper;

import org.modelmapper.ModelMapper;

public interface ModelMapperService {
    ModelMapper entityToDto();
    ModelMapper dtoToEntity();
}
