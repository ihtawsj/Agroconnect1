package edu.amrita.agroconnect.service;

import edu.amrita.agroconnect.model.Produce;
import edu.amrita.agroconnect.model.User; // ✅ This was missing
import edu.amrita.agroconnect.repository.ProduceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduceService {

    private final ProduceRepository produceRepository;

    public ProduceService(ProduceRepository produceRepository) {
        this.produceRepository = produceRepository;
    }

    public List<Produce> getAllProduce() {
        return produceRepository.findAll();
    }

    public Produce getProduceById(Long id) {
        return produceRepository.findById(id).orElse(null);
    }

    // ✅ Add produce by a farmer
    public Produce addProduce(Produce produce, User farmer) {
        produce.setFarmer(farmer);
        return produceRepository.save(produce);
    }

    // ✅ Get produce uploaded by a farmer
    public List<Produce> getProduceByFarmer(User farmer) {
        return produceRepository.findByFarmer(farmer);
    }

    // ✅ Delete produce, with ownership check
    public void deleteProduce(Long id, User farmer) {
        Produce produce = produceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produce not found"));
        if (!produce.getFarmer().getId().equals(farmer.getId())) {
            throw new RuntimeException("Unauthorized to delete this produce");
        }
        produceRepository.delete(produce);
    }
}
