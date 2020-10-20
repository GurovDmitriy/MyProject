module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    concurrent: {
      concurrentTask: ['watch:watchStyleTask'],
      // concurrentBuildTask: [],
      options: {
        logConcurrentOutput: true,
      },
    },

    watch: {
      watchStyleTask: {
        files: ['source/less/**/*.less'],
        tasks: ['less'],
      },
      // watchHtmlBuildTask: {
      //   files: ['source/*.html', 'source/works/*/*.html'],
      //   tasks: [],
      // },
      // watchStyleBuildTask: {
      //   files: ['source/less/**/*.less'],
      //   tasks: [],
      // },
      // watchJsBuildTask: {
      //   files: ['source/js/*.js'],
      //   tasks: [],
      // },
    },

    browserSync: {
      browserSyncTask: {
        bsFiles: {
          src: ['source/*.html', 'source/works/*/*.html', 'source/css/*.css', 'source/js/*.js'],
        },
        options: {
          server: 'source/',
          watchTask: true,
        },
      },
      serverSyncBuildTask: {
        bsFiles: {
          src: ['docs/*.html', 'docs/works/*/*.html', 'docs/css/*.css', 'docs/js/*.js'],
        },
        options: {
          server: 'docs/',
          watchTask: true,
        },
      },
    },

    less: {
      lessTask: {
        options: {
          relativeUrls: true,
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
          ],
          sourceMap: true,
          sourceMapFilename: 'source/css/style.css.map',
          sourceMapURL: '/css/style.css.map',
          sourceMapBasepath: 'source',
          sourceMapRootpath: '/',
        },
        files: {
          'source/css/style.css': 'source/less/style.less',
        },
      },
    },

    cssmin: {
      cssminBuildTask: {
        files: [{
          expand: true,
          cwd: 'docs/css/',
          src: ['*.css'],
          dest: 'docs/css/',
        }]
      }
    },

    babel: {
      babelBuildTask: {
        options: {
          presets: ["@babel/preset-env"],
        },
        files: [{
          expand: true,
          cwd: 'docs/js/',
          src: ['default.js'],
          dest: 'docs/js/',
        }]
      },
    },

    uglify: {
      uglifyBuildTask: {
        files: [{
          expand: true,
          cwd: 'docs/js',
          src: '*.js',
          dest: 'docs/js'
        }],
      },
    },

    svgstore: {
      svgstoreTask: {
        options: {
          includeTitleElement: false,
          prefix: 'icon-',
          svg: {
            viewBox: '0 0 100 100',
            xmlns: 'http://www.w3.org/2000/svg',
          },
        },
        svgSprite: {
          files: {
            'source/image/min/sprite.svg': ['source/image/min/*.svg'],
          },
        },
      },
    },

    cwebp: {
      cwebpTask: {
        options: {
          q: 70,
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'source/image/min/',
        }],
      },
    },

    image: {
      imageMinTask: {
        options: {
          optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
          pngquant: ['--speed=1', '--force', 256],
          zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
          jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
          mozjpeg: ['-optimize', '-progressive'],
          guetzli: ['--quality', 85],
          gifsicle: ['--optimize'],
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'source/image/min/',
        }],
      },
      imageSvgMinTask: {
        options: {
          svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors'],
        },
        files: [{
          expand: true,
          cwd: 'source/image/origin/',
          src: ['**/*.svg'],
          dest: 'source/image/min/',
        }],
      },
    },

    // prettify: {
    //   prettifyTask: {
    //     options: {
    //       config: '.prettifyrc',
    //     },
    //     files: {
    //       expand: true,
    //       cwd: 'docs/',
    //       ext: '.html',
    //       src: ['*.html'],
    //       dest: 'docs/',
    //     },
    //   },
    // },

    htmlmin: {
      htmlMinBuildTask: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [{
          expand: true,
          cwd: 'docs',
          src: ['*.html', 'works/*/*.html'],
          dest: 'docs',
        }],
      },
    },

    ttf2woff: {
      ttf2woffTask: {
        src: ['source/fonts/ttf/*.ttf'],
        dest: 'source/fonts/woff/',
      },
    },

    ttf2woff2: {
      ttf2woff2Task: {
        src: ['source/fonts/ttf/*.ttf'],
        dest: 'source/fonts/woff2/',
      },
    },


    clean: {
      cleanBuildTask: {
        src: ['docs/'],
      },
    },

    copy: {
      copyBuildTask: {
        files: [
        {
          expand: true,
          flatten: true,
          src: ['source/*'],
          dest: 'docs/',
          filter: 'isFile'
        },
        {
          expand: true,
          cwd: 'source',
          src: [
            'fonts/woff/*',
            'fonts/woff2/*',
            'image/min/*',
            'works/**/*',
            'css/style.css',
            'js/*.js',
          ],
          dest: 'docs/',
        },
        ],
      },
    },
  });

  grunt.registerTask('serve', [
    'less:lessTask',
    'browserSync:browserSyncTask',
    'concurrent:concurrentTask',
  ]);

  grunt.registerTask('imgpress', [
    'cwebp:cwebpTask',
    'image',
    'svgstore:svgstoreTask',
  ]);

  grunt.registerTask('svgsprite', [
    'image:svgMinTask',
    'svgstore:svgstoreTask',
  ]);

  grunt.registerTask('fontgen', [
    'ttf2woff:ttf2woffTask',
    'ttf2woff2:ttf2woff2Task',
  ]);

  grunt.registerTask('build', [
    'less:lessTask',
    'clean:cleanBuildTask',
    'copy:copyBuildTask',
    'cssmin:cssminBuildTask',
    'babel:babelBuildTask',
    'uglify:uglifyBuildTask',
    'htmlmin:htmlMinBuildTask',
  ]);
};
