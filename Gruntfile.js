module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            bower: 'bower_components',
            css: 'assets/css',
            js: 'assets/js',
            images: 'assets/images',
            icons: 'assets/icons'
        },

        notify_hooks: {
          options: {
            enabled: true,
            max_jshint_notifications: 5,
            success: false,
            duration: 3
          }
        },

        notify: {
          sass: {
            options: {
              message: 'SASS and Autoprefixer finished running'
            }
          },
          jshint: {
            options: {
              message: 'jshint finished running'
            }
          }
        },

        // SCSS
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: '.'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed',
                    loadPath: '.'
                },
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.scss'
                }
            }
        },

        // CSS autoprefixer
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.css %>/style.css'
                }
            }
        },

        // Connect Server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ''
                }
            }
        },

        // Concat
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    '<%= dirs.bower %>/jquery/dist/jquery.js',
                    '<%= dirs.js %>/*.js',
                    '!<%= dirs.js %>/modernizr.js',
                    '!<%= dirs.js %>/build.js'
                ],
                dest: '<%= dirs.js %>/build.js',
            },
        },

        // JShint
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= dirs.js %>/*.js',
                '!<%= dirs.js %>/modernizr.js',
                '!<%= dirs.js %>/build.js'
            ]
        },

        // HTMLhint
        htmlhint: {
            html: {
                options: {
                    'tag-pair': true
                },
                src: ['*.html']
            }
        },

        // Uglify
        uglify: {
            all: {
                files: {
                    '<%= dirs.js %>/build.js': ['<%= dirs.js %>/build.js'],
                    '<%= dirs.js %>/modernizr.js': ['<%= dirs.bower %>/modernizr/modernizr.js']
                }
            }
        },

        // Imagemin
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.images %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.images %>'
                }]
            }
        },


        // SVGmin
        svgmin: {
            options: {
                plugins: [
                  { removeViewBox: false },
                  { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.icons %>',
                    src: ['*.svg'],
                    dest: '<%= dirs.icons %>/_min',
                    ext: '.svg'
                }]
            }
        },

        // Grunticon
        grunticon: {
            icons: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.icons %>/_min',
                    src: ['*.svg', '*.png'],
                    dest: "<%= dirs.icons %>/grunticon"
                }],
                options: {
                    cssprefix: ".icon--"
                }
            }
        },

        // Browser Sync
        browser_sync: {
            dev: {
                bsFiles: {
                    src : 'assets/css/style.css'
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: ""
                    },
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    },
                }
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['<%= dirs.css %>/*.scss'],
                tasks: ['sass:dev', 'notify:sass', 'autoprefixer']
            },
            images: {
                files: ['<%= dirs.images %>/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            icons: {
                files: ['<%= dirs.icons %>/*'],
                tasks: ['svgmin', 'grunticon']
            },
            html: {
                files: ['*.html'],
                tasks: ['htmlhint']
            },
            scripts: {
                files: ['Gruntfile.js', '<%= dirs.js %>/*.js'],
                tasks: ['jshint', 'jshint:sass', 'concat'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:build', 'autoprefixer', 'concat', 'uglify', 'imagemin']);
    grunt.registerTask('dev', ['connect', 'watch']);
    grunt.registerTask('dev:sync', ['browser_sync', 'watch']);
};
