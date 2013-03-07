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

	var arrayClone = function(a) {
		if (!a || !isArray(a)) throw new Error("First parameter a must be an Array.");
		return Array.prototype.concat.call(a);
	};

	var each = function(a,f) {
		if (!a || !isArray(a)) throw new Error("First parameter a must be an Array.");
		if (!f || !isFunction(f)) throw new Error("Second parameter f must be a Function.");
		if (Array.prototype.forEach) return a.forEach(f);
		if (Array.prototype.each) return a.each(f);
		for (var i=0;i<a.length;i++) f.call(this,a[i],i);
		return a;
	};

	var without = function(a,o) {
		if (!a || !isArray(a)) throw new Error("First parameter a must be an Array.");
		if (a.without) return a.without(o);
		var gnu = [];
		for (var i=0;i<a.length;i++) {
			if (a[i]!==o) gnu.push(a[i]);
		}
		return gnu;
	};

	var delay = function(f,ms,args,args,etc) {
		if (!f || !isFunction(f)) throw new Error("First parameter f must be a Function.");
		if (!ms) ms = 0.01;
		var args = toArray(arguments);
		args.shift();
		args.shift();

		var me = this;

		return setTimeout(function(){
			return f.apply(me,args)
		});
	};

	var defer = function(f,args,args,etc) {
		var args = toArray(arguments);
		args.shift();
		args.unshift(0.01);
		args.unshift(f);
		return delay.apply(this,args);
	};

	var wrap = function(f,g) {
		if (!f || !isFunction(f)) throw new Error("First argument f must be a function.");
		if (!g || !isFunction(g)) throw new Error("Second argument g must be a function.");

		var h = function() {
			var args = toArray(arguments);
			args.unshift(f);

			return g.apply(this,args);
		};

		h.unwrap = function() {
			return f;
		};

		return h;
	};

	var curry = function(f,args,args,etc) {
		var args = toArray(arguments);
		args.shift();

		var g = wrap(f,function($super) {
			var a = toArray(arguments);
			a.shift();

			var b = arrayClone(args);
			for (var i=0;i<b.length;i++) {
				if (b[i]===undefined && a.length>0) b[i] = a.shift();
			}
			b = b.concat(a);

			return $super.apply(this,b);
		});

		g.uncurry = function() {
			return f;
		};
		
		return g;
	};

	var again = function(f) {
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

	var all = function(f1,f2,f3,f4,etc) {
		var f = toArray(arguments);
		for (var i=0;i<f.length;i++) {
			if (!f[i] || typeof f[i] !== "function") throw new Error("Parameters may only be functions.");
		}
		var g = function() {
			var a = toArray(arguments);
			var r = [];
			for (var i=0;i<f.length;i++) {
				r[i] = f[i].apply(this,a);
			}
			return r;
		};
		return g;
	};

	var any = function(f1,f2,f3,f4,etc) {
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

	var enforceArgument = function(f,a1,a2,a3,etc) {
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

	var enforceNew = function(f) {
		var g = function(){
			if (typeof global!=="undefined" && this===global) throw new Error("Function is constructor.  Please use new.");
			if (typeof window!=="undefined" && this===window) throw new Error("Function is constructor.  Please use new.");
			var ret = f.apply(this,args);
			if (!ret) return this;
			return ret;
		};

		return g;
	};

	var jumble = function(f1,f2,f3,f4,etc) {
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

	var log = function(f,name) {
		if (!f || typeof f !== "function") throw new Error("First parameter must be a function.");
		if (!name || (typeof name !== "string" && !(name instanceof String))) throw new Error("Second parameter must be a String.")
		var g = function() {
			var r = undefined, e = false;
			try {
				r = f.apply(this,toArray(arguments));
			}
			catch (ex) {
				r = ex;
				e = true;
			}
			if (f.getProfileData) console[e?"error":"log"]("Executed: :"+name,f.getProfileData());
			else console[e?"error":"log"]("Executed: "+name);
			if (e) throw r;
			return r;
		}
		return g;
	};

	var profile = function(f) {
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

	var record = function(f,limit) {
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

	var repeat = function(f,n) {
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

	var triggerable = function(f) {
		if (!isFunction(f)) throw new Error("The first parameters f must be a function.");

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

		g.listen = function(type,listener,listener,etc) {
			if (type!=="success" && type!=="failure" && type!=="complete") throw new Error ("Type (the first argument) must be 'success', 'failure', or 'complete'.");

			var args = toArray(arguments);
			args.shift();

			if (args.length<0) return g;

			each(args,function(l){
				if (!isFunction(l)) return;
				listeners = listeners || {};
				listeners[type] = listeners[type] || [];
				listeners[type].push(l);
			});

			return g;
		};

		g.unlisten = function(type,listener,listener,etc) {
			if (type!=="success" && type!=="failure" && type!=="complete") throw new Error ("Type (the first argument) must be 'success', 'failure', or 'complete'.");
			if (!listeners || !listeners[type]) return;
			var args = toArray(arguments);
			args.shift();
			each(args,function(l){
				if (!isFunction(l)) return;
				listeners[type] = without(listeners[type],l);
			});
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
				each(ls,function(l){
					var a = arrayClone(args);
					a.unshift(l);
					defer.apply(this,a);
				});
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
					each(args,function(f){
						if (!isFunction(f) || !f.listen || !f.unlisten) return;
						f.unlisten(type,h);
					});
				}
				g(ret,error,a);
			};

			each(args,function(f){
				if (!isFunction(f) || !f.listen || !f.unlisten) return;
				f.listen(type,h);
			});

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
				hit = arrayClone(args);
			};
			reset();
			g.triggersReset = reset;

			each(args,function(f){
				if (!isFunction(f) || !f.listen || !f.unlisten) return;

				var h = curry(function(f2,ret,error,a) {
					hit = without(hit,f2);
					if (hit.length===0) {
						if (once) {
							each(args,function(func){
								if (!isFunction(func) || !func.listen || !func.unlisten) return;
								func.unlisten(type,h);
							});
						}
						else {
							reset();
						}
						g(ret,error,a);
					}
				},f);

				f.listen(type,h);
			});

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

	var corkscrew = {
		again: again,
		all: all,
		any: any,
		enforceArgument: enforceArgument,
		enforceNew: enforceNew,
		jumble: jumble,
		log: log,
		profile: profile,
		record: record,
		repeat: repeat,
		curry: curry,
		wrap: wrap,
		triggerable: triggerable
	};

	if (typeof global!=="undefined" && module && module.exports) module.exports = corkscrew;
	if (typeof window!=="undefined") window.Corkscrew = corkscrew;

})();

