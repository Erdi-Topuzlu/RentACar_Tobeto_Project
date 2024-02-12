package com.tobeto.RentACar.services.concretes;


import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.repositories.BrandRepository;
import com.tobeto.RentACar.rules.brand.BrandBusinessRulesService;
import com.tobeto.RentACar.services.dtos.requests.brand.AddBrandRequest;
import com.tobeto.RentACar.services.dtos.requests.brand.UpdateBrandRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import static org.junit.jupiter.api.Assertions.assertThrows;


class BrandManagerTest {
    private BrandManager brandManager;

    @Mock
    private BrandRepository brandRepository;
    @Mock
    private ModelMapperService mockModelMapperService;
    @Mock
    private BrandBusinessRulesService mockBrandBusinessRulesService;


    @BeforeEach
    void setUp(){

        MockitoAnnotations.openMocks(this);

        mockBrandBusinessRulesService = Mockito.mock(BrandBusinessRulesService.class);

        brandManager = new BrandManager(brandRepository, mockModelMapperService, mockBrandBusinessRulesService);

    }

    @AfterEach
    void tearDown(){}

    @Test
    void brandWithSameIdShouldNotExist(){

        UpdateBrandRequest updateBrandRequest = new UpdateBrandRequest();
        updateBrandRequest.setId(1);

        Mockito.when(brandRepository.existsById(updateBrandRequest.getId())).thenReturn(true);
        assertThrows(RuntimeException.class, () -> {
            brandManager.update(updateBrandRequest);
        });
    }

    @Test
    void brandWithSameNameShouldNotExist(){

        AddBrandRequest addBrandRequest = new AddBrandRequest();
        addBrandRequest.setName("BMW");

        Mockito.when(brandRepository.existsByName(addBrandRequest.getName()))
                .thenReturn(true);

        assertThrows(RuntimeException.class, () -> {
            brandManager.add(addBrandRequest);
        });

        /*UpdateBrandRequest updateBrandRequest =new UpdateBrandRequest();
        updateBrandRequest.setName("BMW");

        Mockito.when(brandRepository.existsByName(updateBrandRequest.getName()))
                .thenReturn(true);

        assertThrows(RuntimeException.class, () ->{
            brandManager.update(updateBrandRequest);
        });*/


    }

    @Test
    void successfull() {
        MockitoAnnotations.openMocks(this);
        mockModelMapperService = Mockito.mock(ModelMapperService.class);

        Mockito.when(mockModelMapperService.dtoToEntity())
                .thenReturn(new ModelMapper());

        brandManager = new BrandManager(brandRepository, mockModelMapperService, mockBrandBusinessRulesService);

        AddBrandRequest addBrandRequest = new AddBrandRequest();
        addBrandRequest.setName("BMW");

        brandManager.add(addBrandRequest);
        assert true;
    }

}