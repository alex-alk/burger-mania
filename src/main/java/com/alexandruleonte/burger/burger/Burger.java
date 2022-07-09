package com.alexandruleonte.burger.burger;

import com.alexandruleonte.burger.ingredient.Ingredient;
import com.alexandruleonte.burger.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
public class Burger {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="createdat")
	private Date createdAt;
	
	@Size(min=2, message="Denumirea trebuie să conțină cel puțin 2 caractere")
	private String name;
	
	@ManyToMany(targetEntity= Ingredient.class)
	@NotNull(message="Trebuie să alegeți cel puțin un ingredient")
	private List<Ingredient> ingredients;
	
	@ManyToOne(targetEntity= User.class)
	@NotNull
	private User user;
	
	@PrePersist
	void createdAt() {
		this.createdAt = new Date();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
