module.exports = function (grunt) {
    "use strict";
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bower: {
            install: {
                options: {
                    targetDir: "./lib",
                    layout: "byComponent",
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: true,
                },
            },
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: "build/chromerred.min.map",
                },
                files: {
                    "build/chromerred.min.js": "src/chromerred.js",
                },
            },
        },
        jshint: {
            all: ["Gruntfile.js", "src/chromerred.js", "test/test1/*.js", "test/test2/*.js"],
            options: {
                jshintrc: true,
            },
        },
        yuidoc: {
            compile: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                version: "<%= pkg.version %>",
                url: "<%= pkg.homepage %>",
                options: {
                    paths: "src",
                    outdir: "yuidoc"
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");
    grunt.loadNpmTasks("grunt-bower-task");
};
