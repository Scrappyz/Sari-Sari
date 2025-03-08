package com.scrappyz.pos.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "orders_id_seq")
    @SequenceGenerator(name = "orders_id_seq", sequenceName = "orders_id_seq", allocationSize = 1)
    private Long id;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    public Long getId() {
        return id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public String getOrderDateString() {
        String format = "yyyy-MM-dd HH:mm:ss";
        return getOrderDateString(format);
    }

    public String getOrderDateString(String format) {
        return orderDate.format(DateTimeFormatter.ofPattern(format));
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setId(Long id) {
        this.id = id;
    } 

    public void setOrderDate(String orderDate) {
        this.orderDate = LocalDateTime.parse(orderDate);
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
