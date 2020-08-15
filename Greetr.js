// IIFE - creates a new execution context so will not interfere with the global context
(function(global, $) {

	var Greetr = function(firstName, lastName, language){

		return new Greetr.init(firstName, lastName, language); 
		// return and use a function constructor to generate a object so user no need to use 'new' keyword while using this library(like jQuery)
	}

	//Empty at start. We'll put all methods inside this that we want to be available in the object's __proto__
	Greetr.prototype = {}; 

	Greetr.init(firstName, lastName, language){
			var self = this;
			self.firstName = firstName || '';
			self.lastName = lastName || '';
			self.language = language || 'en';
		}

	// object created through function constructor Greetr.init will point to Greetr.init.protoype for their __proto__
	// But we want it to point to Greetr.protoype    
    Greetr.init.prototype = Greetr.prototype;

    // making our object available everywhere, also setting up an alias 'G$'
    // on the global object these 2 names will point to the Greetr object
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));