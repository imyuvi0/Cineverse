package com.cineverse.cineverse_backend.controller;

import com.cineverse.cineverse_backend.dto.LoginRequest;
import com.cineverse.cineverse_backend.model.User;
import com.cineverse.cineverse_backend.security.JwtService;
import com.cineverse.cineverse_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/test")
    public String test() {
        return "Backend Working";
    }

    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
        public String login(@RequestBody LoginRequest request) {

        User user = userService.loginUser(request.getEmail());

        if (user == null) {
                return "User not found";
        }

        if (passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

                return jwtService.generateToken(
                        user.getEmail(),
                        user.getRole()
                );
        }

        return "Invalid Password";
        }

    @GetMapping("/role/{email}")
    public String getRole(@PathVariable String email) {

        User user = userService.loginUser(email);

        if (user == null) {
            return "User not found";
        }

        return user.getRole();
    }
}