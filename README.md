# css-longhand

> Convert CSS shorthand properties to their longhand equivalents

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install css-longhand --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('css-longhand');
```

## The "css_longhand" task

### Overview
In your project's Gruntfile, add a section named `css_longhand` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_longhand: {
    example: {
		expand: true,
		src: ['*.css'],  // Process all css files in the project root
		dest: 'result/', // Output longhand css files in result/
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.1 - Initial release. Handles margin: and padding: with 1,2,3 or 4 values, and border:.

0.0.2 - Better handling of multiple properties on a single line.

0.0.3 - Break border-top/-right/-bottom/-left properties into border-top-width, border-top-style & border-top-color.

0.0.4 - Split border-width/-style/-color into border-top-*

## License
Copyright (c) 2014 K Sanders. Licensed under the MIT license.
