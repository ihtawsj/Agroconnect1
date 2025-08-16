package edu.amrita.agroconnect.controller;

import edu.amrita.agroconnect.model.Produce;
import edu.amrita.agroconnect.model.User;
import edu.amrita.agroconnect.repository.UserRepository;
import edu.amrita.agroconnect.service.ProduceService;
import edu.amrita.agroconnect.service.ImageStorageService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/farmer/produce")
public class FarmerProduceController {

    private final ProduceService produceService;
    private final UserRepository userRepository;
    private final ImageStorageService imageStorageService;

    public FarmerProduceController(ProduceService produceService,
                                   UserRepository userRepository,
                                   ImageStorageService imageStorageService) {
        this.produceService = produceService;
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }

    // ✅ Add produce with optional image
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Produce> addProduce(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("quantity") int quantity,
            @RequestParam("price") double price,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Principal principal) {

        User farmer = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Produce produce = new Produce();
        produce.setName(name);
        produce.setCategory(category);
        produce.setQuantity(quantity);
        produce.setPrice(price);
        produce.setFarmer(farmer);

        if (image != null && !image.isEmpty()) {
            String imageUrl = imageStorageService.storeImage(image);  // ✅ Use the service
            produce.setImageUrl(imageUrl);
        }

        Produce saved = produceService.addProduce(produce, farmer);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get all produce for logged-in farmer
    @GetMapping("/my-produce")
    public ResponseEntity<List<Produce>> getFarmerProduce(Principal principal) {
        User farmer = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        return ResponseEntity.ok(produceService.getProduceByFarmer(farmer));
    }

    // ✅ Delete a produce
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduce(@PathVariable Long id, Principal principal) {
        User farmer = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        produceService.deleteProduce(id, farmer);
        return ResponseEntity.ok("Produce deleted successfully.");
    }
}
