module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks('grunt-copy');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js']
    },

    jscs: {
      src:['server.js','routes/**/*.js'],
      options:{
        config:'.jscsrc'
      }
    },

    simplemocha: {
      src: ['test/api/**/notes_test.js','test/api/**/auth_test.js']
    },

  clean: {
    src: ['build/']
  },

  copy: {
    dev: {
     cwd: 'app/',
    expand: true,
    src: ['**/*.html'],
    dest: 'build/' 
    }
  },

    browserify: {
    dev: {
      src: ['notes.js'],
      dest: './browser/dist/notes.bundle.js',
      options: {
          transform: ['debowerify']
      },
    },
  },

  test: {
    src: ['test/**/*.js'],
    dest: 'test/test_bundle.js',
    options:{
      transform:['debowerify']
    }
  }

  });

  grunt.registerTask('test', ['jshint','jscs', 'simplemocha','browserify']);
  grunt.registerTask('default',['test']);
};
