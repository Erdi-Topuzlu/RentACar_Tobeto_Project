package com.tobeto.RentACar.services.concretes;


import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.repositories.BrandRepository;
import com.tobeto.RentACar.rules.brand.BrandBusinessRulesManager;
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

import static org.junit.jupiter.api.Assertions.*;


class BrandManagerTest {
    private BrandManager brandManager;

    @Mock
    private BrandRepository brandRepository;
    @Mock
    private ModelMapperService mockModelMapperService;
    @Mock
    private BrandBusinessRulesService brandBusinessRulesService;


    @BeforeEach
    void setUp(){

        MockitoAnnotations.openMocks(this);

        brandManager = new BrandManager(brandRepository, mockModelMapperService,brandBusinessRulesService);

    }

    @AfterEach
    void tearDown(){}


    @Test
    void brandWithSameIdShouldThrowBusinessException(){

        UpdateBrandRequest updateBrandRequest = new UpdateBrandRequest();
        updateBrandRequest.setId(1);

        Mockito.when(brandRepository.existsById(1)).thenReturn(true);
        assertThrows(RuntimeException.class, () -> {
            brandManager.update(updateBrandRequest);
        });
    }

    @Test
    void brandWithSameNameShouldThrowBusinessException(){
        Mockito.doThrow(new BusinessException(Messages.brandNameAlreadyExist))
                .when(brandBusinessRulesService)
                .checkIfBrandNameExists(Mockito.anyString());


        AddBrandRequest addBrandRequest = new AddBrandRequest();
        addBrandRequest.setName("Tesla");

        Mockito.when(brandRepository.existsByName("Tesla"))
                .thenReturn(true);

        assertThrows(BusinessException.class, () -> {
            brandManager.add(addBrandRequest);
        });


        UpdateBrandRequest updateBrandRequest =new UpdateBrandRequest();
        updateBrandRequest.setName("Tesla");

        Mockito.when(brandRepository.existsByName("Tesla"))
                .thenReturn(true);

        assertThrows(BusinessException.class, () ->{
            brandManager.update(updateBrandRequest);
        });


    }

    @Test
    void addBrandSuccessfully() {
        Mockito.when(mockModelMapperService.dtoToEntity()).thenReturn(new ModelMapper());
        AddBrandRequest addBrandRequest = new AddBrandRequest();
        addBrandRequest.setName("BMW");

        brandManager.add(addBrandRequest);

    }

}