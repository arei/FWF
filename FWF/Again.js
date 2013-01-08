(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var Again = function(f) {
		var l = null;
		var g = function() {
			last = toArray(arguments);
			f.apply(this,last);
		};
		g.again = function() {
			return g.apply(this,last);
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = Again;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.Again = Again;
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