package com.collabpad.backend.dto;

public class AuthResponse {
    private String token;
    private String name;
    private String username;
    private String email;

    public AuthResponse(String token, String name, String username, String email) {
        this.token = token;
        this.name = name;
        this.username = username;
        this.email = email;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
