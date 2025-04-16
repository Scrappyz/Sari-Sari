package com.scrappyz.pos.model.response;

import java.util.List;

public class ApiResponse<T> {
    private String status;
    private T data;
    private String message;
    private List<String> errors;

    public ApiResponse() {}

    public ApiResponse(String status, T data, String message, List<String> errors) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.errors = errors;
    }

    // Getters
    public String getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public List<String> getErrors() {
        return errors;
    }

    // Setters
    public void setStatus(String status) {
        this.status = status;
    }

    public void setData(T data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }
}
