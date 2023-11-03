package com.elec5620.studyhelper.core;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;


import com.elec5620.studyhelper.service.Service;
import com.elec5620.studyhelper.factory.CourseFactory;
import com.elec5620.studyhelper.factory.HelperRegistry;
import com.elec5620.studyhelper.factory.ResourceFactory;
import com.elec5620.studyhelper.factory.HelperRegistry.FactoryType;
import com.elec5620.studyhelper.api.llm.ChatBot;
import com.elec5620.studyhelper.api.llm.GPTService;
import com.elec5620.studyhelper.auth.Authentication;
import com.elec5620.studyhelper.auth.Session;

import java.util.ArrayList;
import java.util.List;

/**
 * Core System class for the StudyHelper application.
 * This class should be accessed statically.
 */
public class HelperSystem {

    private static boolean started = false;
    private static final String NOTES_FOLDER = "notes/";
    private static final String NOTES_TEMPLATE = "notes_";
    private static String DIRECT_DOCUMENT_NAME = "example.txt"; 
    private static final String NOTES_GPT_QUERY = "Given the content, please form 2 mcq questions with 3 options ( just the options as a string without indexing) each, and what the correct answer ( the correct answer as a string ) will be in a JSON format with headers 'question', 'options' and 'correct_answer'.No. Here ";

    /* Users */
    private static List<User> users;

    /* Courses */
    private static List<Course> courses;

    /* Resources */
    private static List<Resource> resources;

    /* Services */
    private static List<Service> services;


    private static void loadFromDatabase() {
        // Add some dummy users, resources and courses
        Resource testResource = new TextResource("0", "Software Engineering");
        Resource testResource2 = new TextResource("1", "Mechanical Engineering");
        HelperSystem.writeResource(testResource);
        HelperSystem.writeResource(testResource2);

        Teacher teacher = new Teacher("1", "teacher", "password2!");
        Course testCourse = new Course("0", "ELEC5620");
        testCourse.addTeacher(teacher);
        testCourse.addResource(testResource);
        courses.add(testCourse);

        Student john = new Student("0", "john", "password");
        john.addCourse(testCourse);
        john.addResource(testResource2);

        users.add(john);
        users.add(teacher);
        users.add(new Admin("2", "admin", "password3"));

        resources.add(testResource);
        resources.add(testResource2);
    }

    public static void initialise(String[] args) {
        if (!started) {
            users = new ArrayList<User>();
            courses = new ArrayList<Course>();
            resources = new ArrayList<Resource>();
            services = new ArrayList<Service>();

            // Restores the System's state based on the database
            loadFromDatabase();

            int userCount = users.size();
            int courseCount = courses.size();
            int resourceCount = resources.size();
            HelperRegistry.initialise(userCount, courseCount, resourceCount);

            started = true;
            System.out.println("Study Helper Started");
        }
    }

    public static Course getCourse(String id) {
        for (Course course : HelperSystem.courses) {
            if (course.getId().equals(id))  
                return course;
        }

        return null;
    }

    public static Student getStudent(String id) {
        for (User user : HelperSystem.users) {
            if (user.getId().equals(id) && user.getUserType().equals("student"))
                return (Student) user;
        }

        return null;
    }

    public static Session login(String username, String password) {
        return Authentication.login(HelperSystem.users, username, password);
    }

    public static Session register(String username, String password, String type) {
        if (Authentication.hasUser(HelperSystem.users, username)) {
            return null;
        } else {
            User newUser = Authentication.register(username, password, type);

            if (newUser == null)
                return null;

            HelperSystem.users.add(newUser);
            return HelperSystem.login(username, password);
        }
    }

    public static Course newCourse(User user, String name) {
        CourseFactory courseFactory = (CourseFactory) HelperRegistry.getFactory(FactoryType.COURSE);
        Course addedCourse = courseFactory.create(name);

        // The user might be an admin, who can create courses but isn't assigned as a teacher
        if (user.getUserType().equals("teacher")) {
            Teacher teacher = (Teacher) user;
            addedCourse.addTeacher(teacher);
            teacher.addCourse(addedCourse);
        } 

        // TODO write to database
        courses.add(addedCourse);
        return addedCourse;
    }

    public static Report newStudentReport(User user, String studentId, String content) {
        if (user == null || !user.getUserType().equals("teacher"))
            return null;

        Student student = getStudent(studentId);
        if (student == null)
            return null;

        Report report = new Report((Teacher) user, content);
        student.addReport(report);
        return report;
    }

