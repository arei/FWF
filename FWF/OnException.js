(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var OnException = function(f,callback) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");
		if (!callback || typeof callback !== "function") throw new Error("Second parameter must be a function.");
		var g = function() {
			try {
				return f.apply(this,toArray(arguments));
			}
			catch (ex) {
				callback(ex,f,toArray(arguments));
				throw ex;
			}
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = OnException;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.OnException = OnException;
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