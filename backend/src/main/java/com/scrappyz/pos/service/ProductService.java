package com.scrappyz.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scrappyz.pos.controller.OrderController;
import com.scrappyz.pos.controller.OrderItemController;
import com.scrappyz.pos.model.Product;
import com.scrappyz.pos.repository.ProductRepository;

@Service
public class ProductService {

    private final OrderItemController orderItemController;

    private final OrderController orderController;
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository, OrderController orderController, OrderItemController orderItemController) {
        this.productRepository = productRepository;
        this.orderController = orderController;
        this.orderItemController = orderItemController;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product find(Long id) {
        return productRepository.findById(id).get();
    }

    public void add(Product product) {
        productRepository.save(product);
    }

    public void remove(Long id) {
        productRepository.deleteById(id);
    }

    public void remove(List<Long> ids) {
        productRepository.deleteAllById(ids);
    }
}
