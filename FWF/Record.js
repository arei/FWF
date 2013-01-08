(function() {
	var toArray = function(a) {
		return Array.prototype.splice.call(a,a);
	};

	var Record = function(f,limit) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");
		if (limit && (isNaN(limit) || isNaN(0+limit))) throw new Error("Second parameter must be a positive integer.");
		var h = [];
		var g = function() {
			var a = toArray(arguments);
			var r = undefined, e = false;
			try {
				r = f.apply(this,a);
			}
			catch (ex) {
				r = ex;
				e = true;
			}
			var d = {
				this: this,
				completed: !e,
				arguments: a,
				returned: e ? undefined : r,
				exception: e ? r : undefined
			};
			if (f.getProfileData) d.profiled = f.getProfileData();
			if (!d.profiled && g.getProfileData) d.profiled = g.getProfileData();
			h.push(d);
			if (limit && limit>0 && h.length>limit) h.shift();
			if (e) throw r;
			else return r;
		};
		g.getHistory = function() {
			return h;
		};
		g.getResults = function() {
			var r = [];
			for (var i=0;i<h.length;i++) {
				r[i] = h[i].completed ? h[i].returned : undefined;
			}
			return r;
		};
		g.getExceptions = function() {
			var r = [];
			for (var i=0;i<h.length;i++) {
				r[i] = h[i].completed ? undefined : h[i].exception;
			}
			return r;
		};
		g.rerun = function(i) { // where i is the position you want to rerun
			if (!i) i = h.length-1;
			if (isNaN(i) || isNaN(0+i) || i<0 || i>=h.length) throw new Error("Parameter must be with range of 0 < i < "+h.length);
			var d = h[i];
			return g.apply(d.this,d.arguments);
		};
		g.redo = function(last) {
			var s = [];
			for (var i=0;i<last;i++) {
				s.unshift(h[h.length-1-i]);
			}	
			for (var i=0;i<s.length;i++) {
				s[i] = g.apply(s[i].this,s[i].arguments);
			}
			return s;
		};
		return g;
	};

	if (typeof module!=="undefined" && typeof module.exports!=="undefined") {
		module.exports = Record;
	}
	else if (typeof window!=="undefined") {
		window.FWF = window.FWF || {};
		window.FWF.Record = Record;
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
