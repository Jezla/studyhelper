package com.elec5620.studyhelper.factory;

import com.elec5620.studyhelper.core.Course;

public class CourseFactory implements Factory {

    private int courseCount = 0;

    public CourseFactory(int courseCount) {
        this.courseCount = courseCount;
    }

    public Course create(String name) {
        Course course = new Course(String.valueOf(this.courseCount), name);
        this.courseCount += 1;
        return course;
    }

}