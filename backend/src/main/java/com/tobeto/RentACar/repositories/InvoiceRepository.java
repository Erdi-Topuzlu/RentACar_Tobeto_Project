package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.invoice.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    boolean existsById (int id);
}
