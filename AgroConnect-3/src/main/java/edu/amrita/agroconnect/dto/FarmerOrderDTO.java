package edu.amrita.agroconnect.dto;

import java.time.LocalDateTime;

public class FarmerOrderDTO {
    private String produceName;
    private int quantity;
    private double totalAmount;
    private String buyerName;
    private LocalDateTime orderDate;

    public FarmerOrderDTO(String produceName, int quantity, double totalAmount, String buyerName, LocalDateTime orderDate) {
        this.produceName = produceName;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.buyerName = buyerName;
        this.orderDate = orderDate;
    }

    // Getters and setters

    public String getProduceName() {
        return produceName;
    }

    public void setProduceName(String produceName) {
        this.produceName = produceName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
}
