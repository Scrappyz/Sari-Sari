package com.scrappyz.pos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scrappyz.pos.model.Product;
import com.scrappyz.pos.service.ProductService;



@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return productService.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        productService.add(product);
        return ResponseEntity.ok("Product Added");
    }
    
    @PostMapping("/remove/{id}")
    public ResponseEntity<String> removeProduct(@PathVariable Long id) {
        productService.remove(id);
        return ResponseEntity.ok("Product Removed");
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeProducts(@RequestBody List<Long> ids) {
        productService.remove(ids);
        return ResponseEntity.ok("Products Removed");
    }
    
}
