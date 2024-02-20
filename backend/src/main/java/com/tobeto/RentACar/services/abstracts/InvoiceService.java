package com.tobeto.RentACar.services.abstracts;

import com.tobeto.RentACar.services.dtos.requests.invoice.AddInvoiceRequest;
import com.tobeto.RentACar.services.dtos.requests.invoice.DeleteInvoiceRequest;
import com.tobeto.RentACar.services.dtos.requests.invoice.UpdateInvoiceRequest;
import com.tobeto.RentACar.services.dtos.responses.invoice.GetAllInvoiceResponse;
import com.tobeto.RentACar.services.dtos.responses.invoice.GetByIdInvoiceResponse;

import java.util.List;

public interface InvoiceService {
    void add(AddInvoiceRequest request);

    void update(UpdateInvoiceRequest request);

    DeleteInvoiceRequest delete(int id);

    List<GetAllInvoiceResponse> getAll();

    GetByIdInvoiceResponse getById(int id);
}
