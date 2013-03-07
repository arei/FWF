(function(){

	var toArray = function(a){
		return Array.prototype.splice.call(a,a);
	};

	var isFunction = function(f) {
		return (f && typeof f === "function");
	};

	var wrap = function(f,g) {
		if (!f || !isFunction(f)) throw new Error("First argument f must be a function.");
		if (!g || !isFunction(g)) throw new Error("Second argument g must be a function.");

		var h = function() {
			var args = toArray(arguments);
			args.unshift(f);

			return g.apply(this,args);
		};

		h.unwrap = function() {
			return f;
		};

		return h;
	};

	/* 
		FunctionCurry

		Prepopulates arguments to a function.  FunctionCurry is called with a single function and one or more values to prepopulate 
		into that function.  The returned function represents the original function, but with the given values prepopulated.

		Example:

			var f = function(one,two,three) {};
			var c = curry(f,1);

		Any call to c(2,3) is really a call to f(1,2,3)

		Prepopulated arguments can be skipped by using the value 'undefined' when calling curry.  Like this:

			var f = function(one,two,three) {};
			var c = curry(undefined,2);

		Thus a call to c(1,3) is really a call to f(1,2,3) with the value of 2 being inserted where indicated.
	*/
	var curry = function(f,args,args,etc) {
		var args = toArray(arguments);
		args.shift();

		var g = wrap(f,function($super) {
			var a = toArray(arguments);
			a.shift();

			var b = Array.prototype.concat.call(args);
			for (var i=0;i<b.length;i++) {
				if (b[i]===undefined && a.length>0) b[i] = a.shift();
			}
			b = b.concat(a);

			return $super.apply(this,b);
		});

		g.uncurry = function() {
			return f;
		};
		
		return g;
	};

	if (typeof global!=="undefined" && module && module.exports) module.exports = {
		curry: curry,
		wrap: wrap 
	};
	if (typeof window!=="undefined") window.FunctionCurry = curry;
	if (typeof window!=="undefined") window.FunctionWrap = wrap;

})();

