var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.OnException");
(function() {
	
	var x = 1;

	var f = function(b) {
		x = 27;
		asdfasdfrtyeyhrthbssdfeytneserg();
		x = 34;
	};

	g = FWF.OnException(f,function(){
		x *= 10;
	});

	try {
		g();
		x = 0;
	}
	catch (ex) {
		x *= 10;
	};

	if (x===2700) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");

