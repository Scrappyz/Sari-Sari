package com.scrappyz.pos.model.response;

import java.util.List;

public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    private List<String> errors;

    public ApiResponse() {}

    public ApiResponse(boolean success, T data, String message, List<String> errors) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.errors = errors;
    }

    // Getters
    public boolean getSuccess() {
        return success;
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
    public void setSuccess(boolean success) {
        this.success = success;
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
