package com.codecool.sneakersStore.repository;

import com.codecool.sneakersStore.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    Client findClientByEmail(String email);
    Client findByUsername(String username);


}