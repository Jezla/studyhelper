package com.elec5620.studyhelper.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.elec5620.studyhelper.core.Course;
import com.elec5620.studyhelper.core.HelperSystem;
import com.elec5620.studyhelper.core.Report;
import com.elec5620.studyhelper.core.User;
import com.elec5620.studyhelper.core.Student;
import com.elec5620.studyhelper.core.Teacher;
import com.elec5620.studyhelper.auth.Session;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    protected static Session session = null;

    private record CourseResponse(String courseId) {}

    @GetMapping("/")
    @ResponseBody
    public Response index() {
        return new Response("Study Helper Application");
    }

    /**
     * Returns all information for the currently logged in user.
     * Will return empty json if no user has logged in.
     */
    @GetMapping("/user")
    @ResponseBody
    public User user() {
        if (Controller.session == null) {
            return null; // returns "{}"
        } else {
            return Controller.session.getUser();
        }
    }

    @GetMapping("/isprof")
    @ResponseBody
    public String isProf() {
        if (Controller.session.getUser().getUserType().equals("teacher")){
            return "true";
        }
        return "false";

    }

    /**
     * Creates a course with the provided name for the currently logged in teacher or admin.
     * Parameters: name
     * Returns the id of the newly created course, or empty json if there was no user logged in
     * or the user is not a student or admin.
     */
    @PostMapping("/user/course/new")
    @ResponseBody
    public CourseResponse newCourse(@RequestParam(value = "name", defaultValue = "New Course") String name) {
        if (Controller.session == null || Controller.session.getUser() == null
            || Controller.session.getUser().getUserType().equals("student")) { // students are not able to add courses
            return null; // returns "{}"
        } else {
            return new CourseResponse(HelperSystem.newCourse(Controller.session.getUser(), name).getId());
        }
    }

    /**
     * Creates a new report authored by the currently logged in teacher.
     */
    @PostMapping("/user/report/new")
    @ResponseBody
    public Report newReport(@RequestParam(value = "studentId", defaultValue = "0") String studentId,
                            @RequestParam(value = "content", defaultValue = "New Report") String content) {
        if (Controller.session == null || Controller.session.getUser() == null
            || !Controller.session.getUser().getUserType().equals("teacher")) {
            return null; // returns "{}"
        } else {
            return HelperSystem.newStudentReport(Controller.session.getUser(), studentId, content);
        }
    }
    
    @GetMapping("/course/{id}")
    public Course getCourse(@PathVariable String id) {
        return HelperSystem.getCourse(id);
    }

    @PostMapping("/course/{id}/add/student")
    public Response addCourseStudent(@PathVariable String id) {
        if (Controller.session == null)
            return new Response("There is no logged in user.");

        boolean success = HelperSystem.addCourseStudent(id, Controller.session.getUser());
        return new Response(success ? "Successfully added user to course." : "Logged in user has not been added to course. They may not be a student.");
    }

    @PostMapping("/course/{id}/add/teacher")
    public Response addCourseTeacher(@PathVariable String id) {
        if (Controller.session == null)
            return new Response("There is no logged in user.");

        boolean success = HelperSystem.addCourseTeacher(id, Controller.session.getUser());
        return new Response(success ? "Successfully added user to course." : "Logged in user has not been added to course. They may not be a teacher.");
    }

    @GetMapping("/course/{id}/students")
    public List<Student> getCourseStudents(@PathVariable String id) {
        return HelperSystem.getCourseStudents(id);
    }

    @GetMapping("/course/{id}/teachers")
    public List<Teacher> getCourseTeachers(@PathVariable String id) {
        return HelperSystem.getCourseTeachers(id);
    }
    
}
