package com.tobeto.RentACar.controllers;

import com.tobeto.RentACar.services.abstracts.InvoiceService;
import com.tobeto.RentACar.services.dtos.requests.invoice.AddInvoiceRequest;
import com.tobeto.RentACar.services.dtos.requests.invoice.UpdateInvoiceRequest;
import com.tobeto.RentACar.services.dtos.responses.invoice.GetAllInvoiceResponse;
import com.tobeto.RentACar.services.dtos.responses.invoice.GetByIdInvoiceResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/invoices")
@Tag(name = "Invoice Controller", description = "Invoices Endpoints")
public class InvoicesController {

    private final InvoiceService invoiceService;

    public InvoicesController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    public void add(@RequestBody @Valid AddInvoiceRequest request) {
        invoiceService.add(request);
    }

    @GetMapping
    public List<GetAllInvoiceResponse> getAll() {
        return invoiceService.getAll();
    }

    @GetMapping("/{id}")
    public GetByIdInvoiceResponse getById(@PathVariable int id) {
        return invoiceService.getById(id);
    }

    @PutMapping
    public void update(@RequestBody @Valid UpdateInvoiceRequest request) {
        invoiceService.update(request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        invoiceService.delete(id);
    }
}
