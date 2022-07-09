package com.alexandruleonte.burger.order;

import com.alexandruleonte.burger.burger.Burger;
import com.alexandruleonte.burger.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
	
	@ManyToOne
	private User user;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private long id;
	
	@Column(name="placedat")
	private Date placedAt;
	
	@NotBlank(message="Numele este obligatoriu")
	@Column(name="deliveryname")
	private String deliveryName;
	
	@NotBlank(message="Strada este obligatorie")
	@Column(name="deliverystreet")
	private String deliveryStreet;
	
	@NotBlank(message="Orașul este obligatoriu")
	@Column(name="deliverycity")
	private String deliveryCity;
	
	@NotBlank(message="Țara este obligatorie")
	@Column(name="deliverystate")
	private String deliveryState;
	
	@NotBlank(message="Codul poștal este obligatoriu")
	@Column(name="deliveryzip")
	private String deliveryZip;
	
	@NotBlank(message="Obligatoriu")
	@Column(name="ccnumber")
	private String ccNumber;
	
	@NotBlank(message="Obligatoriu")
	@Column(name="ccexpiration")
	private String ccExpiration;
	
	@NotBlank(message="Obligatoriu")
	private String ccCVV;
	
	@ManyToMany(targetEntity= Burger.class)
	private List<Burger> burgers;
	
	@PrePersist
	void placedAt() {
		this.placedAt = new Date();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getPlacedAt() {
		return placedAt;
	}

	public void setPlacedAt(Date placedAt) {
		this.placedAt = placedAt;
	}

	public String getDeliveryName() {
		return deliveryName;
	}

	public void setDeliveryName(String deliveryName) {
		this.deliveryName = deliveryName;
	}

	public String getDeliveryStreet() {
		return deliveryStreet;
	}

	public void setDeliveryStreet(String deliveryStreet) {
		this.deliveryStreet = deliveryStreet;
	}

	public String getDeliveryCity() {
		return deliveryCity;
	}

	public void setDeliveryCity(String deliveryCity) {
		this.deliveryCity = deliveryCity;
	}

	public String getDeliveryState() {
		return deliveryState;
	}

	public void setDeliveryState(String deliveryState) {
		this.deliveryState = deliveryState;
	}

	public String getDeliveryZip() {
		return deliveryZip;
	}

	public void setDeliveryZip(String deliveryZip) {
		this.deliveryZip = deliveryZip;
	}

	public String getCcNumber() {
		return ccNumber;
	}

	public void setCcNumber(String ccNumber) {
		this.ccNumber = ccNumber;
	}

	public String getCcExpiration() {
		return ccExpiration;
	}

	public void setCcExpiration(String ccExpiration) {
		this.ccExpiration = ccExpiration;
	}

	public String getCcCVV() {
		return ccCVV;
	}

	public void setCcCVV(String ccCVV) {
		this.ccCVV = ccCVV;
	}

	public List<Burger> getBurgers() {
		return burgers;
	}

	public void setBurgers(List<Burger> burgers) {
		this.burgers = burgers;
	}
}
