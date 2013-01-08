(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var Profile = function(f) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");
		var p = {
			totalCount: 0,
			exceptionCount: 0,
			totalTime: 0,
			averageTime: 0,
			lastTime: 0
		};
		var g = function() {
			p.totalCount += 1;
			var start = Date.now() || new Date().getTime();
			var r = undefined, e = false;
			try {
				r = f.apply(this,toArray(arguments));
			}
			catch (ex) {
				r = ex;
				e = true;
			}
			var end = Date.now() || new Date().getTime();
			p.lastTime = end-start;
			p.totalTime += p.lastTime;
			p.exceptionCount += e;
			p.averageTime = p.totalTime / p.totalCount;
			if (e) throw r;
			return r;
		};
		g.getProfileData = function() {
			return p;
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = Profile;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.Profile = Profile;
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