package com.elec5620.studyhelper.api.llm;

import io.github.cdimascio.dotenv.Dotenv;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;


public class GPTService {
    

    public static void main(String[] args) {

        try (Scanner myObj = new Scanner(System.in)) {
            System.out.println("Enter question to ask:");

            String question = myObj.nextLine();  // Read user input

            String text = chatGPT(question);
            text = text.replace("\\n", System.lineSeparator());
            System.out.println("");
            System.out.println("");
            System.out.println("Here is your response: ");
            System.out.println(text);
            // Prints out a response to the question.
        }
    }

    public static String chatGPT(String message) {
        Dotenv dotenv = Dotenv.load();
        String token = dotenv.get("OPENAI_API_KEY");
        String url = "https://api.openai.com/v1/chat/completions";
        String apiKey = token; // API key goes here
        String model = "gpt-3.5-turbo"; // current model of chatgpt api

        try {
            // Create the HTTP POST request
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Authorization", "Bearer " + apiKey);
            con.setRequestProperty("Content-Type", "application/json");

            // Build the request body
            String body = "{\"model\": \"" + model + "\", \"messages\": [{\"role\": \"user\", \"content\": \"" + message + "\"}]}";
            con.setDoOutput(true);
            OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream());
            writer.write(body);
            writer.flush();
            writer.close();

            // Get the response
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // returns the extracted contents of the response.
            String text = extractContentFromResponse(response.toString());
            text = text.replace("\\n", System.lineSeparator());
            return text;

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // This method extracts the response expected from chatgpt and returns it.
    public static String extractContentFromResponse(String response) {
        int startMarker = response.indexOf("content")+11; // Marker for where the content starts.
        int endMarker = response.indexOf("\"", startMarker); // Marker for where the content ends.
        return response.substring(startMarker, endMarker); // Returns the substring containing only the response.
    }
}
    
