package com.elec5620.studyhelper.core;

public abstract class Resource {

    private String id;
    private String content;

    public Resource(String id, String content) {
        this.id = id;
        this.content = content;
    }

    public String getId() {
        return this.id;
    }

    public String getContent() {
        return this.content;
    }
 
}