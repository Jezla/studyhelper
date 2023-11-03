package com.elec5620.studyhelper.core;

public class Report {

    private Teacher author;
    private String content;

    public Report(Teacher author, String content) {
        this.author = author;
        this.content = content;
    }

    public Teacher getAuthor() {
        return this.author;
    }

    public String getContent() {
        return this.content;
    }
    
}