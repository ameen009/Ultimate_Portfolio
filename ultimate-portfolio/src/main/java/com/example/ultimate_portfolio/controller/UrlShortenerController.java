package com.example.ultimate_portfolio.controller;

import com.example.ultimate_portfolio.dtos.UrlResponse;
import com.example.ultimate_portfolio.entity.ShortUrl;
import com.example.ultimate_portfolio.service.UrlShortenerService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
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

    @GetMapping("/allurls")
    public ResponseEntity<List<ShortUrl>> getAllUrl(){
        List<ShortUrl> response = urlShortenerService.getAllUrl();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{shortId}")
    public ResponseEntity<Void> deleteShortUrl(@PathVariable String shortId){
        try {
            urlShortenerService.deleteUrl(shortId);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // 500 on failure
        }
    }
}
