package com.codecool.sneakersStore.controller;


import com.codecool.sneakersStore.model.Category;
import com.codecool.sneakersStore.service.CategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(value = {"*"} )
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{productId}")
    public Category getCategoryByProductId(@PathVariable String productId){
        return categoryService.getCategoryByProductId(Long.valueOf(productId));
    }
}
