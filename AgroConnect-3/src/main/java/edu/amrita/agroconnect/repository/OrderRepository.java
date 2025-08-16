package edu.amrita.agroconnect.repository;

import edu.amrita.agroconnect.dto.FarmerOrderDTO;
import edu.amrita.agroconnect.model.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT new edu.amrita.agroconnect.dto.FarmerOrderDTO(" +
           "p.name, oi.quantity, oi.totalPrice, o.buyer.name, o.orderDate) " +
           "FROM Order o " +
           "JOIN o.items oi " +
           "JOIN oi.produce p " +
           "WHERE p.farmer.id = :farmerId " +
           "AND (:produceName IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :produceName, '%'))) " +
           "AND (:buyerName IS NULL OR LOWER(o.buyer.name) LIKE LOWER(CONCAT('%', :buyerName, '%'))) " +
           "AND (:fromDate IS NULL OR o.orderDate >= :fromDate) " +
           "AND (:toDate IS NULL OR o.orderDate <= :toDate)")
    List<FarmerOrderDTO> findOrdersByFarmerIdWithFilters(
            @Param("farmerId") Long farmerId,
            @Param("produceName") String produceName,
            @Param("buyerName") String buyerName,
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate
    );
}
