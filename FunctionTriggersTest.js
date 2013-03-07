var FunctionTrigger = require("./FunctionTriggers");

var myassert = function(a,b) {
	if (a!==b) throw new Error("Assertion Failed. Expected '"+b+"' but got '"+a+"'.");
	return true;
};

(function(){
	var x = 0;

	var f = FunctionTrigger(function() {
		x = 1;
	});
	f.triggersAddListener("complete",function(){
		x = 2;
	});
	f();

	setTimeout(function(){
		myassert(x,2);
		console.log("TEST 1 - triggers - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOn(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,30000000);
		console.log("TEST 2 - triggersOn - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnSuccess(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,30000);
		console.log("TEST 3 - triggersOnSuccess - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnFailure(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,300);
		console.log("TEST 4 - triggersOnFailure - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOn(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,30000000);
		console.log("TEST 5 - triggersAnyOn - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAnySuccess(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,30000);
		console.log("TEST 6 - triggersOnAnySuccess - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAnyFailure(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,300);
		console.log("TEST 7 - triggersOnAnyFailure - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAll(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,300);
		console.log("TEST 8 - triggersOnAll - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAllSuccess(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,30);
		console.log("TEST 9 - triggersOnAllSuccess - PASSED");
	},0.01);
})();

(function(){
	var x = 1;
	var y = 10;

	var a = FunctionTrigger(function(){
		x *= 2;
	});
	var b = FunctionTrigger(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = FunctionTrigger(function(){
		x *= 5;
	});

	var f = FunctionTrigger(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAllFailure(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		myassert(x,30);
		console.log("TEST 10 - triggersOnAllFailure - PASSED");
	},0.01);
})();

