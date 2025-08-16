package edu.amrita.agroconnect.repository;

import edu.amrita.agroconnect.model.CartItem;
import edu.amrita.agroconnect.model.Produce;
import edu.amrita.agroconnect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByBuyer(User buyer);

    Optional<CartItem> findByBuyerAndProduce(User buyer, Produce produce);

    void deleteByBuyerAndProduceId(User buyer, Long produceId);
}
