package com.alexandruleonte.burger.ingredient;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "*")
public interface IngredientRepository extends CrudRepository<Ingredient, String>{
    List<Ingredient> findAll();
}
