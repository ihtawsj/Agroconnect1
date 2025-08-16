package edu.amrita.agroconnect.controller;

import edu.amrita.agroconnect.model.CartItem;
import edu.amrita.agroconnect.model.User;
import edu.amrita.agroconnect.repository.UserRepository;
import edu.amrita.agroconnect.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/buyer/cart")
public class BuyerCartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    public BuyerCartController(CartService cartService, UserRepository userRepository) {
        this.cartService = cartService;
        this.userRepository = userRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestParam Long produceId, @RequestParam int quantity, Principal principal) {
        cartService.addToCart(principal.getName(), produceId, quantity);
        return ResponseEntity.ok("Item added to cart!");
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> viewCart(Principal principal) {
        return ResponseEntity.ok(cartService.getCart(principal.getName()));
    }

    // ✅ Optional: remove using produceId
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestParam Long produceId, Principal principal) {
        cartService.removeFromCart(principal.getName(), produceId);
        return ResponseEntity.ok("Item removed from cart");
    }

    // ✅ Optional: remove using cartItemId
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long cartItemId, Principal principal) {
        User buyer = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        cartService.removeFromCart(cartItemId, buyer);
        return ResponseEntity.ok("Item removed from cart successfully.");
    }

    @PostMapping("/place-order")
    public ResponseEntity<String> placeOrder(Principal principal) {
        cartService.placeOrder(principal.getName());
        return ResponseEntity.ok("Order placed successfully!");
    }
}
