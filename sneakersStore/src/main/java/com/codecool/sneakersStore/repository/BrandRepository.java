package com.codecool.sneakersStore.repository;

import com.codecool.sneakersStore.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query(value = "" +
            "SELECT b " +
            "FROM Brand b " +
            "JOIN Product p on b.id = p.brand.id " +
            "WHERE p.id = (:productId)")
    Brand getBrandByProductId(Long productId);
}
