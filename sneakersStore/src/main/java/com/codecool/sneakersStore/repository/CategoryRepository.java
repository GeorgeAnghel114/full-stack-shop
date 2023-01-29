package com.codecool.sneakersStore.repository;

import com.codecool.sneakersStore.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "" +
            "SELECT c " +
            "FROM Category c " +
            "JOIN Product p on c.id = p.category.id " +
            "WHERE p.id = (:productId)")
    Category getCategoryByProductId(Long productId);

}
