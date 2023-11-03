package com.elec5620.studyhelper.core;

public abstract class User {

    private String id;
    private String username;
    private String password;
    private String userType;

    public User(String id, String username, String password, String userType) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.userType = userType;
    }

    public String getId() {
        return this.id;
    }

    public String getUsername() {
        return this.username;
    }

    public String getUserType() {
        return this.userType;
    }

    public boolean checkPassword(String password) {
        return this.password.equals(password);
    }

}