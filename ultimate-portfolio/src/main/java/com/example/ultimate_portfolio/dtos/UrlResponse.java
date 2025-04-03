package com.example.ultimate_portfolio.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UrlResponse {
    private String id;
    private String longUrl;
    private LocalDateTime createdAt;
}
