package com.elec5620.studyhelper.auth;

import com.elec5620.studyhelper.core.User;

public class Session {

    // private int id;
    private User user;
    // private Quiz currentQuiz;
    
    public Session(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }

}