package com.tobeto.RentACar.repositories;

import com.tobeto.RentACar.entities.concretes.contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
}
