var CS = require("./corkscrew.js");
var assert = require("assert");

var tests = [];
var running = false;

var test = function(name,f) {
	tests.push({
		name: name,
		test: f
	});
	next();
};

var next = function() {
	if (running) return;
	if (tests.length>0) {
		var t = tests.shift();

		var start = Date.now();
		var report = function(state,message) {
			if (state==="pass") state = "[ PASS ] ";
			else state = "[FAILED] ";
			console.log(state+t.name+": "+(message?message:"")+" ("+(Date.now()-start)+"ms.)");
		};

		var pass = function(msg) {
			report("pass",msg);
			running = false;
			setTimeout(next,0.01);
		};

		var fail = function(msg) {
			report("fail",msg);
			running = false;
			setTimeout(next,0.01);
		};

		running = true;
		try {
			t.test(pass,fail);
		}
		catch (ex) {
			fail(ex.message);
			throw ex;
		}
	}
};

test("Corkscrew.curry",function(pass,fail) {
	var f = function(one,two,three,four,five,six) {
		one = one || 0;
		two = two || 0;
		three = three || 0
		four = four || 0
		five = five || 0
		six = six || 0
		return (Math.floor((one*two+three/four-five*six*six)*100)*.01);
	};

	var c = CS.curry(f,4);
	assert(c(1,2,3)===4.66);

	var c = CS.curry(f,4,5,6);
	assert(c(1,2,3)===8);

	var c = CS.curry(f,4,5,6,7);
	assert(c(1,2,3)===16.85);

	var c = CS.curry(f,undefined,14);
	assert(c(1,2,3)===14.66);

	var c = CS.curry(f,undefined,undefined,4);
	assert(c(1,2,3)===3.33);

	pass();
});

test("Corkscrew.wrap",function(pass,fail) {
	var x = 0;

	var f = function(){
		assert(x===1);
		x = 2;
	};

	var g = CS.wrap(f,function($super){
		assert(x===0);
		x = 1;
		$super();
		assert(x===2);
	});

	g();

	pass();
});

test("Corkscrew.triggerable",function(pass,fail) {
	var x = 0;

	var f = CS.triggerable(function() {
		x = 1;
	});
	f.listen("complete",function(){
		x = 2;
	});
	f();

	setTimeout(function(){
		if (x!==2) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOn",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOn(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==30000000) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnSuccess",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnSuccess(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==30000) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnFailure",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnFailure(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==300) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnAny",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOn(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==30000000) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnAnySuccess",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAnySuccess(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==30000) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnAnyFailure",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAnyFailure(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==300) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnAll",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAll(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==300) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnAllSuccess",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAllSuccess(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==30) fail();
		else pass();
	},0.01);
});

test("Corkscrew.triggerable.triggersOnAllFailure",function(pass,fail) {
	var x = 1;
	var y = 10;

	var a = CS.triggerable(function(){
		x *= 2;
	});
	var b = CS.triggerable(function(){
		x *= 3;
		throw new Error("Intentional Exception.");
	});
	var c = CS.triggerable(function(){
		x *= 5;
	});

	var f = CS.triggerable(function() {
		x *= y;
		y *= 10;
	});

	f.triggersOnAllFailure(a,b,c);

	try { b() } catch (ex) {};
	a();
	c();

	setTimeout(function(){
		if (x!==30) fail();
		else pass();
	},0.01);
});

