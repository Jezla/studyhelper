package com.elec5620.studyhelper.factory;

import java.util.Map;
import java.util.HashMap;

/**
 * Core registry used to register factories.
 * This class should be accessed statically.
 */
public class HelperRegistry {

    public enum FactoryType {
        USER,
        COURSE,
        RESOURCE,
        QUIZ;
    }

    private static Map<FactoryType, Factory> registry;
    private static boolean started = false;

    public static void initialise(int userCount, int courseCount, int resourceCount) {
        if (!HelperRegistry.started) {
            registry = new HashMap<FactoryType, Factory>();

            HelperRegistry.register(HelperRegistry.FactoryType.USER, new UserFactory(userCount));
            HelperRegistry.register(HelperRegistry.FactoryType.COURSE, new CourseFactory(courseCount));
            HelperRegistry.register(HelperRegistry.FactoryType.RESOURCE, new ResourceFactory(resourceCount));
            HelperRegistry.register(HelperRegistry.FactoryType.QUIZ, new QuizFactory());

            HelperRegistry.started = true;
        }
    }

    public static void register(FactoryType type, Factory factory) {
        registry.put(type, factory);
    }

    public static Factory getFactory(FactoryType type) {
        if (HelperRegistry.registry.containsKey(type)) {
            return HelperRegistry.registry.get(type);
        } else {
            return null;
        }
    }

}