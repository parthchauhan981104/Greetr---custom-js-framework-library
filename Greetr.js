// IIFE - creates a new execution context so will not interfere with the global context
// semi-colon so that if any other script above it has unfinished semicolons, this will still work
;(function(global, $) {

	var Greetr = function(firstName, lastName, language){

		return new Greetr.init(firstName, lastName, language); 
		// return and use a function constructor to generate a object so user no need to use 'new' keyword while using this library(like jQuery)
	}

	// these are never exposed anywhere, can't be accessed from the object.
	// but can use it inside the object because of closure as the object's lexical environment is the whole outer function(IIFE) and it will have
	// reference to the variables inside that function even after IIFE's execution context is over (using scope chain).
	var supportedLanguages = ['en', 'es'];

	// informal greetings
	var greetings = {
		en: 'Hello',
		es: 'Hola'
	}

	//formal greetings
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos'
	}

	// logger messages
	var logMessages = {
		en: 'Logged in',
		es: 'Inicio sesion'
	}

	//We'll put all methods inside this that we want to be available in the object's __proto__
	// prototype saves memory space
	Greetr.prototype = {

		// 'this' refers to the calling object at execution time
		fullname: function() {
			return this.firstName + ' ' + this.lastName;
		},

		validate: function() {
			// check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
			if (supportedLanguages.indexOf(this.language) === -1) {
				throw "Invalid language";
			}
		},

		// retrieve messages from object by referring to properties using [] syntax
		greeting: function() {
			return greetings[this.language] + ' ' + this.firstName + '!';
		},

		formalGreeting: function() {
			return formalGreetings[this.language] + ', ' + this.fullname();
		},

		// chainable methods return their own containing object
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

            // make chainable           
            return this;
        },
                            
        setLang: function(lang) {
            this.language = lang;
                    
            this.validate();
            
            // make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';   
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';   
            }
            
            var msg;
            if (formal) {
                msg = this.formalGreeting();   
            }
            else {
                msg = this.greeting();   
            }
            
            $(selector).html(msg);
            
            // make chainable
            return this;
        }


	}; 

	// the actual object is created here, allowing us to 'new' an object without calling 'new'
	Greetr.init = function(firstName, lastName, language) {
			var self = this;
			self.firstName = firstName || '';
			self.lastName = lastName || '';
			self.language = language || 'en';

			self.validate();
		}

	// object created through function constructor Greetr.init will point to Greetr.init.protoype for their __proto__
	// But we want it to point to Greetr.protoype
	// trick borrowed from jQuery  
    Greetr.init.prototype = Greetr.prototype;

    // making our object available everywhere, also setting up an alias 'G$'
    // on the global object these 2 names will point to the Greetr object
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));