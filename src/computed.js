SparkFn.computed = function() {
	if(window.getComputedStyle !== undefined) return window.getComputedStyle(this.elements[0], null);
	return this.elements[0].currentStyle;
};