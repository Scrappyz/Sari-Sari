package com.scrappyz.pos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/**")  // Allow CORS for all endpoints
      .allowedOrigins("http://localhost:5173")  // Your frontend's URL
      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
      .allowedHeaders("Authorization", "Content-Type", "Accept")
      .exposedHeaders("Authorization")  // Allow frontend to access Authorization header
      .allowCredentials(true);
    }
}
