package com.elec5620.studyhelper.core;

import java.util.List;
import java.util.ArrayList;

public class Course {

    private String id;
    private String name;

    // Can't expose the list of students or teachers or the JSON 
    // will serialise infinitely, since both the student/teacher and the
    // course would reference each other. These must therefore not have get
    // methods.
    private List<Teacher> teachers;
    private List<Student> students;

    private List<Resource> resources;

    public Course(String id, String name) {
        this.id = id;
        this.name = name;
        this.resources = new ArrayList<Resource>();
        this.teachers = new ArrayList<Teacher>();
        this.students = new ArrayList<Student>();
    }

    public void addResource(Resource resource) {
        if (!this.resources.contains(resource))
            this.resources.add(resource);
    }

    public boolean addTeacher(Teacher teacher) {
        if (!this.teachers.contains(teacher)) {
            this.teachers.add(teacher);
            return true;
        } 

        return false;
    }

    public boolean addStudent(Student student) {
        if (!this.students.contains(student)) {
            this.students.add(student);
            return true;
        }

        return false;
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public List<Resource> getResources() {
        return this.resources;
    }

    public boolean hasStudent(Student student) {
        return this.students.contains(student);
    }

    public boolean hasTeacher(Teacher teacher) {
        return this.teachers.contains(teacher);
    }
    
}