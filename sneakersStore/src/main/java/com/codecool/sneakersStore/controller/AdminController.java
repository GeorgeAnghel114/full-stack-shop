package com.codecool.sneakersStore.controller;

import com.codecool.sneakersStore.model.Product;
import com.codecool.sneakersStore.payload.ProductRequest;
import com.codecool.sneakersStore.service.AdminService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.TreeMap;

@CrossOrigin(origins = "http://localhost:3000/", methods = {RequestMethod.PUT, RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST})
@RestController
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public List<Product> getProducts() {
        return adminService.getProducts();
    }

    @GetMapping("/get-expenses")
    public TreeMap<String, Float> getExpensesDetails() {
        return adminService.getExpensesDetails();
    }

    @GetMapping("/get-sales")
    public TreeMap<String, Float> getSalesDetails() {
        return adminService.getSalesDetails();
    }


    @PutMapping("/edit-product/{prodId}")
    public Product updateProductById(@RequestBody ProductRequest productRequest, @PathVariable Long prodId) {
        return adminService.updateProductById(productRequest, prodId);
    }

    @PostMapping("/add-new-product")
    public Product saveNewProduct(@RequestBody ProductRequest productRequest) {
        return adminService.saveNewProduct(productRequest);
    }
}
