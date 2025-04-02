package com.example.ultimate_portfolio.controller;

import com.example.ultimate_portfolio.service.UrlShortenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:6200")
@RestController
@RequestMapping("/")
public class UrlShortenerController {

    @Autowired
    private UrlShortenerService urlShortenerService;

    // API to shorten a URL
    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestBody String longUrl) {
        String shortUrl = urlShortenerService.shortenUrl(longUrl);
        return ResponseEntity.ok()
                .header("Content-Type", "text/plain")  // ✅ Ensure response is text/plain
                .body(shortUrl);
    }

    // API to redirect to the original URL
    @GetMapping("/{shortId}")
    public ResponseEntity<Object> redirectToOriginalUrl(@PathVariable String shortId) {
        Optional<String> longUrl = urlShortenerService.getLongUrl(shortId);
        return longUrl.map(url -> ResponseEntity.status(302).location(URI.create(url)).build())
                .orElse(ResponseEntity.notFound().build());
    }
}
