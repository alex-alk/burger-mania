package com.alexandruleonte.burger;

import com.alexandruleonte.burger.ingredient.Ingredient;
import com.alexandruleonte.burger.ingredient.IngredientRepository;
import com.alexandruleonte.burger.user.UserRepository;
import org.aspectj.weaver.Iterators;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private IngredientRepository repo;

    public void run(ApplicationArguments args) {
        final String TYPE_SOS = "SOS";
        final String TYPE_PROTEINĂ = "PROTEINĂ";
        final String TYPE_LEGUME = "LEGUME";
        final String TYPE_BRÂNZĂ = "BRÂNZĂ";
        final String TYPE_CHIFLĂ = "CHIFLĂ";

        if (repo.findAll().size() == 0) {
            repo.save(new Ingredient("1", "Sos usturoi", TYPE_SOS));
            repo.save(new Ingredient("2", "Sos roșii", TYPE_SOS));
            repo.save(new Ingredient("3", "Carne pui", TYPE_PROTEINĂ));
            repo.save(new Ingredient("4", "Carne vită", TYPE_PROTEINĂ));
            repo.save(new Ingredient("5", "Ceapă", TYPE_LEGUME));
            repo.save(new Ingredient("6", "Salată", TYPE_LEGUME));
            repo.save(new Ingredient("7", "Telemea", TYPE_BRÂNZĂ));
            repo.save(new Ingredient("8", "Cașcaval", TYPE_BRÂNZĂ));
            repo.save(new Ingredient("9", "Mare", TYPE_CHIFLĂ));
            repo.save(new Ingredient("10", "Mică", TYPE_CHIFLĂ));
        }
    }
}
