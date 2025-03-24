package com.scrappyz.pos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scrappyz.pos.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{

  Optional<User> findByName(String username);

}
