package com.codecool.sneakersStore.controller;


import com.codecool.sneakersStore.model.Brand;
import com.codecool.sneakersStore.service.BrandService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(value = {"*"} )
@RestController
@RequestMapping("/brand")
public class BrandController {
    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping
    public List<Brand> getBrands() {
        return brandService.getAllBrands();
    }

    @GetMapping("/{productId}")
    public Brand getBrandByProductId (@PathVariable String productId) {
        return brandService.getBrandByProductId(Long.valueOf(productId));
    }
}
