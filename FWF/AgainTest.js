var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.Again");
(function() {
	var x = 0;

	var f = function() {
		x += 2;
	};

	var g = FWF.Again(f);

	g();
	g.again();
	g.again();

	if (x===6) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");
