(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var OnCompletion = function(f,callback) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");
		if (!callback || typeof callback !== "function") throw new Error("Second parameter must be a function.");
		var g = function() {
			var r = undefined, e = false;
			try {
				r = f.apply(this,toArray(arguments));
			}
			catch (ex) {
				r = ex;
				e = true;
			}
			callback(e?undefined:r,e?r:undefined,f,toArray(arguments));
			if (e) throw r;
			return r;
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = OnCompletion;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.OnCompletion = OnCompletion;
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