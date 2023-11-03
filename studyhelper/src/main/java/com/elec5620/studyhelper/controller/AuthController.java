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
import com.elec5620.studyhelper.core.User;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @PostMapping("/login")
    @ResponseBody
    public Response login(@RequestParam(value = "username", defaultValue = "none") String username,
                        @RequestParam(value = "password", defaultValue = "none") String password) {
      Controller.session = HelperSystem.login(username, password);
      return new Response(Controller.session == null ? "Login Unsuccessful. Check your details or create an account." : "Login Successful");
    }

    @PostMapping("/register")
    @ResponseBody
    public Response register(@RequestParam(value = "username", defaultValue = "none") String username,
                           @RequestParam(value = "password", defaultValue = "none") String password,
                           @RequestParam(value = "type", defaultValue = "student") String type) {
      Controller.session = HelperSystem.register(username, password, type);
      return new Response(Controller.session == null ? "Registration Unsuccessful. An account likely already exists with that name." : "Registration Successful. Please log in with your new account.");
    }

    @PostMapping("/logout")
    @ResponseBody
    public Response logout() {
        if (Controller.session == null)
            return new Response("There was no user logged in.");

        Controller.session = null;
        return new Response("Logout Successful");
    }
    
}
