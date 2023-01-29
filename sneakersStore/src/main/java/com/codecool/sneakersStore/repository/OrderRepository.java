package com.codecool.sneakersStore.repository;

import com.codecool.sneakersStore.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
