package com.cineverse.cineverse_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OwnerController {

    @GetMapping("/api/owner/shows")
    public String ownerShows() {
        return "Welcome Theatre Owner";
    }
}