package com.scrappyz.pos.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.scrappyz.pos.model.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
//  @Value("${jwt.secret}")
  private String secretKey;
  
//  @Value("${jwt.expiration}")
  private long expiration;
  
  public JwtUtil() {
    this.secretKey = Encoders.BASE64.encode(Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded());
    this.expiration = 604800000;
//    System.out.println("------------ Hello ----------------");
  }
  
  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(secretKey.getBytes());
  }
  
  public String generateToken(String username) {
    Map<String, String> claims = new HashMap<>();
    
    claims.put("role", "USER");
    
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(username)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }
  
  public String generateToken(User user) {
    Map<String, String> claims = new HashMap<>();
    
    claims.put("role", user.getRole());
    
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(user.getName())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
  }
  
  public String extractUsername(String token) {
    return Jwts.parser()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }
  
  public String extractRole(String token) {
    return Jwts.parser()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .get("role", String.class);
  }
  
  public Date extractExpiryDate(String token) {
    return Jwts.parser()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getExpiration();
  }
  
  public boolean validateToken(String token) {
    try {
      Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
      if (extractExpiryDate(token).before(new Date())) {
        System.out.println("Token expired");
        return false;
      }
      return true;
    } catch (Exception e) {
      System.out.println("Token not valid");
      return false;
    }
  }
}
