package com.elec5620.studyhelper.factory;

import com.elec5620.studyhelper.core.Resource;
import com.elec5620.studyhelper.core.TextResource;

public class ResourceFactory implements Factory {

    private int resourceCount = 0;

    public ResourceFactory(int resourceCount) {
        this.resourceCount = resourceCount;
    }

    public Resource createText(String content) {
        Resource newResource = new TextResource(String.valueOf(this.resourceCount), content);
        this.resourceCount += 1;
        return newResource;
    }

    
}