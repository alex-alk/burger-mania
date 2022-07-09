package com.alexandruleonte.burger.user;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsernameAndPassword(String username, String password);
}
