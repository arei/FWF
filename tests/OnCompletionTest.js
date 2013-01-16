var FWF = require("../FunWithFunctions");

console.log("TEST: FWF.OnCompletion");
(function() {
	var x = 0;

	var f = function(b) {
		x += 1;
		if (b) throw new Error("some error");
		x += 2;
	};

	g = FWF.OnCompletion(f,function(){
		x += 3;
	});

	try {
		g(true);  //4
		x += 4;
		g(false);
	}
	catch (ex) {
		x += 5; //9
	};
	try {
		x += 6; //15
		g(false); //21
	}
	catch (ex) {
		x += 7;
	};

	if (x===21) console.log("PASSED");
	else console.log("FAILED");
})();
console.log("");

