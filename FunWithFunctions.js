
var FunWithFunctions = {
	OnException: 		require("./FWF/OnException.js"),
	OnCompletion: 		require("./FWF/OnCompletion.js"),
	OnReturn: 			require("./FWF/OnReturn.js"),
	Profile: 			require("./FWF/Profile.js"),
	Log: 				require("./FWF/Log.js"),
	Repeat: 			require("./FWF/Repeat.js"),
	All: 				require("./FWF/All.js"),
	Any: 				require("./FWF/Any.js"),
	Jumble: 			require("./FWF/Jumble.js"),
	Record: 			require("./FWF/Record.js"),
	Again: 				require("./FWF/Again.js"),
	ArgRequired: 		require("./FWF/ArgRequired.js")
};

var toArray = function(a){
	return Array.prototype.splice.call(a,a);
};

var methodize = function(f) {
	return function() {
		var a = toArray(arguments);
		a.unshift(this);
		return f.apply(this,a);
	};
};

var install = function() {
	Object.keys(FunWithFunctions).forEach(function(k){
		if (k==="InstallOnFunctionPrototype") return;
		Function.prototype[k] = methodize(FunWithFunctions[k]);
	});
	FunWithFunctions.InstallOnFunctionPrototype = function() {};
	return FunWithFunctions;
};
FunWithFunctions.InstallOnFunctionPrototype = install;

module.exports = FunWithFunctions;
