var FWF = require("../FunWithFunctions"); 
 
console.log("TEST: FWF.ArgRequired"); 
(function() { 

	var x = 1;

	var f = function(a,b,c,d) {
		x *= b+c;
	};
	var g = FWF.ArgRequired(f,false,true,true,false);

	try {
		g(1,2,3,4);
		g(10,20);
	}
	catch (ex) {
		x *= 100;
	}

	if (x===500) console.log("PASSED");
	else console.log("FAILED");
})(); 
console.log(""); 
