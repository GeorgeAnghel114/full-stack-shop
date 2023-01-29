package com.codecool.sneakersStore.service;

import com.codecool.sneakersStore.model.Supplier;
import com.codecool.sneakersStore.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id).get();
    }

    public Supplier getSupplierByProductId(Long productId) {
        return supplierRepository.getSupplierByProductId(productId);
    }
}
