package com.scrappyz.pos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scrappyz.pos.model.Order;
import com.scrappyz.pos.model.OrderItem;
import com.scrappyz.pos.repository.OrderItemRepository;
import com.scrappyz.pos.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderItemRepository orderItemRepository;
    private final OrderService orderService;

    public OrderController(OrderService orderService, OrderItemRepository orderItemRepository) {
        this.orderService = orderService;
        this.orderItemRepository = orderItemRepository;
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
    public ResponseEntity<String> postMethodName(@RequestBody List<OrderItem> orderItems) {
        for(int i = 0; i < orderItems.size(); i++) {
            // System.out.println(orderItems.get(i));
            System.out.println(orderItems.get(i).getId());
            System.out.println(orderItems.get(i).getProductId());
            System.out.println(orderItems.get(i).getOrderId());
            System.out.println(orderItems.get(i).getQuantity());
            System.out.println(orderItems.get(i).getUnitPrice());
            System.out.println("================");
        }

        // Order order = new Order();
        // order.setTotalAmount();

        return ResponseEntity.ok("Accepted");
    }
    
    
}
