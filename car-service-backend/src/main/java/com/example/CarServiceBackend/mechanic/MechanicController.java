package com.example.CarServiceBackend.mechanic;

import com.example.CarServiceBackend.client.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path="api/mechanics")
public class MechanicController {
    private final MechanicService mechanicService;

    @Autowired
    public MechanicController(MechanicService mechanicService) {
        this.mechanicService = mechanicService;
    }

    @GetMapping
    public List<Mechanic> getMechanics() {return mechanicService.getMechanics();}

    @GetMapping(path="{mechanicId}")
    public Mechanic getMechanicById(@PathVariable("mechanicId") Long mechanicId) {return mechanicService.getMechanicById(mechanicId);}
}
