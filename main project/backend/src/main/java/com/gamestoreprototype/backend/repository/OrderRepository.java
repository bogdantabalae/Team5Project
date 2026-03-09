package com.gamestoreprototype.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gamestoreprototype.backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
