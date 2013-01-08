(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var Repeat = function(f,n) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");
		if (!n || isNaN(n) || isNaN(0+n) || n<1) throw new Error("Second parameter must be a positive integer.");
		var a = [];
		var g = function() {
			for (var i=0;i<n;i++) {
				a[i] = f.apply(this,toArray(arguments));
			}
			return a;
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = Repeat;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.Repeat = Repeat;
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