var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.Record");
(function() {
	var x = 0;

	var f = function(y) {
		x += y;
	};

	var g = FWF.Record(f);

	g(1);
	g(2);
	g(3);
	g.rerun();
	g.rerun(3);
	g.redo(3);

	if (x===21) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");

