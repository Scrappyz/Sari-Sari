package com.scrappyz.pos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scrappyz.pos.model.entity.Product;
import com.scrappyz.pos.model.response.ApiResponse;
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

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.find(id);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
        productService.add(product);

        ApiResponse<Product> response = new ApiResponse<>("success", product, "Product Added", null);
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<ApiResponse<Void>> removeProduct(@PathVariable Long id) {
        productService.remove(id);

        ApiResponse<Void> response = new ApiResponse<>("success", null, "Product Removed", null);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<ApiResponse<Void>> removeProducts(@RequestBody List<Long> ids) {
        productService.remove(ids);

        ApiResponse<Void> response = new ApiResponse<>("success", null, "Product Removed", null);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("edit/{id}")
    public ResponseEntity<ApiResponse<Void>> editProduct(@PathVariable Long id, @RequestBody Product product) {
        productService.edit(id, product);

        ApiResponse<Void> response = new ApiResponse<>("success", null, "Product Edited", null);
        return ResponseEntity.ok(response);
    }
}
