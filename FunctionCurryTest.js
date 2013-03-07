var FunctionCurry = require("./FunctionCurry");

var myassert = function(a,b) {
	if (a!==b) throw new Error("Assertion Failed. Expected '"+b+"' but got '"+a+"'.");
	return true;
};

(function(){
	var f = function(one,two,three,four,five,six) {
		one = one || 0;
		two = two || 0;
		three = three || 0
		four = four || 0
		five = five || 0
		six = six || 0
		return (Math.floor((one*two+three/four-five*six*six)*100)*.01);
	};

	var c = FunctionCurry(f,4);
	myassert(c(1,2,3),4.66);

	var c = FunctionCurry(f,4,5,6);
	myassert(c(1,2,3),8);

	var c = FunctionCurry(f,4,5,6,7);
	myassert(c(1,2,3),16.85);

	var c = FunctionCurry(f,undefined,14);
	myassert(c(1,2,3),14.66);

	var c = FunctionCurry(f,undefined,undefined,4);
	myassert(c(1,2,3),3.33);

	console.log("TEST 1 - curry - PASSED");



})();

