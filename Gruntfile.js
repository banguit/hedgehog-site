/*!
 * Hedgehog site Gruntfile
 * https://github.com/banguit/hedgehog-site
 * Copyright 2014 Dmitry Antonenko
 */

module.exports = function(grunt) {
    'use strict';

    // Configure
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        shell: {
            // Compile scripts
            compile: {
                command: 'sh compile.sh'
            },
            compile_hedgehog_bootstrap: {
                command: [
                    'cd libs/hedgehog-bootstrap',
                    'grunt'
                ].join('&&')
            }
        },

        copy: {
            hedgehog_bootstrap_dist: {
                expand: true,
                cwd: 'libs/hedgehog-bootstrap/dist',
                src: ['**'],
                dest: 'dist/assets'
            },
            hbs: {
                expand: true,
                cwd: 'app',
                src: '*.hbs',
                dest: 'dist'
            },
            hbs_partials: {
                expand: true,
                cwd: 'app/partials',
                src: '**',
                dest: 'dist/partials/'
            },
            package_json: {
                src: 'app/package.json',
                dest: 'dist/package.json'
            },
            theme: {
                expand: true,
                cwd: 'dist',
                src: ['**'],
                dest: 'ghost/content/themes/hedgehog'
            }
        },

        clean: {
            dist: ['dist/*'],
            ghost_theme: ['ghost/content/themes/hedgehog/*']
        },

        watch: {
            scripts: {
                files: ['app/*.js', 'app/**/*.js', 'app/views/*.soy'],
                tasks: ['shell:compile', 'clean:ghost_theme', 'copy:theme']
            },
            less: {
                files: ['libs/hedgehog-bootstrap/less/*.less'],
                tasks: ['shell:compile_hedgehog_bootstrap', 'copy:hedgehog_bootstrap_dist', 'clean:ghost_theme', 'copy:theme']
            },
            hbs: {
                files: ['app/*.hbs', 'app/**/*.hbs'],
                tasks: ['copy:hbs', 'copy:hbs_partials', 'copy:theme']
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Register default tasks
    grunt.registerTask('default',
        [
            'clean:dist',
            'clean:ghost_theme',
            'shell:compile',
            'shell:compile_hedgehog_bootstrap',
            'copy:hedgehog_bootstrap_dist',
            'copy:hbs',
            'copy:hbs_partials',
            'copy:package_json',
            'copy:theme'
        ]
    );
};