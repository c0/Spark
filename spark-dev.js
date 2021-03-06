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
};SparkFn.html = function(content, append) {
	// Set up any variables
	var element = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Return content of the selected element if there is no content
			if(content === undefined) {
				return element.innerHTML;
			}
			else {
				// Append or replace content depending on the append flag
				(!append) ?
					element.innerHTML = content :
					element.innerHTML += content;
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.text = function(content, append) {
	// Set up any variables
	var element = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Return content of the selected element if there is no content and check for Firefox
			if(content === undefined) {
				if(document.all){
					return element.innerText;
				}
				else {
					return element.textContent;
				}
			}
			else {
				// Append or replace content depending on the append flag and check for Firefox
				if(document.all){
					(!append) ?
						element.innerText = content :
						element.innerText += content;
				}
				else {
					(!append) ?
						element.textContent = content :
						element.textContent += content;
				}
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.fixEvent = function(e) {
	// Grab browser name
	var browser = this.client().browser;
	
	// Fix the page mouse location for IE
	if(browser == 'Explorer') {
		e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	
	// If its IE we need to copy srcElement over to target
	if(e.target === undefined) {
		e.target = e.srcElement;
	}
	
	// Fix the offsetX/Y in Firefox
	var obj = e.target;
	if(obj.offsetParent && browser == 'Firefox') {
		var offsetX = offsetY = 0;
		
		do {
			offsetX += obj.offsetLeft;
			offsetY += obj.offsetTop;
		} while(obj = obj.offsetParent);
	
		e.offsetX = offsetX;
		e.offsetY = offsetY;
	}
	
	// Return the calculated positions
	return e;
};SparkFn.ready = function(callback) {
	// Set up variables
	window.alreadyRunFlag = false;
	
	// Check if we can add an event listener
	if(document.addEventListener) {
		// Add an event listener for for DOMContent loaded
		document.addEventListener("DOMContentLoaded", function() { alreadyRunFlag = true; callback(); }, false);
	}
	else if(document.all && !window.opera) {
		// Create the script element
		Spark('head').element('add', 'script', {
			type: 'text/javascript',
			id: 'contentloadtag',
			defer: 'defer',
			src: 'javascript:void(0)'
		});
		
		// Grab the element
		var contentloadtag = Spark('#contentloadtag').attribute();
		
		// Add a listener for onReadyStateChange
		contentloadtag.onreadystatechange = function() {
			// If it is complete
			if(this.readyState == 'complete') {
				// Set the flag to true
				alreadyRunflag = true;
				
				// Run the callback
				callback();
			}
		};
	}
	
	// Add a listener for onLoad
	window.onload = function() {
		// Set a timeout, this method is just the fallback
		setTimeout(function() {
			// Aslong as the flag is still false
			if(alreadyRunFlag === false) {
				// Run the callback
				callback();
			}
		}, 0);
	};
};SparkFn.event = function(type, callback) {
	// Set up any variables
	var element = null;
	var runCallback = null;
	var previousReference = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
			
			// Set up the callback
			runCallback = function(e) {
				// Run the callback and check if it returned false
				if(callback(Spark.fixEvent(e)) === false) {
					// If so then prevent default
					if(e.preventDefault) {
						e.preventDefault();
					}
					else {
						e.returnValue = false;
					}
				}
			};
			
			// Grab the previous reference
			previousReference = this.data(element, 'Spark.event.' + type);
			
			// Save the callback's reference for unsetting
			this.data(element, 'Spark.event.' + type, runCallback);
			
			// Check if the browser supports addEventListener or attachEvent and use it
			if(element.addEventListener) {
				// Removed the old event
				if(previousReference) {
					element.removeEventListener(type, previousReference, false);
				}
				
				// Assign event
				element.addEventListener(type, runCallback, false);
			}
			else {
				// Removed the old event
				if(previousReference) {
					element.detachEvent(type, previousReference);
				}
				
				// Assign event
				element.attachEvent('on' + type, runCallback);
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.attribute = function(attribute) {
	// Set up any variables
	var element = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Check if they provided an attribute object
			if(attribute !== undefined) {
				// Loop through all attributes assigning them
				for(var a in attribute) {
					element[a] = attribute[a];
				}
			}
			else {
				// Return the elements attributes
				return element;
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.client = function() {
	var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.os = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i = 0; i < data.length; i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if(dataString.indexOf(data[i].subString) != -1) {
						return data[i].identity;
					}
				}
				else if (dataProp) {
					return data[i].identity;
				}
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if(index == -1) return;
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

	};
	
	// Run the initialise function
	BrowserDetect.init();
	
	// Return the data
	return BrowserDetect;
};SparkFn.computed = function() {
	// If we can use getComputedStyle
	if(window.getComputedStyle) {
		// Return getComputedStyle
		return window.getComputedStyle(this.elements[0], null);
	}
	
	// Otherwise return currentStyle
	return this.elements[0].currentStyle;
};SparkFn.cookie = function(name, content, duration) {
	// Return the cookies content if content is undefined
	if(content === undefined) {
		// Set up any variables needed
		var nameEQ = name + '=';
		
		// Split the cookie string
		var ca = document.cookie.split(';');
		
		// Loop through all of the cookies looking for ours
		for(var i in ca) {
			// Make sure it is actually a cookie segment
			if(ca.hasOwnProperty(i)) {
				// Grab the current cookie
				var c = ca[i];

				// Cut of the whitespace
				while(c.charAt(0) == ' ') {
					c = c.substring(1, c.length);
				}
			
				// If the cookie has the right name, return its contents
				if(c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length, c.length);
				}
			}
		}
		
		// If we didnt find it, return false
		return false;
	}
	else {
		// Get the current time
		var date = new Date();
		
		// Push the time on by either a month or the user defined duration
		date.setTime(date.getTime() + ((duration !== undefined) ? duration : 2628000000));
		
		// Set the cookie
		document.cookie = name + '=' + content + '; expires=' + date.toGMTString() + '; path=/';
	}
};
SparkFn.css = function(css) {
	// Set up any variables
	var element = null;
	var browser = Spark.client().browser;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Check if they provided a css object
			if(css !== undefined) {
				// Loop through all css values assigning them
				for(var c in css) {
					// If the selector contains dashes then convert it to the JavaScript version
					if(c.indexOf('-') !== -1) {
						element.style[c.replace(/-([a-z])/gi, function(s, g1) { return g1.toUpperCase() })] = css[c];
					}
					else {
						element.style[c] = css[c];
					}
				
					// If opacity is being set we need to set all the other values for cross browser opacity
					if(c == 'opacity') {
						if(browser == 'Explorer') {
							element.style.filter = 'alpha(opacity=' + (css[c] * 100) + ')';
							element.style.zoom = '1';
						}
						
						element.style.MozOpacity = css[c];
						element.style.KhtmlOpacity = css[c];
					}
				}
			}
			else {
				// Return the elements attributes
				return element.style;
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.data = (function () {
	// Set up the variables
	var storage = {};
	var counter = 1;
	
	// Return the function to manage saving data
	return function (el, key, value) {
		// Get the unique id
		var uid = el.uniqueID || (el.uniqueID = counter++);
		
		// Set up a place to store the data
		storage[uid] || (storage[uid] = {});
		
		// Check if a value has been passed
		if(typeof value != 'undefined') {
			// Set the value
			storage[uid][key] = value;
		}
		else {
			// Return the value
			return storage[uid][key];
		}
	};
})();SparkFn.each = function(callback) {
	// Set up any variables
	var element = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Run the specified function and pass the element to it
			callback(element);
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.json = function(method, data) {
	// Decode or encode depending on the method string
	if(method == 'encode') {
		return JSON.stringify(data);
	}
	else if(method == 'decode') {
		return JSON.parse(data);
	}
};SparkFn.noConflict = function() {
	// Grab the original Spark object
	var SparkOr = Spark;
	
	// Reload $
	window.$ = SparkBk;
	
	// Return the original Spark object
	return SparkOr;
};SparkFn.jsonp = function(file, callback, parameters) {
	// Add the callback
	file += '?callback=' + callback;
	
	// If we have parameters add them
	if(parameters !== undefined) {
		file += '&' + parameters;
	}
	
	// Load the file
	this.load(file);
};SparkFn.load = function(file) {
	// Create the script tag with the specified file as its src
	Spark('head').element('insert', 'script', {
		type: 'text/javascript',
		src: file
	});
};SparkFn.stop = function() {
	// Set up any variables
	var element = null;
	var animations = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Make sure it is set
			if(this.data(element, 'Spark.animations') === undefined) {
				this.data(element, 'Spark.animations', '');
			}
		
			// Get the animations
			animations = this.data(element, 'Spark.animations').split(',');
		
			// Loop through them all, canceling them all
			for(var a in animations) {
				clearTimeout(animations[a]);
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.transition = function(method, timeframe, easing, callback) {
	// Set up any variables
	var element = null;
	var original = null;
	
	// Check if we have a callback, if not set it to and empty function
	if(callback === undefined) {
		callback = new Function();
	}
	
	// Check if the timeframe is set, if not default it to 800ms
	if(timeframe === undefined) {
		timeframe = 600;
	}
	
	// Check if the easing is set, if not default it to false
	if(easing === undefined) {
		var easing = false;
	}
	
	// Initiate the offset as 0 if there is none
	if(!this.offset) {
		this.offset = 0;
	}
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
			
			// Work out what method we need to do
			if(method == 'slidedown') {
				// Set overflow to hidden
				Spark(element).css({overflow: 'hidden', display: 'block'});
				
				// Get original height
				original = Spark(element).attribute().offsetHeight;
				
				// Set height to 0
				Spark(element).css({height: 0});
				
				// Slide height to original
				Spark(element).animate({height: original}, timeframe, easing, callback);
			}
			else if(method == 'slideup') {	
				// Get original height
				original = Spark(element).attribute().offsetHeight;
				
				// Set overflow to hidden
				Spark(element).css({overflow: 'hidden', height: original});
				
				// Slide height to 0
				Spark(element).animate({height: 0}, timeframe, easing, function() {
					// Set height to original
					Spark(element).css({height: original + 'px', display: 'none'});
					
					// Run the callback
					callback();
				});
			}
			else if(method == 'fadein') {
				// Display it
				Spark(element).css({display: 'block', opacity: 0});
				
				// Fade opacity to 100
				Spark(element).animate({opacity: 1}, timeframe, easing, callback);
			}
			else if(method == 'fadeout') {
				// Fade opacity to 0
				Spark(element).animate({opacity: 0}, timeframe, easing, function() {
					// Set opacity to 100
					Spark(element).css({opacity: 1, display: 'none'});
					
					// Run the callback
					callback();
				});
			}
			else if(method == 'sneakin') {
				// Set overflow to hidden
				Spark(element).css({overflow: 'hidden', display: 'block', opacity: 0});
				
				// Get original height
				original = Spark(element).attribute().offsetHeight;
				
				// Set height to 0
				Spark(element).css({height: 0});
				
				// Slide height to original
				Spark(element).animate({height: original, opacity: 1}, timeframe, easing, callback);
			}
			else if(method == 'sneakout') {
				// Get original height
				original = Spark(element).attribute().offsetHeight;
				
				// Set overflow to hidden
				Spark(element).css({overflow: 'hidden', height: original});
				
				// Slide height to 0
				Spark(element).animate({height: 0, opacity: 0}, timeframe, easing, function() {
					// Set height to original
					Spark(element).css({height: original + 'px', display: 'none'});
					
					// Run the callback
					callback();
				});
			}
		}
	}
	
	// Set up the offset for chaining
	this.offset += timeframe;
	
	// Return the Spark object
	return this;
};SparkFn.animate = function(properties, timeframe, easing, callback) {
	var easingMethods = {
		inQuad: function (t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		outQuad: function (t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		inOutQuad: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		inCubic: function (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		outCubic: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		inOutCubic: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		inQuart: function (t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		outQuart: function (t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		inOutQuart: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		inQuint: function (t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		outQuint: function (t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		inOutQuint: function (t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		inSine: function (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		outSine: function (t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		inOutSine: function (t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		inExpo: function (t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		outExpo: function (t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		inOutExpo: function (t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		inCirc: function (t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		outCirc: function (t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		inOutCirc: function (t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		inElastic: function (t, b, c, d, a, p) {
			if (t==0) { return b; } 
			if ((t/=d)==1) { return b+c; }
			if (!p) { p=d*.3; }
			if (a < Math.abs(c)) {  a=c; s=p/4; }
			else { a=Math.abs(c); s: p/(2*Math.PI) * Math.asin(c/a);}
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		outElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else {   a=Math.abs(c); var s= p/(2*Math.PI) * Math.asin (c/a);}
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		inOutElastic: function (t, b, c, d, a, p) {
			if (t==0) return b;  
			if ((t/=d/2)==2) return b+c;  
			if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else {a=Math.abs(c);var s= p/(2*Math.PI) * Math.asin (c/a);}
			if (t < 1) {return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;}
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		inBack: function (t, b, c, d, s) {
			if (s== undefined) s: 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		outBack: function (t, b, c, d, s) {
			if (s== undefined) s: 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		inOutBack: function (t, b, c, d, s) {
			if (s== undefined) s: 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		inBounce: function (t, b, c, d) {
			return c - this.outBounce (d-t, 0, c, d) + b;
		},
		outBounce: function (t, b, c, d) {
			if ((t/=d) < (1/2.75)) { return c*(7.5625*t*t) + b;} 
			else if (t < (2/2.75)) { return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;} 
			else if (t < (2.5/2.75)) { return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;}
			else { return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b; }
		},
		inOutBounce: function (t, b, c, d) {
			if (t < d/2) return this.inBounce (t*2, 0, c, d) * .5 + b;
			return this.outBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	};
	
	// Set a default timeframe
	if(!timeframe) {
		var timeframe = 600;
	}
	
	// Set a default easing
	if(!easing) {
		var easing = 'outQuad';
	}
	
	// Initiate the offset as 0 if there is none
	if(!this.offset) {
		this.offset = 0;
	}
	
	// Set up the FPS
	var fps = 60;
	
	// Set up any required variables
	var computed = null;
	var original = null;
	var difference = null;
	var frames = null;
	var change = null;
	var unit = null;
	var calculated = null;
	var toSet = null;
	var element = null;
	
	// Loop through all the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
			
			// Loop through all of the properties
			for(var p in properties) {
				// Make sure the style is set
				if(element.style[p] === undefined || element.style[p] === '') {
					computed = Spark(element).computed()[p];
					element.style[p] = (computed) ? computed : 1;
				}
				
				// Fix for IE stuff
				if(element.style[p] == 'auto' && p == 'height') element.style[p] = element.offsetHeight;
				else if(element.style[p] == 'auto' && p == 'width') element.style[p] = element.offsetWidth;
				
				// Get the original
				original = (p == 'opacity') ? parseFloat(element.style[p]) : parseInt(element.style[p]);
				
				// Work out the difference
				difference = ((p == 'opacity') ? parseFloat(properties[p]) : parseInt(properties[p])) - original;
				
				// Work out how many frames
				frames = timeframe / (1000 / fps);
				
				// Work out the unit of measurement
				unit = (isNaN(properties[p])) ? properties[p].replace(/[0-9]/g, '') : 'px';
				
				// Make sure we do not have a unit when setting opacity
				if(p == 'opacity') {
					unit = '';
				}
				
				// Set up the timeout reference storage
				this.data(element, 'Spark.animations', 'START');
				
				// Set up the toSet variable
				toSet = new Object();
				
				// Loop through each frame
				for(var i = 0; i <= frames; i++) {
					// Work out the calculated value
					calculated = easingMethods[easing](i, original, difference, frames) + unit;
					
					this.data(element, 'Spark.animations', this.data(element, 'Spark.animations') + ',' + setTimeout((function(exti, extelement, extp, extcalculated) {
						return function() {
							toSet[extp] = extcalculated;
							Spark(extelement).css(toSet);
						}
					})(i, element, p, calculated), i * (1000 / fps) + this.offset, element, p, calculated));
				}
				
				// Stop the floating point problem
				this.data(element, 'Spark.animations', this.data(element, 'Spark.animations') + ',' + setTimeout((function(extelement, extp, extproperties, extunit) {
					return function() {
						toSet[extp] = properties[extp];
						Spark(extelement).css(toSet);
					}
				})(element, p, properties, unit), timeframe + this.offset, element, p, properties, unit));
				
				
				// Finish the saving of the data
				this.data(element, 'Spark.animations', this.data(element, 'Spark.animations').replace('START,', ''));
			}
		}
	}
	
	// Set callback timer
	if(callback) {
		setTimeout(callback, timeframe);
	}
	
	// Set up the offset for chaining
	this.offset += timeframe;
	
	// Return the Spark object
	return this;
};SparkFn.ajax = function(method, file, data, callback) {
	// Set up the request, allow for cross browser.
	var xmlhttp = (typeof XMLHttpRequest == 'undefined') ? 
		new ActiveXObject('Microsoft.XMLHTTP') :
		new XMLHttpRequest;
	
	// Convert to upper case.
	method = method.toUpperCase();
	
	// If the method is get then append the data to the file string
	if(method == 'GET' && data) {
		file += '?' + data;
	}
	
	// Run the call back if it was a success and the callback is set
	if(callback) {
		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState == 4) {
				if(xmlhttp.status == 200) {
					callback(xmlhttp.responseText);
				}
				else {
					// There was an error so pass false to the callback
					callback(false);
				}
			}
		};
	}
	
	// Open the reader, if callback set then make it async
	xmlhttp.open(method, file, (callback) ? true : false);
	
	// If the method is post then send the headers and the data
	if(method == 'POST') {
		// Set the headers
		xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		
		// Only send the data if it is set
		xmlhttp.send((data) ? data : null);
	}
	// Otherwise just send the data
	else {
		xmlhttp.send(null);
	}
	
	// If there is no callback
	if(!callback) {
		if(xmlhttp.status == 200) {
			// Just return the content because it was a syncronous request
			return xmlhttp.responseText;
		}
		else {
			// There was an error so return false
			return false;
		}
	}
};SparkFn.classes = function(method, name) {
	// Set up any variables
	var element = null;
	
	// Loop through all of the elements
	for(var e in this.elements) {
		// Make sure that it is an element
		if(this.elements.hasOwnProperty(e)) {
			// Grab the current element
			element = this.elements[e];
		
			// Check what method we need to execute
			if(method == 'has') {
				// Return true if the element has the class and vice versa
				return new RegExp('\\b' + name + '\\b').test(element.className)
			}
			else if(method == 'add') {
				// Check if it does not already has that class
				if(!this.classes('has', name)) {
					// Append the class name with or without a space
					element.className += (element.className) ? ' ' + name : name;
				}
			}
			else if(method == 'remove') {
				// Work out if we need to remove the class with or without a space in front of it
				var search = (element.className.match(' ' + name)) ? ' ' + name : name;
				
				// Replace the correct search string
				element.className = element.className.replace(search, '');
			}
		}
	}
	
	// Return the Spark object
	return this;
};SparkFn.element = function(method, tag, attributes, styles) {
	// Check if we need to remove the element
	if(method == 'remove') {
		// Loop through all elements
		for(var e in this.elements) {
			// Make sure that it is an element
			if(this.elements.hasOwnProperty(e)) {
				// Remove the element
				this.elements[e].parentNode.removeChild(this.elements[e]);
			}
		}
	}
	else {
		// Create the new element
		var construct = document.createElement(tag);
		
		// Make sure attributes is set
		if(attributes) {
			// Add attributes
			Spark(construct).attribute(attributes);
		}
		
		// Make sure styles is set
		if(styles) {
			// Add styles
			Spark(construct).css(styles);
		}
		
		// Loop through all elements
		for(var e in this.elements) {
			// Make sure that it is an element
			if(this.elements.hasOwnProperty(e)) {
				// Perform the right action
				if(method == 'prepend') {
					// Prepend the element
					this.elements[e].parentNode.insertBefore(construct.cloneNode(true), this.elements[e]);
				}
				else if(method == 'append') {
					// Append the element
					this.elements[e].parentNode.insertBefore(construct.cloneNode(true), this.elements[e].nextSibling);
				}
				else if(method == 'insert') {
					// Insert the element
					this.elements[e].appendChild(construct.cloneNode(true));
				}
			}
		}
	}
	
	// Return the Spark object to allow chaining
	return this;
};SparkFn.trigger = function(type) {
	// Set up any variables
	var element = null;
	var trigger = null;
	
	// Loop through all elements
	for(var e in this.elements) {
		// Make sure that it is a property
		if(this.elements.hasOwnProperty(e)) {
			// Grab the element
			element = this.elements[e];
			
			// Check for createEventObject
			if(document.createEventObject){
				// Trigger for Internet Explorer
				trigger = document.createEventObject();
				element.fireEvent('on' + type, trigger);
			}
			else {
				// Trigger for the good browsers
				trigger = document.createEvent('HTMLEvents');
				trigger.initEvent(type, true, true);
				element.dispatchEvent(trigger);
			}
		}
	}
	
	// Return the Spark object to allow chaining
	return this;
};(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set;

	if ( !expr ) {
		return [];
	}

	for ( var i = 0, l = Expr.order.length; i < l; i++ ) {
		var match,
			type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			var left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace(/\\/g, "");
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( var type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				var found, item,
					filter = Expr.filter[ type ],
					left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( var i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							var pass = not ^ !!found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw "Syntax error, unrecognized expression: " + msg;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !/\W/.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !/\W/.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test(part) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !/\W/.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace(/\\/g, "") + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace(/\\/g, "");
		},

		TAG: function( match, curLoop ) {
			return match[1].toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace(/\\/g, "");
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace(/\\/g, "");

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			elem.parentNode.selectedIndex;
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			return "text" === elem.type;
		},
		radio: function( elem ) {
			return "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return "checkbox" === elem.type;
		},

		file: function( elem ) {
			return "file" === elem.type;
		},
		password: function( elem ) {
			return "password" === elem.type;
		},

		submit: function( elem ) {
			return "submit" === elem.type;
		},

		image: function( elem ) {
			return "image" === elem.type;
		},

		reset: function( elem ) {
			return "reset" === elem.type;
		},

		button: function( elem ) {
			return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || Sizzle.getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					var first = match[2],
						last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					var doneName = match[0],
						parent = elem.parentNode;
	
					if ( parent && (parent.sizcache !== doneName || !elem.nodeIndex) ) {
						var count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// If the nodes are siblings (or identical) we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Utility function for retreiving the text value of an array of DOM nodes
Sizzle.getText = function( elems ) {
	var ret = "", elem;

	for ( var i = 0; elems[i]; i++ ) {
		elem = elems[i];

		// Get the text from text nodes and CDATA nodes
		if ( elem.nodeType === 3 || elem.nodeType === 4 ) {
			ret += elem.nodeValue;

		// Traverse everything else, except comment nodes
		} else if ( elem.nodeType !== 8 ) {
			ret += Sizzle.getText( elem.childNodes );
		}
	}

	return ret;
};

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector,
		pseudoWorks = false;

	try {
		// This should fail with an exception
		// Gecko does not error, returns false instead
		matches.call( document.documentElement, "[test!='']:sizzle" );
	
	} catch( pseudoError ) {
		pseudoWorks = true;
	}

	if ( matches ) {
		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						return matches.call( node, expr );
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem.sizcache === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = Sizzle;

})();
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear()     + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate())      + 'T' +
                f(this.getUTCHours())     + ':' +
                f(this.getUTCMinutes())   + ':' +
                f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());SparkIn();