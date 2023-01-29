package com.codecool.sneakersStore.controller;

import com.codecool.sneakersStore.model.Product;
import com.codecool.sneakersStore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/prod")
@CrossOrigin(origins = "http://localhost:3000/", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/products")
    public List<Product> products() {

        return productService.getAllAvailableProducts();
    }
    @GetMapping("/product/{productId}")
    public Product getProductById(@PathVariable String productId){
        return productService.getProductById(Long.parseLong(productId));
    }
}
