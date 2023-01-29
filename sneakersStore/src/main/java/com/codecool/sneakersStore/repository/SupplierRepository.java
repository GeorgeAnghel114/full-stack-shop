package com.codecool.sneakersStore.repository;

import com.codecool.sneakersStore.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    @Query(value = "" +
            "SELECT s " +
            "FROM Supplier s " +
            "JOIN Product p on s.id = p.supplier.id " +
            "WHERE p.id = (:productId)")
    Supplier getSupplierByProductId(Long productId);
}
