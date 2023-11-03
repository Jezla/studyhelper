package com.elec5620.studyhelper.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.elec5620.studyhelper.core.HelperSystem;
import com.elec5620.studyhelper.core.Resource;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ResourceController {

    @PostMapping("/user/upload")
    @ResponseBody
    public Resource userUpload(@RequestParam(value = "content", defaultValue = "hello") String content) {
        if (Controller.session == null || Controller.session.getUser() == null
            || !Controller.session.getUser().getUserType().equals("student")) {
            // only students can personally upload notes
            return null;
        } else {
            return HelperSystem.newStudentResource(Controller.session.getUser(), content);
        }
    }

    @PostMapping("/course/{id}/upload")
    @ResponseBody
    public Resource courseUpload(@PathVariable String id, @RequestParam(value = "content", defaultValue = "hello") String content) {
        if (Controller.session == null || Controller.session.getUser() == null
            || Controller.session.getUser().getUserType().equals("student")) {
            // only teachers or admins can upload notes to a course
            return null;
        } else {
            return HelperSystem.newCourseResource(id, content);
        }
    }
}
