package com.scrappyz.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.Order;
import com.scrappyz.pos.repository.OrderRepository;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
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
        for(int i = 0; i < ids.size(); i++) {
            orderRepository.deleteById(ids.get(i));
        }
    }
}
