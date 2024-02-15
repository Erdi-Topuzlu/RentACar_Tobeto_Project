package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.contact.AddContactRequest;
import com.tobeto.RentACar.services.dtos.requests.contact.DeleteContactRequest;
import com.tobeto.RentACar.services.dtos.requests.contact.UpdateContactRequest;
import com.tobeto.RentACar.services.dtos.responses.contact.GetAllContactResponse;
import com.tobeto.RentACar.services.dtos.responses.contact.GetByIdContactResponse;

import java.util.List;

public interface ContactService {

    void add(AddContactRequest request);

    void update(int id, UpdateContactRequest request);

    DeleteContactRequest delete(int id);

    List<GetAllContactResponse> getAll();

    GetByIdContactResponse getById(int id);

}
