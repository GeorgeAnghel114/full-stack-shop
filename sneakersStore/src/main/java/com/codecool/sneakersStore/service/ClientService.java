package com.codecool.sneakersStore.service;

import com.codecool.sneakersStore.model.Client;
import com.codecool.sneakersStore.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService implements UserDetailsService {
    private final ClientRepository clientRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public void addClient(Client client) {
        clientRepository.save(client);
    }
    public void addUserRegister(Client client){
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        client.setEmail(client.getEmail());
        client.setUsername(client.getUsername());
        client.setLastName(client.getLastName());
        client.setFirstName(client.getFirstName());
        client.setUsername(client.getEmail());
        client.getRoles().add("ROLE_USER");
        clientRepository.save(client);
    }
    public Client getClientById(Long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        return optionalClient.orElse(null);
    }

    public Client findByUsername(String email){
        return clientRepository.findClientByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client user = clientRepository.findByUsername(username);

        if (null == user) {
            throw new UsernameNotFoundException("User Not Found with userName " + username);
        }
        return user;
    }
}
