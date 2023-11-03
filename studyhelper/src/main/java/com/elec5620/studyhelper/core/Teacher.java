package com.elec5620.studyhelper.core;

import java.util.ArrayList;
import java.util.List;

public class Teacher extends User {

    private List<Course> courses;

    public Teacher(String id, String username, String password) {
        super(id, username, password, "teacher");
        courses = new ArrayList<Course>();
    }

    public void addCourse(Course course) {
        if (!this.courses.contains(course))
            this.courses.add(course);
    }

    public List<Course> getCourses() {
        return this.courses;
    }
    
}