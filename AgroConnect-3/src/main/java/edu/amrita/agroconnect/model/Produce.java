package edu.amrita.agroconnect.model;

import jakarta.persistence.*;

@Entity
@Table(name = "produce")
public class Produce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    private int quantity;

    private double price;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private User farmer;

    // Constructors
    public Produce() {}

    public Produce(String name, String category, int quantity, double price, String imageUrl, User farmer) {
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.imageUrl = imageUrl;
        this.farmer = farmer;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public User getFarmer() { return farmer; }
    public void setFarmer(User farmer) { this.farmer = farmer; }
}
