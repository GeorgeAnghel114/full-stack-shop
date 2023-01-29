package com.codecool.sneakersStore.service;

import com.codecool.sneakersStore.model.Brand;
import com.codecool.sneakersStore.repository.BrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandService {
    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Brand getBrandById(Long id) {
        return brandRepository.findById(id).get();
    }

    public Brand getBrandByProductId(Long productId) {
        return brandRepository.getBrandByProductId(productId);
    }
}
