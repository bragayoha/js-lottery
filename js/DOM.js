((win, doc) => {
	function DOM(node) {
		if (!(this instanceof DOM)) return new DOM(node)
		this.element = document.querySelectorAll(node)
	}

	DOM.prototype.on = function (event, callback) {
		Array.prototype.forEach.call(this.element, (element) => element.addEventListener(event, callback))
	}

	DOM.prototype.off = function (event, callback) {
		Array.prototype.forEach.call(this.element, (element) => element.removeEventListener(event, callback))
	}

	DOM.prototype.get = function (index) {
		if (!index) {
			return this.element[0]
		}
		return this.element[index]
	}

	DOM.prototype.forEach = function (callback) {
		Array.prototype.forEach.call(this.element, callback)
	}

	DOM.prototype.map = function (callback) {
		return Array.prototype.map.call(this.element, callback)
	}

	DOM.prototype.filter = function (callback) {
		return Array.prototype.filter.call(this.element, callback)
	}

	DOM.prototype.reduce = function (callback) {
		return Array.prototype.reduce.call(this.element, callback)
	}

	DOM.prototype.reduce = function (callback) {
		return Array.prototype.reduceRight.call(this.element, callback)
	}

	DOM.prototype.every = function (callback) {
		return Array.prototype.every.call(this.element, callback)
	}

	DOM.prototype.some = function (callback) {
		return Array.prototype.some.call(this.element, callback)
	}

	DOM.isArray = function (element) {
		return Array.isArray(element)
	}

	DOM.isObject = function (element) {
		return typeof element === 'object'
	}

	DOM.isFunction = function (element) {
		return typeof element === 'function'
	}

	DOM.isNumber = function (element) {
		return typeof element === 'number'
	}

	DOM.isString = function (element) {
		return typeof element === 'string'
	}

	DOM.isBoolean = function (element) {
		return typeof element === 'boolean'
	}

	DOM.isNull = function (element) {
		return element === null || element === undefined
	}

	win.DOM = DOM
})(window, document)