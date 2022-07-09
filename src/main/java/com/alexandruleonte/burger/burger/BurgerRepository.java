package com.alexandruleonte.burger.burger;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
public interface BurgerRepository extends PagingAndSortingRepository<Burger, Long>{

}
