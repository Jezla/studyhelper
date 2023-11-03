package com.elec5620.studyhelper.core;

import java.util.List;
import java.util.ArrayList;

public class Student extends User {

    private List<Course> courses;
    private List<Resource> resources;
    private List<Report> reports;

    public Student(String id, String username, String password) {
        super(id, username, password, "student");
        this.courses = new ArrayList<Course>();
        this.resources = new ArrayList<Resource>();
        this.reports = new ArrayList<Report>();
    }

    public void addCourse(Course course) {
        if (!this.courses.contains(course))
            this.courses.add(course);
    }

    public void addResource(Resource resource) {
        if (!this.resources.contains(resource))
            this.resources.add(resource);
    }

    public void addReport(Report report) {
        if (!this.reports.contains(report))
            this.reports.add(report);
    }

    public List<Course> getCourses() {
        return this.courses;
    }

    public List<Resource> getResources() {
        return this.resources;
    }

    public List<Report> getReports() {
        return this.reports;
    }

}