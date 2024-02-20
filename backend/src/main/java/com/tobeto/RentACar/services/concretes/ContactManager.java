package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.concretes.contact.Contact;
import com.tobeto.RentACar.repositories.ContactRepository;
import com.tobeto.RentACar.services.abstracts.ContactService;
import com.tobeto.RentACar.services.dtos.requests.contact.AddContactRequest;
import com.tobeto.RentACar.services.dtos.requests.contact.DeleteContactRequest;
import com.tobeto.RentACar.services.dtos.requests.contact.UpdateContactRequest;
import com.tobeto.RentACar.services.dtos.responses.contact.GetAllContactResponse;
import com.tobeto.RentACar.services.dtos.responses.contact.GetByIdContactResponse;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class ContactManager implements ContactService {

    private final ContactRepository contactRepository;
    private final ModelMapperService modelMapperService;

    @Override
    public void add(AddContactRequest request) {

        Contact contact = modelMapperService.dtoToEntity().map(request, Contact.class);
        contactRepository.save(contact);

    }

    @Override
    public void update(int id, UpdateContactRequest request) {

        Contact contact =modelMapperService.dtoToEntity().map(request, Contact.class);
        contactRepository.save(contact);

    }

    @Override
    public DeleteContactRequest delete(int id) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        contactRepository.deleteById(contact.getId());
        return modelMapperService.entityToDto().map(contact, DeleteContactRequest.class);
    }

    @Override
    public List<GetAllContactResponse> getAll() {
        List<Contact> contacts = contactRepository.findAll();
        List<GetAllContactResponse> contactResponses = contacts.stream()
                .map(contact -> modelMapperService.entityToDto()
                        .map(contact, GetAllContactResponse.class)).toList();
        return contactResponses;
    }

    @Override
    public GetByIdContactResponse getById(int id) {
        Contact contact = contactRepository.findById(id).orElseThrow();
        GetByIdContactResponse response = modelMapperService.entityToDto()
                .map(contact, GetByIdContactResponse.class);
        return response;
    }
}
