package com.example.CarServiceBackend.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path="api/clients")
public class ClientController {

    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

    @GetMapping(path="{clientId}")
    public Client getClientById(@PathVariable("clientId") Long clientId) {return clientService.getClientById(clientId);}

    @GetMapping(path="byEmail/{clientEmail}")
    public Client getClientByEmail(@PathVariable("clientEmail") String email) {
        return clientService.getClientByEmail(email);
    }

    @PostMapping
    public Client registerNewClient(@RequestBody Client client) {
        clientService.addNewClient(client);
        return clientService.getClientById(client.getId());
    }

    @DeleteMapping(path="delete/{clientId}")
    public void deleteClient(@PathVariable("clientId") Long clientId) {
        clientService.deleteClient(clientId);
    }

//    @PutMapping(path="update/{clientId}")
//    public void updateClient(@PathVariable("clientId") Long clientId,
//                              @RequestParam(required = false) String name,
//                              @RequestParam(required = false) String email,
//                             @RequestParam(required = false) LocalDate dob) {
//        clientService.updateClient(clientId, name, email, dob);
//    }
    @PutMapping(path="update/{clientId}")
    public void updateClient(@PathVariable("clientId") Long clientId,
                             @RequestBody Client client) {
        clientService.updateClientWithObject(clientId, client);
    }
}
