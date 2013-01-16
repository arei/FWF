(function(){ 
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var ArgRequired = function(f,a1,a2,a3,etc) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");

		var r = toArray(arguments);
		r.shift();

		for (var i=0;i<r.length;i++) {
			if (r[i]!==true && r[i]!==false) throw new Error("Parameters may only be true or false.");
		}

		var g = function() {
			var a = toArray(arguments);
			for (var i=0;i<r.length;i++) {
				if (r[i]===true && (a.length<i || a[i]===undefined)) throw new Error("Argument "+i+" is required.");
			}
			return f.apply(this,a);
		}
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = ArgRequired;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.ArgRequired = ArgRequired;
		if (!window.FWF.InstallOnFunctionPrototype) {
			var methodize = function(f) {
				return function() {
					var a = toArray(arguments);
					a.unshift(this);
					return f.apply(this,a);
				};
			};

			var install = function() {
				for (k in FunWithFunctions) {
					if (k==="InstallOnFunctionPrototype") return;
					Function.prototype[k] = methodize(FunWithFunctions[k]);
				};
				FunWithFunctions.InstallOnFunctionPrototype = function() {};
				return FunWithFunctions;
			};
			window.FWF.InstallOnFunctionPrototype = install;
		}
	}
})(); 
