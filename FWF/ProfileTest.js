var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.Profile");
(function() {

	var f = function() {
		var y = 1;
		for (var i=4;i<100000;i++) {
			y = y * i / (i-1);
		}
	};

	var g = FWF.Profile(f);

	g();
	g();
	g();
	var x = g.getProfileData().totalCount;

	if (x===3) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");

