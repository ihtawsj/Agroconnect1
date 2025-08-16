package edu.amrita.agroconnect.repository;

import edu.amrita.agroconnect.dto.FarmerOrderDTO;
import edu.amrita.agroconnect.model.OrderItem;
import edu.amrita.agroconnect.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("SELECT new edu.amrita.agroconnect.dto.FarmerOrderDTO(" +
           "p.name, oi.quantity, oi.totalPrice, o.buyer.name, o.orderDate) " +
           "FROM OrderItem oi " +
           "JOIN oi.order o " +
           "JOIN oi.produce p " +
           "WHERE p.farmer = :farmer " +
           "AND (:produceName IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :produceName, '%'))) " +
           "AND (:buyerName IS NULL OR LOWER(o.buyer.name) LIKE LOWER(CONCAT('%', :buyerName, '%'))) " +
           "AND (:fromDate IS NULL OR o.orderDate >= :fromDate) " +
           "AND (:toDate IS NULL OR o.orderDate <= :toDate)")
    List<FarmerOrderDTO> findOrdersForFarmerWithFilters(
        @Param("farmer") User farmer,
        @Param("produceName") String produceName,
        @Param("buyerName") String buyerName,
        @Param("fromDate") LocalDateTime fromDate,
        @Param("toDate") LocalDateTime toDate
    );
}
