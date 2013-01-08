(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var Jumble = function(f1,f2,f3,f4,etc) {
		var f = toArray(arguments);
		for (var i=0;i<f.length;i++) {
			if (!f[i] || typeof f[i] !== "function") throw new Error("Parameters may only be functions.");
		}
		var g = function() {
			var t = ((Math.random()*100)|0)+100;
			for (var i=0;i<t;i++) {
				var p1 = (Math.random()*f.length)|0;
				var p2 = (Math.random()*f.length)|0;
				if (p1!==p2) {
					var x = f[p1];
					f[p1] = f[p2];
					f[p2] = x;
				}
			}
			var r = [];
			var a = toArray(arguments);
			for (var i=0;i<f.length;i++) {
				r[i] = f[i].apply(this,a);
			}
			return r;
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = Jumble;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.Jumble = Jumble;
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