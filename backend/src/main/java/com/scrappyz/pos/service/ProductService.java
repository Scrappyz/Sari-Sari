package com.scrappyz.pos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.Product;
import com.scrappyz.pos.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public void add(Product product) {
        productRepository.save(product);
    }

    public void remove(Long id) {
        productRepository.deleteById(id);
    }

    public void remove(List<Long> ids) {
        for(int i = 0; i < ids.size(); i++) {
            productRepository.deleteById(ids.get(i));
        }
    }
}
