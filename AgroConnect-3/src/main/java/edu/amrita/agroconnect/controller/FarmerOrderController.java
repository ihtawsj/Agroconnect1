package edu.amrita.agroconnect.controller;

import edu.amrita.agroconnect.dto.FarmerOrderDTO;
import edu.amrita.agroconnect.model.User;
import edu.amrita.agroconnect.repository.OrderItemRepository;
import edu.amrita.agroconnect.repository.UserRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/farmer/orders")
public class FarmerOrderController {

    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    public FarmerOrderController(OrderItemRepository orderItemRepository, UserRepository userRepository) {
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
    }

    // Get all orders for farmer with optional filters
    @GetMapping
    public ResponseEntity<List<FarmerOrderDTO>> getOrdersForFarmer(
            Principal principal,
            @RequestParam(required = false) String produceName,
            @RequestParam(required = false) String buyerName,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime toDate) {

        User farmer = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        List<FarmerOrderDTO> orders = orderItemRepository.findOrdersForFarmerWithFilters(
                farmer, produceName, buyerName, fromDate, toDate
        );

        return ResponseEntity.ok(orders);
    }
}
