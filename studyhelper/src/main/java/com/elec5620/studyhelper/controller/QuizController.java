package com.elec5620.studyhelper.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.elec5620.studyhelper.core.HelperSystem;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    private record DirectResponse(String gptResponse) {};

    @GetMapping("/direct")
    @ResponseBody
    public DirectResponse directRequest(@RequestParam(value = "request", defaultValue = "hello") String request) {
        return new DirectResponse(HelperSystem.directRequest(request));
    }

    @GetMapping("/directdoc")
    @ResponseBody
    public DirectResponse directDocRequest(@RequestParam(value = "request", defaultValue = "Summarise these notes") String request) {
        return new DirectResponse(HelperSystem.directDocRequest(request, Controller.session.getUser()));
    }

    @GetMapping("/user/quiz")
    @ResponseBody
    public String quizRequest() {
        if (Controller.session == null || Controller.session.getUser() == null
            || !Controller.session.getUser().getUserType().equals("student")) {
            // only students can take quizzes
            return "{}";
        } else {
            return HelperSystem.newQuiz(Controller.session.getUser());
        }
    }
    
}
