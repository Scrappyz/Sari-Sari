package com.scrappyz.pos.controller;


import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.scrappyz.pos.model.entity.User;
import com.scrappyz.pos.model.request.LoginRequest;
import com.scrappyz.pos.model.request.RoleRequest;
import com.scrappyz.pos.model.response.LoginResponse;
import com.scrappyz.pos.security.JwtUtil;
import com.scrappyz.pos.service.UserService;

@RestController
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private org.slf4j.Logger logger;
    
    public UserController(UserService userService, AuthenticationManager authenticationManager,
        JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.logger = LoggerFactory.getLogger(UserController.class);
    }
    
    @PostMapping("/register")
    public LoginResponse tryRegister(@RequestBody LoginRequest l) {
        LoginResponse loginResponse = new LoginResponse();
        if (userService.findByUsername(l.getUsername()) != null) {
            loginResponse.setStatus("failed");
            loginResponse.setMessage("Username already exists");
            loginResponse.setOther("");
            return loginResponse;
        }
        User user = new User();
        user.setName(l.getUsername());
        user.setPassword(l.getPassword());
        user.setRole("USER");
    //    user.setId(1);
        
        userService.add(user);
        loginResponse.setStatus("success");
        loginResponse.setMessage("User registered successfully");
        loginResponse.setOther("");
        return loginResponse;
    }
    
    @PostMapping("/login")
    public LoginResponse tryLogin(@RequestBody LoginRequest l) {
        LoginResponse loginResponse = new LoginResponse();
        User u = userService.findByUsername(l.getUsername());
        try {
        if (authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(l.getUsername(), l.getPassword())).isAuthenticated()) {
            String token = jwtUtil.generateToken(u);
            loginResponse.setStatus("success");
            loginResponse.setMessage("Token created");
            loginResponse.setOther(token);
        } else {
            loginResponse.setStatus("failed");
            loginResponse.setMessage("Not authenticated");
            loginResponse.setOther("");
        }
        } catch (Exception e) {
            loginResponse.setStatus("failed");
            loginResponse.setMessage("Not authenticated");
            loginResponse.setOther("");
        }
        return loginResponse;
    }
    
    @PostMapping("/role")
    public LoginResponse tryGetRole(@RequestBody RoleRequest r) {
        String username = jwtUtil.extractUsername(r.getToken());
        User u = userService.findByUsername(username);
        LoginResponse l = new LoginResponse();
        l.setStatus("success");
        l.setMessage("Role successfully retrieved");
        l.setOther(u.getRole());
        return l;
    }
}
