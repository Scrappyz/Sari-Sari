package com.scrappyz.pos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scrappyz.pos.model.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "SELECT NEXTVAL('orders_id_seq')", nativeQuery = true)
    public Long getNextId();

    @Query(value = "SELECT last_value FROM orders_id_seq;", nativeQuery = true)
    public Long getLastId();
}
