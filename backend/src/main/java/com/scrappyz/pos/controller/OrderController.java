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

import com.scrappyz.pos.model.entity.Order;
import com.scrappyz.pos.model.request.CheckoutItem;
import com.scrappyz.pos.model.response.ApiResponse;
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
    public ResponseEntity<ApiResponse<Void>> addOrder(@RequestBody List<CheckoutItem> orderItems) {
        orderService.addOrder(orderItems);

        ApiResponse<Void> response = new ApiResponse<>(true, null, "Added order", null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<ApiResponse<Void>> removeOrder(@PathVariable Long id) {
        orderService.remove(id);

        ApiResponse<Void> response = new ApiResponse<>(true, null, "Removed order", null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<ApiResponse<Void>> removeOrder(@RequestBody List<Long> ids) {
        orderService.remove(ids);

        ApiResponse<Void> response = new ApiResponse<>(true, null, "Removed order", null);
        return ResponseEntity.ok(response);
    }
    
}
