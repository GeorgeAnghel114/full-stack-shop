package com.codecool.sneakersStore.service;

import com.codecool.sneakersStore.model.Category;
import com.codecool.sneakersStore.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).get();
    }

    public Category getCategoryByProductId(Long productId) {
        return categoryRepository.getCategoryByProductId(productId);
    }
}
