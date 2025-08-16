package edu.amrita.agroconnect.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "produce_id")
    private Produce produce;

    private int quantity;

    // Constructors
    public CartItem() {}

    public CartItem(User buyer, Produce produce, int quantity) {
        this.buyer = buyer;
        this.produce = produce;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public User getBuyer() { return buyer; }

    public void setBuyer(User buyer) { this.buyer = buyer; }

    public Produce getProduce() { return produce; }

    public void setProduce(Produce produce) { this.produce = produce; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }
}
