package com.example.CarServiceBackend.mechanic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MechanicService {
    private final MechanicRepository mechanicRepository;

    @Autowired
    public MechanicService(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    public List<Mechanic> getMechanics() {return mechanicRepository.findAll();}

    public Mechanic getMechanicById(Long mechanicId) {
        Optional<Mechanic> optionalMechanic =  mechanicRepository.findById(mechanicId);
        if (optionalMechanic.isPresent()) {
            return optionalMechanic.get();
        }
        throw new IllegalStateException("No mechanic with such id exists");
    }
}
