package com.example.CarServiceBackend.client;

import com.example.CarServiceBackend.order.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public Client getClientById(Long clientId) {
        Optional<Client> optionalClient = clientRepository.findById(clientId);
        if (optionalClient.isPresent()) {
            return optionalClient.get();
        }
        throw new IllegalStateException("No client with such id exists");}

    public Client getClientByEmail(String email) {
        Optional<Client> optionalClient = clientRepository.findClientByEmail(email);
        if (optionalClient.isPresent()) {
            return optionalClient.get();
        }
        throw new IllegalStateException("No client with such email exists");
    }

    public void addNewClient(Client client){
        Optional<Client> clientOptional = clientRepository.findClientByEmail(client.getEmail());
        if (clientOptional.isPresent()) {
            throw new IllegalStateException("Email is taken");
        }
        clientRepository.save(client);
    }

    public void deleteClient(Long clientId) {
        boolean exists = clientRepository.existsById(clientId);
        if (!exists) {
            throw new IllegalStateException("No student with id: " + clientId);
        }
        clientRepository.deleteById(clientId);
    }

    @Transactional
    public void updateClient(Long clientId, String name, String email, LocalDate dob){
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Student with id " + clientId + " does not exist"));
        if (name != null && name.length() > 0 && !Objects.equals(client.getName(), name)){
            client.setName(name);
        }
        if (dob != null){
            client.setDob(dob);
        }
        if (email != null && email.length() > 0 && !Objects.equals(client.getEmail(), email)){
            Optional<Client> clientOptional = clientRepository.findClientByEmail(email);
            if (clientOptional.isPresent()) {
                throw new IllegalStateException("Such email is already taken by someone else");
            }
            client.setEmail(email);
        }
    }
    @Transactional
    public void updateClientWithObject(Long clientId, Client client){
        Client clientToUpdate = clientRepository.findById(clientId)
                .orElseThrow(() -> new IllegalStateException("Student with id " + clientId + " does not exist"));
        clientToUpdate.setName(client.getName());
        clientToUpdate.setDob(client.getDob());
        clientToUpdate.setEmail(client.getEmail());

    }
}
