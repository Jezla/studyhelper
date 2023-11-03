package com.elec5620.studyhelper.auth;

import com.elec5620.studyhelper.core.User;
import com.elec5620.studyhelper.factory.HelperRegistry;
import com.elec5620.studyhelper.factory.UserFactory;
import com.elec5620.studyhelper.factory.HelperRegistry.FactoryType;

import java.util.List;

/**
 * Static class containing login/register functionality
 */
public class Authentication {

    public static Session login(List<User> users, String username, String password) {
        Session session = null;
        for (User user : users) {
            if (user.getUsername().equals(username) && user.checkPassword(password)) {
                session = new Session(user);
                break;
            }
        }

        return session;
    }

    public static User register(String username, String password, String type) {
        UserFactory.UserType userType = UserFactory.UserType.STUDENT;

        if (type.equals("teacher"))
            userType = UserFactory.UserType.TEACHER;

        UserFactory factory = (UserFactory) HelperRegistry.getFactory(FactoryType.USER);
        User newUser = factory.create(username, password, userType);

        // TODO write to database
        return newUser;
    }

    public static boolean hasUser(List<User> users, String username) {

        for (User user : users) {
            if (user.getUsername().equals(username))
                return true;
        }

        return false;
    }

}