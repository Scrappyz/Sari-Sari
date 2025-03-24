package com.scrappyz.pos.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.scrappyz.pos.model.entity.User;
import com.scrappyz.pos.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
  private final UserRepository userRepository;
  
  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByName(username).get();
    if (user == null) {
      throw new UsernameNotFoundException("Username " + username + " is not found, :( ");
    }
    return org.springframework.security.core.userdetails.User
        .withUsername(user.getName())
        .password(user.getPassword())
        .roles("USER")
        .build();
  }
}
