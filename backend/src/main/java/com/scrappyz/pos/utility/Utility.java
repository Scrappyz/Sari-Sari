package com.scrappyz.pos.utility;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class Utility {
    public static void printJson(Object obj) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.enable(SerializationFeature.INDENT_OUTPUT); // Enables pretty print
            String json = mapper.writeValueAsString(obj);
            System.out.println(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
