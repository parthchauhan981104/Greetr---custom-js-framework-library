// IIFE - creates a new execution context so will not interfere with the global context
(function(global, $) {

	var Greetr = function(firstName, lastName, language){

		return new Greetr.init(firstName, lastName, language); 
		// return and use a function constructor to generate a object so user no need to use 'new' keyword while using this library(like jQuery)
	}

	// these are never exposed anywhere, can't be accessed from the object.
	// but can use it inside the object because of closure as the object's lexical environment is the whole outer function and it will have
	// reference to the variables inside that function even after its execution context is over.
	var supportedLanguages = ['en', 'es'];

	var greetings = {
		en: 'Hello',
		es: 'Hola'
	}

	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	}

	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	}

	//We'll put all methods inside this that we want to be available in the object's __proto__
	Greetr.prototype = {

		fullname: function() {
			return this.firstName + ' ' + this.lastName;
		},

		validate: function() {
			if (supportedLanguages.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},

		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + '!';
		},

		formalGreeting: function() {
			return formalGreetings[this.language] + ', ' + this.fullname();
		},

		greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullname()); 
            }
                            
            return this;
        },
                            
        setLang: function(lang) {
            this.language = lang;
                    
            this.validate();
            
            return this;
        }


	}; 

	Greetr.init = function(firstName, lastName, language) {
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