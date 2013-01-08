var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.Any");
(function() {
	var x = 0;

	var f1 = function() {
		x += 2;
	};
	var f2 = function() {
		x += 2;
	};
	var f3 = function() {
		x += 2;
	};
	var f4 = function() {
		x += 2;
	};

	var g = FWF.Any(f1,f2,f3,f4);

	g();
	if (x===2) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");
