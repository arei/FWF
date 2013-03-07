(function(){
	var toArray = function(a){
		return Array.prototype.splice.call(a,a);
	};

	var isArray = Array.isArray || function(a) {
		if (!a) return false;
		return (Object.prototype.toString.call(a)==="[object Array]");
	};

	var isFunction = function(f) {
		return (f && typeof f === "function");
	};

	var without = function(a,o) {
		if (!a || !isArray(a)) return a;
		var gnu = [];
		for (var i=0;i<a.length;i++) {
			if (a[i]!==o) gnu.push(a[i]);
		}
		return gnu;
	};

	var defer = function(f,ths,args) {
		setTimeout(function(){
			f.apply(ths,args);
		},0.01);
	};

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
		return g;
	}

	var triggerable = function(f) {
		if (!isFunction(f)) throw new Error("The first paramters f must be a function.");

		var listeners = null;

		var g = function() {
			var args = toArray(arguments);
			var ret = undefined;
			var error = undefined;

			try {
				ret = f.apply(this,args);
			}
			catch (ex) {
				error = ex;
			}

			if (error===undefined) firelisteners("success",ret,error,args);
			else firelisteners("failure",ret,error,args);
			firelisteners("complete",ret,error,args);

			if (error!==undefined) throw error;
			return ret;
		};

		g.triggersAddListener = function(type,listener,listener,etc) {
			if (type!=="success" && type!=="failure" && type!=="complete") throw new Error ("Type (the first argument) must be 'success', 'failure', or 'complete'.");

			var args = toArray(arguments);
			args.shift();

			if (args.length<0) return g;

			for (var i=0;i<args.length;i++) {
				var l = args[i];
				if (!isFunction(l)) return;
				listeners = listeners || {};
				listeners[type] = listeners[type] || [];
				listeners[type].push(l);
			}

			return g;
		};

		g.triggersRemoveListener = function(type,listener,listener,etc) {
			if (type!=="success" && type!=="failure" && type!=="complete") throw new Error ("Type (the first argument) must be 'success', 'failure', or 'complete'.");
			if (!listeners || !listeners[type]) return;
			var args = toArray(arguments);
			args.shift();
			for (var i=i;i<args.length;i++) {
				var l = args[i];
				if (!isFunction(l)) return;
				listeners[type] = without(listeners[type],l);
			}
			return g;
		};

		var getlisteners = function(type) {
			if (!listeners || !listeners[type]) return [];
			return listeners[type];
		};

		var firelisteners = function(type,args,args,etc) {
			var args = toArray(arguments);
			args.shift();
			var ls = getlisteners(type);
			if (ls && ls.length>0) {
				for (var i=0;i<ls.length;i++) {
					defer(ls[i],this,args);
				}
			}
		}

		var trigger = function(type,once,f,f,etc) {
			if (type!=="success" && type!=="failure" && type!=="complete") throw new Error ("Type (the first argument) must be 'success', 'failure', or 'complete'.");

			var args = toArray(arguments);
			args.shift();
			args.shift();
			if (args.length<1) throw new Error("You must supply at least one argument to Triggerable triggers.");

			var h = function(ret,error,a) {
				if (once) {
					for (var i=0;i<args.length;i++) {
						var f = args[i];
						if (!isFunction(f) || !f.triggersAddListener || !f.triggersRemoveListener) continue;
						f.triggersRemoveListener(type,h);
					}
				}
				g(ret,error,a);
			};

			for (var i=0;i<args.length;i++) {
				var f = args[i];
				if (!isFunction(f) || !f.triggersAddListener || !f.triggersRemoveListener) continue;
				f.triggersAddListener(type,h);
			}
			return g;
		}

		var triggerall = function(type,once,f,f,etc) {
			if (type!=="success" && type!=="failure" && type!=="complete") throw new Error ("Type (the first argument) must be 'success', 'failure', or 'complete'.");

			var args = toArray(arguments);
			args.shift();
			args.shift();
			if (args.length<1) throw new Error("You must supply at least one argument to Triggerable triggers.");

			var hit;
			var reset = function() {
				hit = Array.prototype.concat.call(args);
			};
			reset();
			g.triggersReset = reset;

			for (var i=0;i<args.length;i++) {
				var f = args[i];
				if (!isFunction(f) || !f.triggersAddListener || !f.triggersRemoveListener) continue;

				var h = curry(function(f2,ret,error,a) {
					hit = without(hit,f2);
					if (hit.length===0) {
						if (once) {
							for (var i=0;i<args.length;i++) {
								var func = args[i];
								if (!isFunction(func) || !func.triggersAddListener || !func.triggersRemoveListener) continue;
								func.triggersRemoveListener(type,h);
							}
						}
						else {
							reset();
						}
						g(ret,error,a);
					}
				},f);

				f.triggersAddListener(type,h);
			}
			return g;
		}

		g.triggersOn = curry(trigger,"complete",false);
		g.triggersOnSuccess = curry(trigger,"success",false);
		g.triggersOnFailure = curry(trigger,"failure",false);
		g.triggersOnAny = curry(trigger,"complete",false);
		g.triggersOnAnySuccess = curry(trigger,"success",false);
		g.triggersOnAnyFailure = curry(trigger,"failure",false);
		g.triggersOnAll = curry(triggerall,"complete",false);
		g.triggersOnAllSuccess = curry(triggerall,"success",false);
		g.triggersOnAllFailure = curry(triggerall,"failure",false);

		g.triggersOnceOn = curry(trigger,"complete",true);
		g.triggersOnceOnSuccess = curry(trigger,"success",true);
		g.triggersOnceOnFailure = curry(trigger,"failure",true);
		g.triggersOnceOnAny = curry(trigger,"complete",true);
		g.triggersOnceOnAnySuccess = curry(trigger,"success",true);
		g.triggersOnceOnAnyFailure = curry(trigger,"failure",true);
		g.triggersOnceOnAll = curry(triggerall,"complete",true);
		g.triggersOnceOnAllSuccess = curry(triggerall,"success",true);
		g.triggersOnceOnAllFailure = curry(triggerall,"failure",true);

		return g;
	};	

	if (typeof global!=="undefined" && module && module.exports) module.exports = triggerable;
	if (typeof window!=="undefined") window.FunctionTrigger = triggerable;

})();

