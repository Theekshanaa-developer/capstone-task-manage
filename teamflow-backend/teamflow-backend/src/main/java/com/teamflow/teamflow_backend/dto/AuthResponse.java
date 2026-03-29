package com.teamflow.teamflow_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private String role;
    private String token;

    public AuthResponse (String message,String token)
    {
        this.message=message;
        this.token=token;
    }
}
