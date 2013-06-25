/**********************************/
/* Patterns.js Javascript Library */
/* Version: 0.0.1                 */
/*                                */
/* Copyright 2013 Travis Wimer    */
/* http://traviswimer.com         */
/*                                */
/* Released under the MIT license */
/**********************************/

(function(){

// main function for the library
function pattern(){

	// Factory pattern
	//////////////////////////////////////////////////////////////////////////////////////////////////

	function factory(defaultClass){

		// returns a factory for building the specified object
		function build(extendingClass){

			// If extendingClass is invalid/null, just instantiate the defaultClass
			extendingClass = typeof extendingClass === "function" ? extendingClass : function(){};

			// returns a new instance of the extendingClass
			function create(){
				extendingClass.prototype = new defaultClass();
				return new extendingClass();
			}

			// return "build" public methods
			return {
				create: create
			};
		}

		// return "factory" public methods
		return {
			build: build
		};
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////




	// return "pattern" public methods
	return {
		factory: factory
	};

}

// attach the pattern methods to a global object
window.pattern = pattern();

}());