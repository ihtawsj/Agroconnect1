package edu.amrita.agroconnect.model;

import jakarta.persistence.*;

@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "produce_id")
    private Produce produce;

    private int quantity;

    private double totalPrice; // ✅ ADD THIS FIELD

    // Constructors
    public OrderItem() {}

    public OrderItem(Order order, Produce produce, int quantity) {
        this.order = order;
        this.produce = produce;
        this.quantity = quantity;
        this.totalPrice = produce.getPrice() * quantity; // optional
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Produce getProduce() {
        return produce;
    }

    public void setProduce(Produce produce) {
        this.produce = produce;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() { 
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) { 
        this.totalPrice = totalPrice;
    }
}
