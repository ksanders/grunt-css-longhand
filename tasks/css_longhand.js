/*
 * css-longhand
 *
 *
 * Copyright (c) 2014 K Sanders
 * Licensed under the MIT license.
 */'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gmruntjs.com/creating-tasks

	grunt.registerMultiTask('css_longhand', 'Convert CSS shorthand margin/padding/border properties to their longhand equivalents', function() {
		var path = require('path');
		var fs = require('fs');

		var kindOf = grunt.util.kindOf;

		var dest;
		var isExpandedPair;

		this.files.forEach(function(filePair) {
			isExpandedPair = filePair.orig.expand || false;

			filePair.src.forEach(function(src) {
				if (detectDestType(filePair.dest) === 'directory') {
					dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
				} else {
					dest = filePair.dest;
				}

				if (grunt.file.isDir(src)) {
					grunt.file.mkdir(dest);
				} else {
					grunt.verbose.writeln('Writing ' + src.cyan + ' -> ' + dest.cyan);
					var count = 0;
					var data = longhand(grunt.file.read(src), count);
					grunt.file.write(dest, data);
					grunt.log.writeln('File ' + dest.cyan + ' created');
				}
			});
		});
		grunt.log.writeln();
	});

	var detectDestType = function(dest) {
		if (grunt.util._.endsWith(dest, '/')) {
			return 'directory';
		} else {
			return 'file';
		}
	};

	var unixifyPath = function(filepath) {
		if (process.platform === 'win32') {
			return filepath.replace(/\\/gm, '/');
		} else {
			return filepath;
		}
	};

	var longhand = function(data) {
		var pattern;
		// margin/padding
		pattern = /[\s]*(margin|padding)[\s]*:[\s]*([\w%\-]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-top: $2$3;\n  $1-right: $2$3;\n  $1-bottom: $2$3;\n  $1-left: $2$3;");
		pattern = /[\s]*(margin|padding)[\s]*:[\s]*([\w%\-]+)[\s]+([\w%\-]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-top: $2$4;\n  $1-right: $3$4;\n  $1-bottom: $2$4;\n  $1-left: $3$4;");
		pattern = /[\s]*(margin|padding)[\s]*:[\s]*([\w%\-]+)[\s]+([\w%\-]+)[\s]+([\w%\-]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-top: $2$5;\n  $1-right: $3$5;\n  $1-bottom: $4$5;\n  $1-left: $3$5;");
		pattern = /[\s]*(margin|padding)[\s]*:[\s]*([\w%\-]+)[\s]+([\w%\-]+)[\s]+([\w%\-]+)[\s]+([\w%\-]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-top: $2$6;\n  $1-right: $3$6;\n  $1-bottom: $4$6;\n  $1-left: $5$6;");

		// border:
		pattern = /[\s]*(border(?:-width|-style|-color))[\s]*:[\s]*([#\w%]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  border: $2$3;;");
		// Split up properies to individual rules:
		// two properties
		pattern = /[\s]*(border(?:-top|-right|-bottom|-left)*)[\s]*:[\s]*([#\w%]+)[\s]+([#\w%]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1: $2$4;\n  $1: $3$4;");
		// three properties
		pattern = /[\s]*(border(?:-top|-right|-bottom|-left)*)[\s]*:[\s]*([#\w%]+)[\s]+([#\w%]+)[\s]+([#\w%]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1: $2$5;\n  $1: $3$5;\n  $1: $4$5;");
		// single property to -top, -right, -bottom, -left
		pattern = /[\s]*(border)[\s]*:[\s]*([#\w%]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-top: $2$3;\n  $1-right: $2$3;\n  $1-bottom: $2$3;\n  $1-left: $2$3;");
		// border-style
		pattern = /[\s]*(border-(?:top|right|bottom|left))[\s]*:[\s]*(none|hidden|dashed|dotted|solid|double|groove|ridge|inset|outset)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-style: $2$3;");
		// border-width
		pattern = /[\s]*(border-(?:top|right|bottom|left))[\s]*:[\s]*([\d]+[a-zA-Z]*[%]*)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-width: $2$3;");
		// border-coloor
		pattern = /[\s]*(border-(?:top|right|bottom|left))[\s]*:[\s]*(#[\da-fA-F]{3,6}|[a-zA-Z]+)([\s]*|[\s]*!important[\s]*);/gm;
		data = data.replace(pattern, "\n  $1-color: $2$3;");

		return data;
	};
};
