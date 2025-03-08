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

import com.scrappyz.pos.model.OrderItem;
import com.scrappyz.pos.service.OrderItemService;



@RestController
@RequestMapping("/orders/items")
public class OrderItemController {
    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public List<OrderItem> getOrderItems() {
        return orderItemService.findAll();
    }
    
    @GetMapping("/{id}")    
    public OrderItem getOrderItem(@PathVariable Long id) {
        return orderItemService.find(id);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addOrderItem(@RequestBody OrderItem orderItem) {
        orderItemService.add(orderItem);
        return ResponseEntity.ok("Order Item Added");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<String> removeOrderItem(@PathVariable Long id) {
        orderItemService.remove(id);
        return ResponseEntity.ok("Removed Order Item");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeOrderItems(@RequestBody List<Long> ids) {
        orderItemService.remove(ids);
        return ResponseEntity.ok("Removed Order Items");
    }
}
