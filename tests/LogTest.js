var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.Log");
(function() {
	var x = 0;
	var savelog = console.log;
	var saveerror = console.error;
	console.log = function() {
		x += 1;
	};
	console.error = function() {
		x += 10000;
	};

	var f = function() {
		x += 2;
	};

	var g = FWF.Log(f,"log");

	g();
	g();
	g();

	console.log = savelog;
	console.error = saveerror;

	if (x===9) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");
