(function(){

	var toArray = function(a){
		return Array.prototype.splice.call(a,a);
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

		var g = function() {
			var a = toArray(arguments);
			var b = Array.prototype.concat.call(args);
			for (var i=0;i<b.length;i++) {
				if (b[i]===undefined && a.length>0) b[i] = a.shift();
			}
			b = b.concat(a);
			return f.apply(this,b);
		};

		g.uncurry = function() {
			return f;
		};
		
		return g;
	}

	if (typeof global!=="undefined" && module && module.exports) module.exports = curry;
	if (typeof window!=="undefined") window.FunctionCurry = curry;

})();

