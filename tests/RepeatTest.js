var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.Repeat");
(function() {
	var x = 0;

	var f = function() {
		x += 2;
	};

	var g = FWF.Repeat(f,10);

	g();

	if (x===20) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");

