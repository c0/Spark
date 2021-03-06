/*!
 * Spark JavaScript library v2.3.5
 * http://sparkjs.co.uk/
 * 
 * Copyright 2011, Oliver Caldwell
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://github.com/Wolfy87/Spark
 * 
 * Includes sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Includes json2.js
 * http://www.json.org/json2.js
 */

// Create the function holder
window.SparkFn = new Object();

// Create the initialise function
window.SparkIn = function() {
	// Create the Spark object
	window.$ = window.Spark = function(selector, context) {
		// Create the result object
		var result = new Object();
		
		// Check if a selector has been passed
		if(selector !== undefined) {
			// If so check if Sizzle needs to be run
			if(typeof selector == 'string') {
				// Run sizzle with or without a context
				result = (context) ? Sizzle(selector, context) : Sizzle(selector);
			}
			else {
				// If it is an element
				if(typeof HTMLElement === 'object' ?
					selector instanceof HTMLElement :
			    	typeof selector === 'object' && selector.nodeType === 1 && typeof selector.nodeName == 'string') {
					// Place it within the result object
					result = {0: selector};
				}
				else {
					// It is an object, copy it into result
					result = selector;
				}
			}
		}
		
		// Create the built object
		var built = new Object();
		
		// Add the functions to the built object
		for(var f in SparkFn) {
			built[f] = SparkFn[f];
		}
		
		// Add the results to the built object
		built.elements = result;
		
		// Return the built object
		return built;
	};
	
	// Check if SparkBk does not exist yet
	if(window.SparkBk === undefined) {
		// Back up Spark and $ for use in noConflict mode
		window.SparkBk = window.$;
	}
	
	// Take out the need for brackets
	for(var i in Spark()) {
		$[i] = Spark[i] = Spark()[i];
	}
};