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
function patterns(){

	// Factory pattern
	//////////////////////////////////////////////////////////////////////////////////////////////////

	function factory(defaultClass){

		// If defaultClass is invalid/null, use empty class
		defaultClass = typeof defaultClass === "function" ? defaultClass : function(){};

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


	// Composite pattern
	//////////////////////////////////////////////////////////////////////////////////////////////////

	function composite(leafClass){

		// If leafClass is invalid/null, throw error
		if(typeof leafClass !== "function"){
			throw new Error("leafClass must be a function");
		}

		// Is used to retrieve pulbic methods/properties
		var leafObject = new leafClass();


		// class for creating composite objects
		function compositeClass(){

			// Array of composite and leaf objects
			var children = [];

			// Add public methods from leafObject to allow the call to 
			// travel down the hierarchy
			for(var method in leafObject){
				this[method] = function(){
					for(var i=0; i<children.length; i++){
						children[i][method].apply(children[i], arguments);
					}
				};
			}

			this.addComposite = function(){
				var newCompositeObject = new compositeClass();
				children.push(newCompositeObject);
				return newCompositeObject;
			};

			this.addLeaf = function(){

				// Workaround to allow arbitrary arguments to be provided
				function F(args) {
					return leafClass.apply(this, args);
				}
				F.prototype = leafClass.prototype;


				var newLeafObject = new F(arguments);
				children.push(newLeafObject);
				return newLeafObject;
			};

		}

		// return the initial composite object
		return new compositeClass();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////



	// return "pattern" public methods
	return {
		factory: factory,
		composite: composite
	};

}

// attach the pattern methods to a global object
window.patterns = patterns();

}());