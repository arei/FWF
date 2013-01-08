(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var Any = function(f1,f2,f3,f4,etc) {
		var f = toArray(arguments);
		for (var i=0;i<f.length;i++) {
			if (!f[i] || typeof f[i] !== "function") throw new Error("Parameters may only be functions.");
		}
		var g = function() {
			var i = (Math.random()*f.length)|0;
			return f[i].apply(this,toArray(arguments));
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = Any;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.Any = Any;
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