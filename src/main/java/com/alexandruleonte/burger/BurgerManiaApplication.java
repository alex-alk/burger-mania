package com.alexandruleonte.burger;

import com.alexandruleonte.burger.ingredient.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BurgerManiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BurgerManiaApplication.class, args);
	}

}
