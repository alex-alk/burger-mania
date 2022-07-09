package com.alexandruleonte.burger.order;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface OrderRepository extends CrudRepository<Order, Long>{}
