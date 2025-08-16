package edu.amrita.agroconnect.controller;

import edu.amrita.agroconnect.model.Produce;
import edu.amrita.agroconnect.service.ProduceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buyer/produce")
public class BuyerProduceController {

    private final ProduceService produceService;

    public BuyerProduceController(ProduceService produceService) {
        this.produceService = produceService;
    }

    // ✅ Explicit endpoint for fetching all produce
    @GetMapping("/all")
    public ResponseEntity<List<Produce>> getAllProduce() {
        List<Produce> produceList = produceService.getAllProduce();
        return ResponseEntity.ok(produceList);
    }

    // ✅ Fetch produce by ID
    @GetMapping("/{id}")
    public ResponseEntity<Produce> getProduceById(@PathVariable Long id) {
        Produce produce = produceService.getProduceById(id);
        if (produce == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(produce);
    }
}
