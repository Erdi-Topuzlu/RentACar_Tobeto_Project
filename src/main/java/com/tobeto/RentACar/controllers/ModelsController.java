package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.ModelService;
import com.tobeto.RentACar.services.dtos.requests.model.AddModelRequest;
import com.tobeto.RentACar.services.dtos.requests.model.DeleteModelRequest;
import com.tobeto.RentACar.services.dtos.requests.model.UpdateModelRequest;
import com.tobeto.RentACar.services.dtos.responses.model.GetAllModelResponse;
import com.tobeto.RentACar.services.dtos.responses.model.GetByIdModelResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/models")
@AllArgsConstructor
public class ModelsController {
    private final ModelService modelService;

    @GetMapping
    public List<GetAllModelResponse>getAll(){
        return modelService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdModelResponse getById(@PathVariable int id){
        return modelService.getById(id);
    }

    @DeleteMapping("/{id}")
    public DeleteModelRequest delete(@PathVariable int id){
        return modelService.delete(id);
    }

    @PostMapping
    public void add(@RequestBody AddModelRequest request){
        modelService.add(request);
    }

    @PutMapping
    public void update(@RequestBody UpdateModelRequest request){
        modelService.update(request);
    }

}
