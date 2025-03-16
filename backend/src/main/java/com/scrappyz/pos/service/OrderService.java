package com.scrappyz.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.Order;
import com.scrappyz.pos.repository.OrderItemRepository;
import com.scrappyz.pos.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order find(Long id) {
        return orderRepository.findById(id).get();
    }

    public void add(Order order) {
        orderRepository.save(order);
    }

    public void remove(Long id) {
        orderRepository.deleteById(id);
    }

    public void remove(List<Long> ids) {
        orderRepository.deleteAllById(ids);
    }
}
