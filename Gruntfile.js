module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    jshint: {
      options: {
        node: true
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js']
    },

    simplemocha: {
      src: ['test/api/**/notes_test.js','test/api/**/auth_test.js']
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

  grunt.registerTask('test', ['jshint', 'simplemocha','browserify']);
  grunt.registerTask('default',['test']);
};
