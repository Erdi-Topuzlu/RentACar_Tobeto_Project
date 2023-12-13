package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.data.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.Brand;
import com.tobeto.RentACar.repositories.BrandRepository;
import com.tobeto.RentACar.services.abstracts.BrandService;
import com.tobeto.RentACar.services.dtos.requests.brand.AddBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.DeleteBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.UpdateBrandRequest;
import com.tobeto.RentACar.services.dtos.responses.brand.GetAllBrandResponse;
import com.tobeto.RentACar.services.dtos.responses.brand.GetByIdBrandResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandManager implements BrandService {

    private final BrandRepository brandRepository;
    private final ModelMapperService modelMapperService;

    public BrandManager(BrandRepository brandRepository, ModelMapperService modelMapperService) {
        this.brandRepository = brandRepository;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public void add(AddBrandRequest request) {
        Brand brand = modelMapperService.dtoToEntity().map(request, Brand.class);
        brandRepository.save(brand);
    }

    @Override
    public void update(UpdateBrandRequest request) {
        Brand brand = modelMapperService.dtoToEntity().map(request, Brand.class);
        brandRepository.save(brand);

    }

    @Override
    public DeleteBrandRequest delete(int id) {
        Brand brand = brandRepository.findById(id).orElseThrow();
        brandRepository.deleteById(brand.getId());
        return modelMapperService.entityToDto().map(brand, DeleteBrandRequest.class);
    }

    @Override
    public List<GetAllBrandResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();
        List<GetAllBrandResponse> brandResponses = brands.stream()
                .map(brand -> modelMapperService.entityToDto().map(brand, GetAllBrandResponse.class)).collect(Collectors.toList());
        return brandResponses;
    }

    @Override
    public GetByIdBrandResponse getById(int id) {
        Brand brand = brandRepository.findById(id).orElseThrow();
        GetByIdBrandResponse response = modelMapperService.entityToDto().map(brand, GetByIdBrandResponse.class);
        return response;
    }
}