    public static Resource newStudentResource(User user, String content) {
        Student student = (Student) user;
        ResourceFactory resourceFactory = (ResourceFactory) HelperRegistry.getFactory(FactoryType.RESOURCE);
        Resource newResource = resourceFactory.createText(content);
        student.addResource(newResource);
        HelperSystem.writeResource(newResource);
        resources.add(newResource);
        return newResource;
    }

    public static Resource newCourseResource(String courseId, String content) {
        Course course = HelperSystem.getCourse(courseId);
        if (course == null)
            return null;

        ResourceFactory resourceFactory = (ResourceFactory) HelperRegistry.getFactory(FactoryType.RESOURCE);
        Resource newResource = resourceFactory.createText(content);
        course.addResource(newResource);
        HelperSystem.writeResource(newResource);
        resources.add(newResource);
        return newResource;
    }

    public static boolean addCourseStudent(String courseId, User user) {
        Course course = HelperSystem.getCourse(courseId);
        if (course == null || user == null || !user.getUserType().equals("student"))
            return false;

        Student student = (Student) user;
        course.addStudent(student);
        student.addCourse(course);
        return true;
    }

    public static boolean addCourseTeacher(String courseId, User user) {
        Course course = HelperSystem.getCourse(courseId);
        if (course == null || user == null || !user.getUserType().equals("teacher"))
            return false;

        Teacher teacher = (Teacher) user;
        course.addTeacher(teacher);
        teacher.addCourse(course);
        return true;
    }

    public static List<Student> getCourseStudents(String courseId) {
        Course course = HelperSystem.getCourse(courseId);
        if (course == null)
            return null;

        List<Student> matchList = new ArrayList<Student>();
        for (User user : HelperSystem.users) {
            if (user.getUserType().equals("student")) {
                Student student = (Student) user;
                if (course.hasStudent(student))
                    matchList.add(student);
            }
        }

        return matchList;
    }

    public static List<Teacher> getCourseTeachers(String courseId) {
        Course course = HelperSystem.getCourse(courseId);
        if (course == null)
            return null;

        List<Teacher> matchList = new ArrayList<Teacher>();
        for (User user : HelperSystem.users) {
            if (user.getUserType().equals("teacher")) {
                Teacher teacher = (Teacher) user;
                if (course.hasTeacher(teacher))
                    matchList.add(teacher);
            }
        }

        return matchList;
    }

    /**
     * Returns a ChatGPT API response given the provided request.
     */
    public static String directRequest(String request) {
        return GPTService.chatGPT(request);
    }

    /**
     * Queries ChatGPT using the notes provided in notes/example.txt
     */
    public static String directDocRequest(String request, User user) {

        if (user == null || !user.getUserType().equals("student"))
            return "{}";

        Student student = (Student) user;

        // Take the most recently uploaded notes for the student
        int index = student.getResources().size() - 1;
        if (index < 0)
            return "{}";

        String notesId = student.getResources().get(index).getId();
        String filePath = HelperSystem.NOTES_FOLDER + HelperSystem.NOTES_TEMPLATE + notesId + ".txt";

        return HelperSystem.queryNotes(filePath, request);

    }

    /**
     * Queries ChatGPT using the notes found at the provided file path.
     */
    public static String queryNotes(String filePath, String request) {
        return ChatBot.response(filePath, request);
    }

    public static void writeResource(Resource resource) {
        String notesId = resource.getId();
        String fileName = HelperSystem.NOTES_TEMPLATE + notesId + ".txt";
        File file = new File(HelperSystem.NOTES_FOLDER + fileName);

        try {
            file.createNewFile();

            FileWriter writer = new FileWriter(file);
            writer.write(resource.getContent());
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static String newQuiz(User user) {
        if (user == null || !user.getUserType().equals("student"))
            return "{}";

        Student student = (Student) user;

        // Take the most recently uploaded notes for the student
        int index = student.getResources().size() - 1;
        if (index < 0)
            return "{}";

        String notesId = student.getResources().get(index).getId();
        String filePath = HelperSystem.NOTES_FOLDER + HelperSystem.NOTES_TEMPLATE + notesId + ".txt";
        System.out.println(filePath);
        return HelperSystem.queryNotes(filePath, HelperSystem.NOTES_GPT_QUERY);
    }
}