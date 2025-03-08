package com.scrappyz.pos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scrappyz.pos.model.Order;
import com.scrappyz.pos.service.OrderService;



@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping    
    public List<Order> getOrders() {
        return orderService.findAll();
    }

    @GetMapping("/{id}")
    public Order getOrder(@PathVariable Long id) {
        return orderService.find(id);
    }
    
    @PostMapping("/add")
    public ResponseEntity<String> addOrder(@RequestBody Order order) {
        orderService.add(order);
        return ResponseEntity.ok("Added Order");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeOrder(@PathVariable Long id) {
        orderService.remove(id);
        return ResponseEntity.ok("Removed Order");
    }
    
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeOrders(@RequestBody List<Long> ids) {
        orderService.remove(ids);
        return ResponseEntity.ok("Removed Orders");
    }
}
