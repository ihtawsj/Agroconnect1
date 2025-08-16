package edu.amrita.agroconnect.service;

import edu.amrita.agroconnect.dto.FarmerOrderDTO;
import edu.amrita.agroconnect.model.*;
import edu.amrita.agroconnect.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final ProduceRepository produceRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public CartService(CartItemRepository cartItemRepository,
                       ProduceRepository produceRepository,
                       UserRepository userRepository,
                       OrderRepository orderRepository,
                       OrderItemRepository orderItemRepository) {
        this.cartItemRepository = cartItemRepository;
        this.produceRepository = produceRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    // ✅ Add item to cart
    public void addToCart(String buyerEmail, Long produceId, int quantity) {
        User buyer = userRepository.findByEmail(buyerEmail)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Produce produce = produceRepository.findById(produceId)
                .orElseThrow(() -> new RuntimeException("Produce not found"));

        CartItem item = new CartItem(buyer, produce, quantity);
        cartItemRepository.save(item);
    }

    // ✅ Get items from cart
    public List<CartItem> getCart(String buyerEmail) {
        User buyer = userRepository.findByEmail(buyerEmail)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        return cartItemRepository.findByBuyer(buyer);
    }

    // ✅ Remove cart item by produce
    public void removeFromCart(String buyerEmail, Long produceId) {
        User buyer = userRepository.findByEmail(buyerEmail)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Produce produce = produceRepository.findById(produceId)
                .orElseThrow(() -> new RuntimeException("Produce not found"));

        CartItem item = cartItemRepository.findByBuyerAndProduce(buyer, produce)
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        cartItemRepository.delete(item);
    }

    // ✅ Remove cart item by cartItemId
    public void removeFromCart(Long cartItemId, User buyer) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getBuyer().getId().equals(buyer.getId())) {
            throw new RuntimeException("Unauthorized to delete this cart item");
        }

        cartItemRepository.delete(item);
    }

    // ✅ Place order from cart
    public void placeOrder(String buyerEmail) {
        User buyer = userRepository.findByEmail(buyerEmail)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        List<CartItem> cartItems = cartItemRepository.findByBuyer(buyer);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setBuyer(buyer);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduce(cartItem.getProduce());
            item.setQuantity(cartItem.getQuantity());
            item.setTotalPrice(cartItem.getProduce().getPrice() * cartItem.getQuantity());
            orderItems.add(item);
        }

        order.setItems(orderItems);
        order.setOrderDate(LocalDateTime.now());
        orderRepository.save(order); // Cascade will save orderItems

        cartItemRepository.deleteAll(cartItems);
    }

    // ✅ Get all orders for a farmer (with optional filters)
    public List<FarmerOrderDTO> getOrdersForFarmer(String email,
                                                   String produceName,
                                                   String buyerName,
                                                   LocalDateTime fromDate,
                                                   LocalDateTime toDate) {
        User farmer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        return orderRepository.findOrdersByFarmerIdWithFilters(
                farmer.getId(),
                produceName,
                buyerName,
                fromDate,
                toDate
        );
    }
}
