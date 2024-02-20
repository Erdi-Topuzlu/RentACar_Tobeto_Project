package com.tobeto.RentACar.rules.Invoice;

import com.tobeto.RentACar.core.utilities.exceptions.BusinessException;
import com.tobeto.RentACar.core.utilities.exceptions.Messages;
import com.tobeto.RentACar.repositories.InvoiceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class InvoiceBusinessRulesManager implements InvoiceBusinessRulesService {
    private final InvoiceRepository invoiceRepository;
    @Override
    public void checkIfByIdExists(int id) {
        if (!invoiceRepository.existsById(id)) {
            throw new BusinessException(Messages.invoiceIdNotFound);
        }
    }
}
