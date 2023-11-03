package com.elec5620.studyhelper.core;

public class Admin extends User {

    public Admin(String id, String username, String password) {
        super(id, username, password, "admin");
    }

}