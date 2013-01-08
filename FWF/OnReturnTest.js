var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.OnReturn");
(function() {
	var x = 0;

	var f = function(b) {
		x = 20;
	};

	g = FWF.OnReturn(f,function(){
		x = x*20;
	});

	try {
		g();
		x = x * 10;
	}
	catch (ex) {
		x = 0;
	};

	if (x===4000) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");

