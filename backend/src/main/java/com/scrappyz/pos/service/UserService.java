package com.scrappyz.pos.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.entity.User;
import com.scrappyz.pos.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  
  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }
  
  public User findByUsername(String username) {
    Optional<User> obj = userRepository.findByName(username);
    if (obj.isPresent()) {
      return obj.get();
    }
    return null;
  }
  
  public void add(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
  }
  
  public void remove(String username) {
    userRepository.deleteById(username);
  }
}
