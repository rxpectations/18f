'use strict';


module.exports = function stylus(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Options
	return {
	    build: {
	        options: {
	            compress: true
	        },
            use: [
              require('jeet'),
              require('nib')
            ],
            paths: [
              './node_modules/jeet/stylus'
			],
            files: [{
                expand: true,
                cwd: 'public/css',
                src: ['**/*.styl'],
                dest: '.build/css/',
                ext: '.css'
            }]
	    }
	};
};
