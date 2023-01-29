package com.codecool.sneakersStore.controller;

import com.codecool.sneakersStore.model.Supplier;
import com.codecool.sneakersStore.service.SupplierService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(value = {"*"} )
@RestController
@RequestMapping("/supplier")
public class SupplierController {
    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public List<Supplier> getSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @GetMapping("/{productId}")
    public Supplier getSupplierByProductId (@PathVariable String productId) {
        return supplierService.getSupplierByProductId(Long.valueOf(productId));
    }
}
