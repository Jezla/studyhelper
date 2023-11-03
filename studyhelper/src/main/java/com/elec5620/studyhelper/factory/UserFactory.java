package com.elec5620.studyhelper.factory;

import com.elec5620.studyhelper.core.User;
import com.elec5620.studyhelper.core.Student;
import com.elec5620.studyhelper.core.Teacher;
import com.elec5620.studyhelper.core.Admin;

public class UserFactory implements Factory {

    public enum UserType {
        STUDENT,
        TEACHER,
        ADMIN;
    }

    private int userCount = 0;

    public UserFactory(int userCount) {
        this.userCount = userCount;
    }

    public User create(String username, String password, UserType type) {
        User newUser = null;
        String id = String.valueOf(this.userCount);

        switch (type) {
            case STUDENT:
                newUser = new Student(id, username, password);
            case TEACHER:
                newUser = new Teacher(id, username, password);
            case ADMIN:
                newUser = new Admin(id, username, password);
        }

        this.userCount += 1;
        return newUser;
    }
}