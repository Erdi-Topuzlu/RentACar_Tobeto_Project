package com.tobeto.RentACar.services.concretes;

import com.tobeto.RentACar.core.mapper.ModelMapperService;
import com.tobeto.RentACar.entities.Invoice;
import com.tobeto.RentACar.repositories.InvoiceRepository;
import com.tobeto.RentACar.services.abstracts.InvoiceService;
import com.tobeto.RentACar.services.dtos.requests.invoice.AddInvoiceRequest;
import com.tobeto.RentACar.services.dtos.requests.invoice.DeleteInvoiceRequest;
import com.tobeto.RentACar.services.dtos.requests.invoice.UpdateInvoiceRequest;
import com.tobeto.RentACar.services.dtos.responses.invoice.GetAllInvoiceResponse;
import com.tobeto.RentACar.services.dtos.responses.invoice.GetByIdInvoiceResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceManager implements InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ModelMapperService modelMapperService;

    public InvoiceManager(InvoiceRepository invoiceRepository, ModelMapperService modelMapperService) {
        this.invoiceRepository = invoiceRepository;
        this.modelMapperService = modelMapperService;
    }

    @Override
    public void add(AddInvoiceRequest request) {
        Invoice invoice = modelMapperService.dtoToEntity().map(request, Invoice.class);
        invoiceRepository.save(invoice);
    }

    @Override
    public void update(UpdateInvoiceRequest request) {
        Invoice invoice = modelMapperService.dtoToEntity().map(request, Invoice.class);
        invoiceRepository.save(invoice);
    }

    @Override
    public DeleteInvoiceRequest delete(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();
        invoiceRepository.deleteById(invoice.getId());
        DeleteInvoiceRequest response = modelMapperService.entityToDto().map(invoice, DeleteInvoiceRequest.class);
        return response;
    }

    @Override
    public List<GetAllInvoiceResponse> getAll() {
        List<Invoice> invoices = invoiceRepository.findAll();
        List<GetAllInvoiceResponse> invoiceResponses = invoices.stream()
                .map(invoice -> modelMapperService.entityToDto().map(invoice, GetAllInvoiceResponse.class)).toList();
        return invoiceResponses;

    }

    @Override
    public GetByIdInvoiceResponse getById(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow();
        GetByIdInvoiceResponse response = modelMapperService.entityToDto().map(invoice, GetByIdInvoiceResponse.class);
        return response;
    }
}
