package com.scrappyz.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.OrderItem;
import com.scrappyz.pos.repository.OrderItemRepository;

@Service
public class OrderItemService {
    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    public OrderItem find(Long id) {
        return orderItemRepository.findById(id).get();
    }

    public void add(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }

    public void remove(Long id) {
        orderItemRepository.deleteById(id);
    }

    public void remove(List<Long> ids) {
        orderItemRepository.deleteAllById(ids);
    }
}
