package com.scrappyz.pos.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.entity.Order;
import com.scrappyz.pos.model.entity.OrderItem;
import com.scrappyz.pos.model.entity.Product;
import com.scrappyz.pos.model.request.CheckoutItem;
import com.scrappyz.pos.repository.OrderItemRepository;
import com.scrappyz.pos.repository.OrderRepository;
import com.scrappyz.pos.repository.ProductRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Order find(Long id) {
        return orderRepository.findById(id).get();
    }

    public void addOrder(List<CheckoutItem> checkoutItems) {
        // Extract unique product IDs from checkout items
        Set<Long> productIds = checkoutItems.stream()
            .map(CheckoutItem::getProductId)
            .collect(Collectors.toSet());

        // Fetch all products at once and map by ID
        List<Product> products = productRepository.findAllById(productIds);
        Map<Long, Product> productMap = new HashMap<>();

        for(int i = 0; i < products.size(); i++) {
            productMap.put(products.get(i).getId(), products.get(i));
        }

        // Calculate total and prepare order items
        BigDecimal total = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();
        for(CheckoutItem item : checkoutItems) {
            Product product = productMap.get(item.getProductId());
            if(product == null) {
                throw new IllegalArgumentException("Product not found for id: " + item.getProductId());
            }
            // Calculate item total: price * quantity
            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            total = total.add(itemTotal);

            // Prepare OrderItem (orderId will be set later)
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(item.getProductId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            orderItems.add(orderItem);
        }

        // Get new order id and create Order
        Order order = new Order();
        order.setTotalAmount(total);
        order.setOrderDate(LocalDateTime.now());
        orderRepository.save(order);

        Long orderId = orderRepository.getLastId();

        // Set the order id for each order item and batch save them
        orderItems.forEach(item -> item.setOrderId(orderId));
        orderItemRepository.saveAll(orderItems);
    }


    public void remove(Long id) {
        orderRepository.deleteById(id);
    }

    public void remove(List<Long> ids) {
        orderRepository.deleteAllById(ids);
    }
}
