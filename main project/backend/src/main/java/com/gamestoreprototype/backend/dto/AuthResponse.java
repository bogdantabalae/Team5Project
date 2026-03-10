package com.gamestoreprototype.backend.dto;

public class AuthResponse {
    private boolean success;
    private String message;
    private String role;
    private Long userId;

    public AuthResponse(boolean success, String message, String role, Long userId) {
        this.success = success;
        this.message = message;
        this.role = role;
        this.userId = userId;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getRole() {
        return role;
    }

    public Long getUserId() {
        return userId;
    }
}