package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.ContactService;
import com.tobeto.RentACar.services.dtos.requests.contact.AddContactRequest;
import com.tobeto.RentACar.services.dtos.requests.contact.DeleteContactRequest;
import com.tobeto.RentACar.services.dtos.requests.contact.UpdateContactRequest;
import com.tobeto.RentACar.services.dtos.responses.contact.GetAllContactResponse;
import com.tobeto.RentACar.services.dtos.responses.contact.GetByIdContactResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/contacts")
@Tag(name = "Contact Controller", description = "Contacts Endpoints")
@Data
public class ContactsController {

    private final ContactService contactService;

    @PostMapping
    public void add(@RequestBody @Valid AddContactRequest request){
        contactService.add(request);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable int id, @RequestBody @Valid UpdateContactRequest request){
        contactService.update(id,request);
    }

    @DeleteMapping("/{id}")
    public DeleteContactRequest delete(@PathVariable int id){
        return contactService.delete(id);
    }

    @GetMapping("/getAll")
    public List<GetAllContactResponse> getAll(){
        return contactService.getAll();
    }

    @GetMapping("/getById/{id}")
    public GetByIdContactResponse getById(@PathVariable int id){
        return contactService.getById(id);
    }

}
