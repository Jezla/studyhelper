package com.elec5620.studyhelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.elec5620.studyhelper.core.HelperSystem;

@SpringBootApplication
public class StudyHelperApplication {

    public static void main(String[] args) {
      HelperSystem.initialise(args);
      SpringApplication.run(StudyHelperApplication.class, args);
    }

}
