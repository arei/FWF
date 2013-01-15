FWF
-------
Fun with Functions - A Playground for JavaScript Function goofiness 

Fun With Funcation, or FWF, is a playground for goofing off with JavaScript Functions and exploring what creative things can be done with them. Some of these approaches are useful, some are not, and some are just plain weird.  Maybe you will find some value in them, maybe not.

## Using FWF in NodeJS

 1. Find us on NPM

 	npm install FWF

 2. Require us in your file

 	var FWF = require("FWF");

 3. Use our calls...

 	var f = function() { ... do something ... };
 	var g = FWF.Repeat(f,5); // when g() is execute it will actually execute f 5 times in a row.
 	g(1,2,3); // this is equivilent to doing f(1,2,3); f(1,2,3); f(1,2,3); f(1,2,3); f(1,2,3); 

 4. OR you can install FWF on the Function Prototype...
 
 	require("FWF").InstallOnFunctionPrototype();
	var f = function() { ... do something ... }.Repeat(5); // Now all calls to f() actually execute the enclosed function five times.

## Using FWF in a Browser

 1. Include the particular .js files from the FWF folder in your HTML.

	<script src="FWF/Repeat.js"></script>
 
 2. Access FWF from the global object (window).

 	var f = function() { ... do something ... };
 	var g = FWF.Repeat(f,5); // when g() is execute it will actually execute f 5 times in a row.
 	g(1,2,3); // this is equivilent to doing f(1,2,3); f(1,2,3); f(1,2,3); f(1,2,3); f(1,2,3); 
 
 3. OR you can install FWF on the Function Prototype.

 	FWF.InstallOnFunctionPrototype();
	var f = function() { ... do something ... }.Repeat(5); // Now all calls to f() actually execute the enclosed function five times.

## What Can you Do with FWF

Each of the functions given returns a modified function which will then display the characteristics described.

**Again** - Allows you to call a function multiple times without supplying the arguments again.

**All** - Given a series of functions, call all of them in the order given, one after another, with the same initial arguments.

**Any** - Given a series of functions, call exactly one of the functions, randomly determined.

**Jumble** - Given a series of functions, call all of them in a random order, one after another, with the same initial arguments.  Each function will run exactly once and each call will results in a different random execution pattern.

**Log** - Write to `console.log` or `console.error` after a function is called.  `console.log` is used if the function returns normally, while `console.error` is used if the function throws an exception. Write additional details of the function is also a `Profile` function (see below).

**OnCompletion** - Fires a callback function after the given function has executed regardless of whether or not it returned normally or threw an exception.

**OnException** - fires a callback function after the given function has executed if, and only if, the given function threw an exception.

**OnReturn** - fires a callback function after the given function has execute if, and only if, the given function did not throw an exception.

**Profile** - Record each execution of a function, how long it ran for, and if it threw an exception or not.  The data from a profile function can be retrieved using getProfileData on the profiled function.

**Record** - Record each execution including it's arguments, context, results, exceptions, etc.  You can then retreives a history of results, exceptions or executions.  You may also redo n calls back or rerun a given call.

**Repeat** - Repeats the given function n number of times.

See each individual files in the FWF folder for the details about usage.

## Contributing

This repository is open to ideas and suggestions of your own interesting function code, so feel free to push your own ideas and we'll take a look at them. Please only one to a file and make sure to include a test of the name `TestXYZ.js` if your function file is `XYZ.js`


