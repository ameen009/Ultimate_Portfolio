package com.example.ultimate_portfolio.service;

import com.example.ultimate_portfolio.dao.ShortUrlRepository;
import com.example.ultimate_portfolio.entity.ShortUrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UrlShortenerService {

    @Autowired
    private ShortUrlRepository repository;

    // Generate short URL from long URL
    public String shortenUrl(String longUrl) {
        // Check if the URL is already shortened
        Optional<ShortUrl> existing = repository.findAll()
                .stream()
                .filter(s -> s.getLongUrl().equals(longUrl))
                .findFirst();
        if (existing.isPresent()) {
            return "http://localhost:8080/" + existing.get().getId();
        }

        // Generate a unique short ID using SHA-256
        String shortId = generateShortId(longUrl);

        // Save mapping in MongoDB
        ShortUrl shortUrl = new ShortUrl(shortId, longUrl, LocalDateTime.now());
        repository.save(shortUrl);

        return "http://localhost:8080/" + shortId;
    }

    // Retrieve original URL from short ID
    public Optional<String> getLongUrl(String shortId) {
        return repository.findById(shortId).map(ShortUrl::getLongUrl);
    }

    public List<ShortUrl> getAllUrl(){
        return repository.findAll();
    }

    public void deleteUrl(String shortId){
        Optional<ShortUrl> url = repository.findById(shortId);
        if(url.isPresent()){
            repository.deleteById(shortId);
        } else {
          throw new RuntimeException("Entity not found!");
        }
    }




    // Generate a short ID from the URL
    private String generateShortId(String url) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(url.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash).substring(0, 6); // 6-char short ID
        } catch (Exception e) {
            throw new RuntimeException("Error generating hash", e);
        }
    }
}
