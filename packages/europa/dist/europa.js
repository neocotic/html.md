(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Europa = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Contains utility methods that are useful throughout the library.
 *
 * @public
 */

var Utilities = function () {
  function Utilities() {
    classCallCheck(this, Utilities);
  }

  createClass(Utilities, null, [{
    key: 'forOwn',


    /**
     * Iterates over own (not inherited) enumerable properties on the specified <code>object</code>.
     *
     * Nothing happens if <code>object</code> is <code>null</code>.
     *
     * @param {?Object} object - the object whose own properties are to be iterated over
     * @param {Utilities~ForOwnCallback} callback - the function to be called with the value and key for each own property
     * on <code>object</code>
     * @param {Object} [context] - the value to use <code>this</code> when executing <code>callback</code>
     * @return {void}
     * @public
     */
    value: function forOwn(object, callback, context) {
      if (!object) {
        return;
      }

      for (var key in object) {
        if (Utilities.hasOwn(object, key)) {
          callback.call(context, object[key], key, object);
        }
      }
    }

    /**
     * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
     * (not inherited) property.
     *
     * @param {Object} object - the object on which the property is to be checked
     * @param {string} name - the name of the property to be checked
     * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
     * @public
     */

  }, {
    key: 'hasOwn',
    value: function hasOwn(object, name) {
      return Object.prototype.hasOwnProperty.call(object, name);
    }

    /**
     * Left pads the <code>string</code> provided with the given padding string for the specified number of
     * <code>times</code>.
     *
     * @param {string} [string=""] - the string to be padded
     * @param {number} [times=0] - the number of times to pad <code>string</code>
     * @param {string} [padding=" "] - the padding string
     * @return {string} The padded <code>string</code>.
     * @public
     */

  }, {
    key: 'leftPad',
    value: function leftPad(string, times, padding) {
      if (string == null) {
        string = '';
      }
      if (times == null) {
        times = 0;
      }
      if (padding == null) {
        padding = ' ';
      }
      if (!padding) {
        return string;
      }

      for (var i = 0; i < times; i++) {
        string = padding + string;
      }

      return string;
    }
  }]);
  return Utilities;
}();

var Utilities_1 = Utilities;

var replacements = {
  '\\\\': '\\\\',
  '\\[': '\\[',
  '\\]': '\\]',
  '>': '\\>',
  '_': '\\_',
  '\\*': '\\*',
  '`': '\\`',
  '#': '\\#',
  '([0-9])\\.(\\s|$)': '$1\\.$2',
  '\xA9': '(c)',
  '\xAE': '(r)',
  '\u2122': '(tm)',
  '\xA0': ' ',
  '\xB7': '\\*',
  '\u2002': ' ',
  '\u2003': ' ',
  '\u2009': ' ',
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201C': '"',
  '\u201D': '"',
  '\u2026': '...',
  '\u2013': '--',
  '\u2014': '---'
};
var replacementsRegExp = {};

Utilities_1.forOwn(replacements, function (value, key) {
  replacementsRegExp[key] = new RegExp(key, 'g');
});

/**
 * Contains contextual information for a single conversion process.
 *
 * @param {Europa} europa - the {@link Europa} instance responsible for this conversion
 * @param {Europa~Options} options - the options to be used
 * @public
 */

var Conversion = function () {
  function Conversion(europa, options) {
    classCallCheck(this, Conversion);

    /**
     * The {@link Europa} instance responsible for this {@link Conversion}.
     *
     * @public
     * @type {Europa}
     */
    this.europa = europa;

    /**
     * The options for this {@link Conversion}.
     *
     * @public
     * @type {Europa~Options}
     */
    this.options = options;

    /**
     * Whether the buffer is at the start of the current line.
     *
     * @public
     * @type {boolean}
     */
    this.atLeft = true;

    /**
     * Whether any white space should be removed from the start of the next output.
     *
     * @public
     * @type {boolean}
     */
    this.atNoWhiteSpace = true;

    /**
     * Whether the buffer is at the start of a paragraph.
     *
     * @public
     * @type {boolean}
     */
    this.atParagraph = true;

    /**
     * The conversion output buffer to which the Markdown will be written.
     *
     * @public
     * @type {string}
     */
    this.buffer = '';

    /**
     * The context for this {@link Conversion}.
     *
     * @public
     * @type {Object.<string, *>}
     */
    this.context = {};

    /**
     * Whether the buffer is currently within a code block.
     *
     * @public
     * @type {boolean}
     */
    this.inCodeBlock = false;

    /**
     * Whether the buffer is currently within an ordered list.
     *
     * @public
     * @type {boolean}
     */
    this.inOrderedList = false;

    /**
     * Whether the buffer is currently within a preformatted block.
     *
     * @public
     * @type {boolean}
     */
    this.inPreformattedBlock = false;

    /**
     * The last string to be output next to the buffer.
     *
     * @public
     * @type {string}
     */
    this.last = null;

    /**
     * The start of the current line.
     *
     * @public
     * @type {string}
     */
    this.left = '\n';

    /**
     * The depth of nested lists.
     *
     * @public
     * @type {number}
     */
    this.listDepth = 0;

    /**
     * The one-based index for the current list item within the current list.
     *
     * @public
     * @type {number}
     */
    this.listIndex = 1;

    this._document = europa.document;
    this._element = null;
    this._tagName = null;
    this._window = europa.window;
  }

  /**
   * Appends the last output string to the buffer and then queues the specified <code>string</code> to be output.
   *
   * @param {string} string - the string to be appended
   * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
   * @public
   */


  createClass(Conversion, [{
    key: 'append',
    value: function append(string) {
      if (this.last != null) {
        this.buffer += this.last;
      }

      this.last = string;

      return this;
    }

    /**
     * Appends a paragraph to the output buffer.
     *
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     */

  }, {
    key: 'appendParagraph',
    value: function appendParagraph() {
      if (this.atParagraph) {
        return this;
      }

      if (!this.atLeft) {
        this.append(this.left);

        this.atLeft = true;
      }

      this.append(this.left);

      this.atNoWhiteSpace = true;
      this.atParagraph = true;

      return this;
    }

    /**
     * Outputs the specified <code>string</code> to the buffer.
     *
     * Optionally, <code>string</code> can be "cleaned" before being output. Doing so will replace any certain special
     * characters as well as some white space.
     *
     * @param {string} string - the string to be output
     * @param {boolean} [clean=false] - <code>true</code> to clean <code>string</code>; otherwise <code>false</code>
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     */

  }, {
    key: 'output',
    value: function output(string, clean) {
      if (!string) {
        return this;
      }

      string = string.replace(/\r\n/g, '\n');

      if (clean) {
        string = string.replace(/\n([ \t]*\n)+/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/[ \t]+/g, ' ');

        Utilities_1.forOwn(replacements, function (value, key) {
          string = string.replace(replacementsRegExp[key], value);
        });
      }

      if (!this.inPreformattedBlock) {
        if (this.atNoWhiteSpace) {
          string = string.replace(/^[ \t\n]+/, '');
        } else if (/^[ \t]*\n/.test(string)) {
          string = string.replace(/^[ \t\n]+/, '\n');
        } else {
          string = string.replace(/^[ \t]+/, ' ');
        }
      }

      if (!string) {
        return this;
      }

      this.atLeft = /\n$/.test(string);
      this.atNoWhiteSpace = /[ \t\n]$/.test(string);
      this.atParagraph = /\n{2}$/.test(string);

      return this.append(string.replace(/\n/g, this.left));
    }

    /**
     * Replaces the start of the current line with the <code>string</code> provided.
     *
     * @param {string} string - the string to replace the start of the current line
     * @return {Conversion} A reference to this {@link Conversion} for chaining purposes.
     * @public
     */

  }, {
    key: 'replaceLeft',
    value: function replaceLeft(string) {
      if (!this.atLeft) {
        this.append(this.left.replace(/[ ]{2,4}$/, string));

        this.atLeft = true;
        this.atNoWhiteSpace = true;
        this.atParagraph = true;
      } else if (this.last) {
        this.last = this.last.replace(/[ ]{2,4}$/, string);
      }

      return this;
    }

    /**
     * Returns the current document for this {@link Conversion}.
     *
     * This may not be the same document as is associated with the {@link Europa} instance as this document may be
     * nested (e.g. a frame).
     *
     * @return {?Document} The current document.
     * @public
     */

  }, {
    key: 'document',
    get: function get$$1() {
      return this._document;
    }

    /**
     * Returns the current element for this {@link Conversion}.
     *
     * @return {?Element} The current element.
     * @public
     */

  }, {
    key: 'element',
    get: function get$$1() {
      return this._element;
    }

    /**
     * Sets the current element for this {@link Conversion} to <code>element</code>.
     *
     * @param {?Element} element - the current element to be set
     * @return {void}
     * @public
     */
    ,
    set: function set$$1(element) {
      this._element = element;
      this._tagName = element && element.tagName ? element.tagName.toLowerCase() : null;
    }

    /**
     * Returns the name of the tag for the current element for this {@link Conversion}.
     *
     * The tag name will always be in lower case, when available.
     *
     * @return {?string} The current element's tag name.
     * @public
     */

  }, {
    key: 'tagName',
    get: function get$$1() {
      return this._tagName;
    }

    /**
     * Returns the current window for this {@link Conversion}.
     *
     * This may not be the same window as is associated with the {@link Europa} instance as this window may be nested
     * (e.g. a frame).
     *
     * @return {?Window} The current window.
     * @public
     */

  }, {
    key: 'window',
    get: function get$$1() {
      return this._window;
    }

    /**
     * Sets the current window for this {@link Conversion} to <code>window</code>.
     *
     * This may not be the same window as is associated with the {@link Europa} instance as this window may be nested
     * (e.g. a frame).
     *
     * @param {?Window} window - the window to be set
     * @return {void}
     * @public
     */
    ,
    set: function set$$1(window) {
      this._window = window;
      this._document = window ? window.document : null;
    }
  }]);
  return Conversion;
}();

var Conversion_1 = Conversion;

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Contains utility methods that are useful when dealing with the DOM.
 *
 * @public
 */

var DOMUtilities = function () {
  function DOMUtilities() {
    classCallCheck(this, DOMUtilities);
  }

  createClass(DOMUtilities, null, [{
    key: 'isVisible',


    /**
     * Checks whether the specified <code>element</code> is currently visible using the <code>window</code> provided.
     *
     * This is not a very sophisticated check and could easily be mistaken, but it should catch a lot of the most simple
     * cases.
     *
     * @param {Element} element - the element whose visibility is to be checked
     * @param {Window} window - the window to be used
     * @return {boolean} <code>true</code> if <code>element</code> is visible; otherwise <code>false</code>.
     * @public
     */
    value: function isVisible(element, window) {
      var style = window.getComputedStyle(element);

      return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
    }
  }]);
  return DOMUtilities;
}();

var DOMUtilities_1 = DOMUtilities;

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Defines an available option.
 *
 * If <code>defaultValue</code> is a function, it will be called if/when needed and the return value will be used as the
 * default value. If the default value is to be a function itself, then <code>defaultValue</code> must return that
 * function.
 *
 * @param {string} name - the name to be used
 * @param {*} [defaultValue] - the default value to be used
 * @public
 */

var Option = function () {
  function Option(name, defaultValue) {
    classCallCheck(this, Option);

    /**
     * The name for this {@link Option}.
     *
     * @public
     * @type {string}
     */
    this.name = name;

    this._defaultValue = defaultValue;
  }

  /**
   * Returns the default value for this {@link Option}.
   *
   * @return {*} The default value.
   * @public
   */


  createClass(Option, [{
    key: 'defaultValue',
    get: function get$$1() {
      var defaultValue = this._defaultValue;

      return typeof defaultValue === 'function' ? defaultValue.call(this) : defaultValue;
    }
  }]);
  return Option;
}();

var Option_1 = Option;

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Manages multiple {@link Option} instances that are intended to be used by multiple implementations/instances.
 *
 * @param {Option[]} options - the options to be used
 * @public
 */

var OptionParser = function () {
  function OptionParser(options) {
    classCallCheck(this, OptionParser);

    /**
     * The available options for this {@link OptionParser}.
     *
     * @public
     * @type {Option[]}
     */
    this.options = options;
  }

  /**
   * Returns whether an option with the specified <code>name</code> is available.
   *
   * @param {string} name - the name of the {@link Option} whose existence is to be checked
   * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
   * <code>false</code>.
   * @public
   */


  createClass(OptionParser, [{
    key: 'exists',
    value: function exists(name) {
      return this.options.some(function (option) {
        return option.name === name;
      });
    }

    /**
     * Parses the specified <code>options</code>, extracting only properties that match valid options and applying default
     * values where required.
     *
     * @param {Object} [options] - the options to be parsed
     * @return {Object.<string, *>} The parsed options.
     * @public
     */

  }, {
    key: 'parse',
    value: function parse(options) {
      if (!options) {
        options = {};
      }

      var result = {};

      this.options.forEach(function (option) {
        var name = option.name;

        var value = options[name] != null ? options[name] : option.defaultValue;

        result[name] = value;
      });

      return result;
    }
  }]);
  return OptionParser;
}();

var OptionParser_1 = OptionParser;

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * A plugin that can tap into multiple parts in the conversion process while being specific to only a sub-set of tags.
 *
 * @public
 */

var Plugin = function () {
  function Plugin() {
    classCallCheck(this, Plugin);
  }

  createClass(Plugin, [{
    key: 'after',


    /**
     * Called after {@link Plugin#convert} <b>and</b> only once all children elements have been converted as well,
     * provided they weren't skipped, and intended for tidying up after the conversion.
     *
     * <code>context</code> can be used to receive any state for a single element conversion from {@link Plugin#before}
     * and {@link Plugin#convert}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @param {Object.<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     */
    value: function after(conversion, context) {}

    /**
     * Called before any elements are converted and intended to setup this {@link Plugin} initially.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @return {void}
     * @public
     */

  }, {
    key: 'afterAll',
    value: function afterAll(conversion) {}

    /**
     * Called immediately before {@link Plugin#convert} and intended for preparing this {@link Plugin} for conversion.
     *
     * <code>context</code> can be used to pass any state for a single element conversion to {@link Plugin#convert} and
     * then to {@link Plugin#after}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @param {Object.<string, *>} context - the current context for this {@link Plugin}
     * @return {void}
     * @public
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {}

    /**
     * Called after all elements have been converted and intended to completing any steps for this {@link Plugin}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @return {void}
     * @public
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(conversion) {}

    /**
     * Converts the current element within the specified <code>conversion</code> which can be used to provide control over
     * the conversion and returns whether the children of the element should be converted.
     *
     * <code>context</code> can be used to pass any state for a single element conversion from {@link Plugin#before} to
     * {@link Plugin#after}.
     *
     * @param {Conversion} conversion - the current {@link Conversion}
     * @param {Object.<string, *>} context - the current context for this {@link Plugin}
     * @return {boolean} <code>true</code> if the children of the current element should be converted; otherwise
     * <code>false</code>.
     * @public
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      return true;
    }

    /**
     * Returns the names of tags with which this {@link Plugin} should be registered to handle.
     *
     * @return {string[]} The names of supported tags.
     * @public
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return [];
    }
  }]);
  return Plugin;
}();

var Plugin_1 = Plugin;

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * A basic manager for {@link Service} implementations that are mapped to simple names.
 *
 * @public
 */

var ServiceManager = function () {
  function ServiceManager() {
    classCallCheck(this, ServiceManager);

    this._services = {};
  }

  /**
   * Returns the {@link Service} being managed with the specified <code>name</code>.
   *
   * @param {string} name - the name of the {@link Service} to be returned
   * @return {Service} The {@link Service} is being managed with <code>name</code>.
   * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
   * @public
   */


  createClass(ServiceManager, [{
    key: 'getService',
    value: function getService(name) {
      var service = this._services[name];
      if (!service) {
        throw new Error('Service is not being managed with name: ' + name);
      }

      return service;
    }

    /**
     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
     * <code>service</code> provided.
     *
     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
     * @param {Service} service - the {@link Service} implementation to be managed
     * @return {void}
     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
     * @public
     */

  }, {
    key: 'setService',
    value: function setService(name, service) {
      if (this._services[name]) {
        throw new Error('Service is already managed with name: ' + name);
      }

      if (service) {
        this._services[name] = service;
      }
    }
  }]);
  return ServiceManager;
}();

var ServiceManager_1 = ServiceManager;

var plugins = {};
var serviceManager = new ServiceManager_1();

/**
 * Enables configuration of a HTML to Markdown converter that supports HTML strings and DOM elements.
 *
 * @param {Europa~Options} [options] - the options to be used
 * @public
 */

var Europa = function () {
  createClass(Europa, null, [{
    key: 'register',


    /**
     * Registers the specified <code>plugin</code> to be used by all {@link Europa} instances.
     *
     * If <code>plugin</code> declares support for a tag name which already has a {@link Plugin} registered for it,
     * <code>plugin</code> will replace the previously registered plugin, but only for conflicting tag names.
     *
     * @param {Plugin} plugin - the {@link Plugin} to be registered
     * @return {void}
     * @public
     */
    value: function register(plugin) {
      plugin.getTagNames().forEach(function (tag) {
        plugins[tag] = plugin;
      });
    }

    /**
     * Configures the <code>service</code> provided to be used by all {@link Europa} instances.
     *
     * @param {Service} service - the {@link Service} to be configured
     * @return {void}
     * @throws {Error} If a {@link Service} has already been configured with the same name.
     * @public
     */

  }, {
    key: 'use',
    value: function use(service) {
      serviceManager.setService(service.getName(), service);
    }
  }, {
    key: 'Plugin',


    /**
     * A convient reference to {@link Plugin} exposed on {@link Europa} for cases where Europa Core is bundled.
     *
     * @return {Function} The {@link Plugin} constructor.
     * @public
     */
    get: function get$$1() {
      return Plugin_1;
    }
  }]);

  function Europa(options) {
    classCallCheck(this, Europa);

    this._options = new OptionParser_1([new Option_1('absolute', false), new Option_1('baseUri', function () {
      return serviceManager.getService('window').getDefaultBaseUri();
    }), new Option_1('inline', false)]).parse(options);
    this._window = null;
  }

  /**
   * Converts the specified <code>html</code> into Markdown based on the options configured for this {@link Europa}
   * instance.
   *
   * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be converted into
   * Markdown.
   *
   * @param {?Element|?string} html - the HTML (or element whose inner HTML is) to be converted into Markdown
   * @return {string} The Markdown converted from <code>html</code>.
   * @public
   */


  createClass(Europa, [{
    key: 'convert',
    value: function convert(html) {
      if (!html) {
        return '';
      }

      var document = this.document;

      var root = void 0;

      if (typeof html === 'string') {
        root = document.createElement('div');
        root.innerHTML = html;
      } else {
        root = html;
      }

      var conversion = new Conversion_1(this, this._options);
      var wrapper = void 0;

      if (!document.contains(root)) {
        wrapper = document.createElement('div');
        wrapper.style.display = 'none';
        wrapper.appendChild(root);

        document.body.appendChild(wrapper);
      }

      try {
        Utilities_1.forOwn(plugins, function (plugin) {
          return plugin.beforeAll(conversion);
        });

        this.convertElement(root, conversion);

        Utilities_1.forOwn(plugins, function (plugin) {
          return plugin.afterAll(conversion);
        });
      } finally {
        if (wrapper) {
          document.body.removeChild(wrapper);

          wrapper.removeChild(root);
        }
      }

      return conversion.append('').buffer.trim();
    }

    /**
     * Converts the specified <code>element</code> and it's children into Markdown using the <code>conversion</code>
     * provided.
     *
     * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
     *
     * @param {?Element} element - the element (along well as it's children) to be converted into Markdown
     * @param {Conversion} conversion - the current {@link Conversion}
     * @return {void}
     * @public
     */

  }, {
    key: 'convertElement',
    value: function convertElement(element, conversion) {
      if (!element) {
        return;
      }

      var window = this.window;


      if (element.nodeType === window.Node.ELEMENT_NODE) {
        if (!DOMUtilities_1.isVisible(element, window)) {
          return;
        }

        conversion.element = element;

        var context = {};
        var plugin = plugins[conversion.tagName];
        var convertChildren = true;

        if (plugin) {
          plugin.before(conversion, context);
          convertChildren = plugin.convert(conversion, context);
        }

        if (convertChildren) {
          for (var i = 0; i < element.childNodes.length; i++) {
            this.convertElement(element.childNodes[i], conversion);
          }
        }

        if (plugin) {
          plugin.after(conversion, context);
        }
      } else if (element.nodeType === window.Node.TEXT_NODE) {
        var value = element.nodeValue || '';

        if (conversion.inPreformattedBlock) {
          conversion.output(value);
        } else if (conversion.inCodeBlock) {
          conversion.output(value.replace(/`/g, '\\`'));
        } else {
          conversion.output(value, true);
        }
      }
    }

    /**
     * Releases the window used by this {@link Europa} instance.
     *
     * This allows closeable {@link WindowService} implementations to close the window and free up resources. However,
     * this instance can and will simply retrieve another window from the {@link WindowService} the next time it is
     * required (i.e. {@link Europa#convert} is called).
     *
     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
     * @public
     */

  }, {
    key: 'release',
    value: function release() {
      if (this._window) {
        serviceManager.getService('window').closeWindow(this._window);

        this._window = null;
      }

      return this;
    }

    /**
     * Returns the document to be used for HTML to Markdown conversion by this {@link Europa} instance.
     *
     * @return {Document} The document.
     * @public
     */

  }, {
    key: 'document',
    get: function get$$1() {
      return this.window.document;
    }

    /**
     * Returns the window to be used for HTML to Markdown conversion by this {@link Europa} instance.
     *
     * @return {Window} The window.
     * @public
     */

  }, {
    key: 'window',
    get: function get$$1() {
      if (!this._window) {
        this._window = serviceManager.getService('window').getWindow(this._options.baseUri);
      }

      return this._window;
    }
  }]);
  return Europa;
}();

var Europa_1 = Europa;

/**
 * A {@link Plugin} which extracts the URL from an anchor. Anchors without an <code>href</code> are treated as plain
 * text.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the anchor will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>href</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL (and any <code>title</code> on the anchor) will be
 * inserted immediately after the anchor contents (e.g. <code>[foo](/bar)</code>). Otherwise, all unique URL and title
 * combinations will be indexed (e.g. <code>[foo][anchor0]</code>) and the references will be output at the very end.
 *
 * @public
 */

var AnchorPlugin = function (_Plugin) {
  inherits(AnchorPlugin, _Plugin);

  function AnchorPlugin() {
    classCallCheck(this, AnchorPlugin);
    return possibleConstructorReturn(this, (AnchorPlugin.__proto__ || Object.getPrototypeOf(AnchorPlugin)).apply(this, arguments));
  }

  createClass(AnchorPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      if (context.value != null) {
        conversion.output(']' + context.value);
      }
    }

    /**
     * @override
     */

  }, {
    key: 'afterAll',
    value: function afterAll(conversion) {
      var anchors = conversion.context.anchors;

      if (!anchors.length) {
        return;
      }

      conversion.append('\n\n');

      for (var i = 0; i < anchors.length; i++) {
        conversion.append('[anchor' + i + ']: ' + anchors[i] + '\n');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(conversion) {
      conversion.context.anchorMap = {};
      conversion.context.anchors = [];
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      var element = conversion.element,
          options = conversion.options;

      var href = options.absolute ? element.href : element.getAttribute('href');
      if (!href) {
        return true;
      }

      var _conversion$context = conversion.context,
          anchorMap = _conversion$context.anchorMap,
          anchors = _conversion$context.anchors;

      var title = element.getAttribute('title');
      var value = title ? href + ' "' + title + '"' : href;
      var index = void 0;

      if (options.inline) {
        context.value = '(' + value + ')';
      } else {
        index = anchorMap[value];
        if (index == null) {
          index = anchors.push(value) - 1;

          anchorMap[value] = index;
        }

        context.value = '[anchor' + index + ']';
      }

      conversion.output('[');

      conversion.atNoWhiteSpace = true;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['a'];
    }
  }]);
  return AnchorPlugin;
}(Plugin_1);

Europa_1.register(new AnchorPlugin());

/**
 * A {@link Plugin} which outputs the contents in a block quote.
 *
 * @public
 */

var BlockQuotePlugin = function (_Plugin) {
  inherits(BlockQuotePlugin, _Plugin);

  function BlockQuotePlugin() {
    classCallCheck(this, BlockQuotePlugin);
    return possibleConstructorReturn(this, (BlockQuotePlugin.__proto__ || Object.getPrototypeOf(BlockQuotePlugin)).apply(this, arguments));
  }

  createClass(BlockQuotePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.atLeft = false;
      conversion.atParagraph = false;
      conversion.left = context.previousLeft;

      conversion.appendParagraph();
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {
      context.previousLeft = conversion.left;
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      var value = '> ';

      conversion.left += value;

      if (conversion.atParagraph) {
        conversion.append(value);
      } else {
        conversion.appendParagraph();
      }

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['blockquote', 'dd'];
    }
  }]);
  return BlockQuotePlugin;
}(Plugin_1);

Europa_1.register(new BlockQuotePlugin());

/**
 * A {@link Plugin} which outputs an inline line break.
 *
 * @public
 */

var BreakPlugin = function (_Plugin) {
  inherits(BreakPlugin, _Plugin);

  function BreakPlugin() {
    classCallCheck(this, BreakPlugin);
    return possibleConstructorReturn(this, (BreakPlugin.__proto__ || Object.getPrototypeOf(BreakPlugin)).apply(this, arguments));
  }

  createClass(BreakPlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      conversion.append('  ' + conversion.left);

      conversion.atLeft = true;
      conversion.atNoWhiteSpace = true;

      return false;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['br'];
    }
  }]);
  return BreakPlugin;
}(Plugin_1);

Europa_1.register(new BreakPlugin());

/**
 * A {@link Plugin} which outputs the contents in a code block.
 *
 * @public
 */

var CodePlugin = function (_Plugin) {
  inherits(CodePlugin, _Plugin);

  function CodePlugin() {
    classCallCheck(this, CodePlugin);
    return possibleConstructorReturn(this, (CodePlugin.__proto__ || Object.getPrototypeOf(CodePlugin)).apply(this, arguments));
  }

  createClass(CodePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      if (!context.skipped) {
        conversion.inCodeBlock = context.previousInCodeBlock;

        conversion.output('`');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {
      context.previousInCodeBlock = conversion.inCodeBlock;
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      if (conversion.inPreformattedBlock) {
        context.skipped = true;
      } else {
        conversion.output('`');

        conversion.inCodeBlock = true;
      }

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['code', 'kbd', 'samp'];
    }
  }]);
  return CodePlugin;
}(Plugin_1);

Europa_1.register(new CodePlugin());

/**
 * A {@link Plugin} which outputs a definition term as strong text.
 *
 * @public
 */

var DefinitionTermPlugin = function (_Plugin) {
  inherits(DefinitionTermPlugin, _Plugin);

  function DefinitionTermPlugin() {
    classCallCheck(this, DefinitionTermPlugin);
    return possibleConstructorReturn(this, (DefinitionTermPlugin.__proto__ || Object.getPrototypeOf(DefinitionTermPlugin)).apply(this, arguments));
  }

  createClass(DefinitionTermPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.output('**');
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      conversion.appendParagraph();

      conversion.output('**');

      conversion.atNoWhiteSpace = true;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['dt'];
    }
  }]);
  return DefinitionTermPlugin;
}(Plugin_1);

Europa_1.register(new DefinitionTermPlugin());

/**
 * A {@link Plugin} which outputs a details section.
 *
 * If the details has an <code>open</code> attribute then all of its children are converted. Otherwise, only the nested
 * <code>summary</code>, if any, will be converted.
 *
 * @public
 */

var DetailsPlugin = function (_Plugin) {
  inherits(DetailsPlugin, _Plugin);

  function DetailsPlugin() {
    classCallCheck(this, DetailsPlugin);
    return possibleConstructorReturn(this, (DetailsPlugin.__proto__ || Object.getPrototypeOf(DetailsPlugin)).apply(this, arguments));
  }

  createClass(DetailsPlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      var element = conversion.element;


      conversion.appendParagraph();

      if (element.hasAttribute('open')) {
        return true;
      }

      var summary = element.querySelector('summary');
      conversion.europa.convertElement(summary, conversion);

      return false;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['details'];
    }
  }]);
  return DetailsPlugin;
}(Plugin_1);

Europa_1.register(new DetailsPlugin());

/**
 * A {@link Plugin} which outputs as emphasised text.
 *
 * @public
 */

var EmphasisPlugin = function (_Plugin) {
  inherits(EmphasisPlugin, _Plugin);

  function EmphasisPlugin() {
    classCallCheck(this, EmphasisPlugin);
    return possibleConstructorReturn(this, (EmphasisPlugin.__proto__ || Object.getPrototypeOf(EmphasisPlugin)).apply(this, arguments));
  }

  createClass(EmphasisPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.output('_');
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      conversion.output('_');

      conversion.atNoWhiteSpace = true;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['cite', 'dfn', 'em', 'i', 'u', 'var'];
    }
  }]);
  return EmphasisPlugin;
}(Plugin_1);

Europa_1.register(new EmphasisPlugin());

/**
 * A {@link Plugin} which simply ensures that no children elements are converted.
 *
 * @public
 */

var EmptyPlugin = function (_Plugin) {
  inherits(EmptyPlugin, _Plugin);

  function EmptyPlugin() {
    classCallCheck(this, EmptyPlugin);
    return possibleConstructorReturn(this, (EmptyPlugin.__proto__ || Object.getPrototypeOf(EmptyPlugin)).apply(this, arguments));
  }

  createClass(EmptyPlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      return false;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['applet', 'area', 'audio', 'button', 'canvas', 'datalist', 'embed', 'head', 'input', 'map', 'menu', 'meter', 'noframes', 'noscript', 'object', 'optgroup', 'option', 'param', 'progress', 'rp', 'rt', 'ruby', 'script', 'select', 'style', 'textarea', 'title', 'video'];
    }
  }]);
  return EmptyPlugin;
}(Plugin_1);

Europa_1.register(new EmptyPlugin());

/**
 * A {@link Plugin} which outputs the contents of nested frame.
 *
 * @public
 */

var FramePlugin = function (_Plugin) {
  inherits(FramePlugin, _Plugin);

  function FramePlugin() {
    classCallCheck(this, FramePlugin);
    return possibleConstructorReturn(this, (FramePlugin.__proto__ || Object.getPrototypeOf(FramePlugin)).apply(this, arguments));
  }

  createClass(FramePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.window = context.previousWindow;
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {
      context.previousWindow = conversion.window;
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      var window = conversion.element.contentWindow;

      if (window) {
        conversion.window = window;

        conversion.europa.convertElement(window.document.body, conversion);
      }

      return false;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['frame', 'iframe'];
    }
  }]);
  return FramePlugin;
}(Plugin_1);

Europa_1.register(new FramePlugin());

/**
 * A {@link Plugin} which outputs a heading of various levels.
 *
 * @public
 */

var HeadingPlugin = function (_Plugin) {
  inherits(HeadingPlugin, _Plugin);

  function HeadingPlugin() {
    classCallCheck(this, HeadingPlugin);
    return possibleConstructorReturn(this, (HeadingPlugin.__proto__ || Object.getPrototypeOf(HeadingPlugin)).apply(this, arguments));
  }

  createClass(HeadingPlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      var level = parseInt(conversion.tagName.match(/([1-6])$/)[1], 10);

      conversion.appendParagraph();

      var heading = '';
      for (var i = 0; i < level; i++) {
        heading += '#';
      }

      conversion.output(heading + ' ');

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    }
  }]);
  return HeadingPlugin;
}(Plugin_1);

Europa_1.register(new HeadingPlugin());

/**
 * A {@link Plugin} which outputs a horizontal rule.
 *
 * @public
 */

var HorizontalRulePlugin = function (_Plugin) {
  inherits(HorizontalRulePlugin, _Plugin);

  function HorizontalRulePlugin() {
    classCallCheck(this, HorizontalRulePlugin);
    return possibleConstructorReturn(this, (HorizontalRulePlugin.__proto__ || Object.getPrototypeOf(HorizontalRulePlugin)).apply(this, arguments));
  }

  createClass(HorizontalRulePlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      conversion.appendParagraph().output('---').appendParagraph();

      return false;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['hr'];
    }
  }]);
  return HorizontalRulePlugin;
}(Plugin_1);

Europa_1.register(new HorizontalRulePlugin());

/**
 * A {@link Plugin} which extracts the URL from an image.
 *
 * If the <code>absolute</code> option is enabled, then the URL extracted from the image will be absolute. Otherwise,
 * the URL will be exactly as it is in the <code>src</code> attribute.
 *
 * If the <code>inline</code> option is enabled, then the URL will be inserted immediately after the <code>alt</code> on
 * the image (e.g. <code>![foo](/bar.png)</code>). Otherwise, all unique URLs will be indexed
 * (e.g. <code>![foo][image0]</code>) and the references will be output at the very end.
 *
 * @public
 */

var ImagePlugin = function (_Plugin) {
  inherits(ImagePlugin, _Plugin);

  function ImagePlugin() {
    classCallCheck(this, ImagePlugin);
    return possibleConstructorReturn(this, (ImagePlugin.__proto__ || Object.getPrototypeOf(ImagePlugin)).apply(this, arguments));
  }

  createClass(ImagePlugin, [{
    key: 'afterAll',


    /**
     * @override
     */
    value: function afterAll(conversion) {
      var images = conversion.context.images;

      if (!images.length) {
        return;
      }

      conversion.append('\n\n');

      for (var i = 0; i < images.length; i++) {
        conversion.append('[image' + i + ']: ' + images[i] + '\n');
      }
    }

    /**
     * @override
     */

  }, {
    key: 'beforeAll',
    value: function beforeAll(conversion) {
      conversion.context.imageMap = {};
      conversion.context.images = [];
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      var element = conversion.element,
          options = conversion.options;

      var source = options.absolute ? element.src : element.getAttribute('src');
      if (!source) {
        return false;
      }

      var alternativeText = element.getAttribute('alt') || '';
      var _conversion$context = conversion.context,
          imageMap = _conversion$context.imageMap,
          images = _conversion$context.images;

      var title = element.getAttribute('title');
      var value = title ? source + ' "' + title + '"' : source;
      var index = void 0;

      if (options.inline) {
        value = '(' + value + ')';
      } else {
        index = imageMap[value];
        if (index == null) {
          index = images.push(value) - 1;

          imageMap[value] = index;
        }

        value = '[image' + index + ']';
      }

      conversion.output('![' + alternativeText + ']' + value);

      return false;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['img'];
    }
  }]);
  return ImagePlugin;
}(Plugin_1);

Europa_1.register(new ImagePlugin());

/**
 * A {@link Plugin} which outputs a list item. The prefix for the list item will vary depending on what type of list the
 * item is contained within.
 *
 * @public
 */

var ListItemPlugin = function (_Plugin) {
  inherits(ListItemPlugin, _Plugin);

  function ListItemPlugin() {
    classCallCheck(this, ListItemPlugin);
    return possibleConstructorReturn(this, (ListItemPlugin.__proto__ || Object.getPrototypeOf(ListItemPlugin)).apply(this, arguments));
  }

  createClass(ListItemPlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      var value = conversion.inOrderedList ? conversion.listIndex++ + '. ' : '* ';

      if (!conversion.atLeft) {
        conversion.append(conversion.left.replace(/[ ]{2,4}$/, '\n'));

        conversion.atLeft = true;
        conversion.atNoWhiteSpace = true;
        conversion.atParagraph = true;
      } else if (conversion.last) {
        conversion.last = conversion.last.replace(/[ ]{2,4}$/, '\n');
      }

      conversion.append(Utilities_1.leftPad(value, (conversion.listDepth - 1) * 2));

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['li'];
    }
  }]);
  return ListItemPlugin;
}(Plugin_1);

Europa_1.register(new ListItemPlugin());

/**
 * A {@link Plugin} which outputs an ordered list.
 *
 * @public
 */

var OrderedListPlugin = function (_Plugin) {
  inherits(OrderedListPlugin, _Plugin);

  function OrderedListPlugin() {
    classCallCheck(this, OrderedListPlugin);
    return possibleConstructorReturn(this, (OrderedListPlugin.__proto__ || Object.getPrototypeOf(OrderedListPlugin)).apply(this, arguments));
  }

  createClass(OrderedListPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.inOrderedList = context.previousInOrderedList;
      conversion.listIndex = context.previousListIndex;
      conversion.listDepth--;
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {
      context.previousInOrderedList = conversion.inOrderedList;
      context.previousListIndex = conversion.listIndex;
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      if (conversion.listDepth === 0) {
        conversion.appendParagraph();
      }

      conversion.inOrderedList = true;
      conversion.listIndex = 1;
      conversion.listDepth++;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['ol'];
    }
  }]);
  return OrderedListPlugin;
}(Plugin_1);

Europa_1.register(new OrderedListPlugin());

/**
 * A {@link Plugin} which outputs a paragraph.
 *
 * @public
 */

var ParagraphPlugin = function (_Plugin) {
  inherits(ParagraphPlugin, _Plugin);

  function ParagraphPlugin() {
    classCallCheck(this, ParagraphPlugin);
    return possibleConstructorReturn(this, (ParagraphPlugin.__proto__ || Object.getPrototypeOf(ParagraphPlugin)).apply(this, arguments));
  }

  createClass(ParagraphPlugin, [{
    key: 'convert',


    /**
     * @override
     */
    value: function convert(conversion, context) {
      conversion.appendParagraph();

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['address', 'article', 'aside', 'div', 'fieldset', 'footer', 'header', 'nav', 'p', 'section'];
    }
  }]);
  return ParagraphPlugin;
}(Plugin_1);

Europa_1.register(new ParagraphPlugin());

/**
 * A {@link Plugin} which outputs the contents in a preformatted block.
 *
 * @public
 */

var PreformattedPlugin = function (_Plugin) {
  inherits(PreformattedPlugin, _Plugin);

  function PreformattedPlugin() {
    classCallCheck(this, PreformattedPlugin);
    return possibleConstructorReturn(this, (PreformattedPlugin.__proto__ || Object.getPrototypeOf(PreformattedPlugin)).apply(this, arguments));
  }

  createClass(PreformattedPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.atLeft = false;
      conversion.atParagraph = false;
      conversion.inPreformattedBlock = context.previousInPreformattedBlock;
      conversion.left = context.previousLeft;

      conversion.appendParagraph();
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {
      context.previousInPreformattedBlock = conversion.inPreformattedBlock;
      context.previousLeft = conversion.left;
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      var value = '    ';

      conversion.left += value;

      if (conversion.atParagraph) {
        conversion.append(value);
      } else {
        conversion.appendParagraph();
      }

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['pre'];
    }
  }]);
  return PreformattedPlugin;
}(Plugin_1);

Europa_1.register(new PreformattedPlugin());

/**
 * A {@link Plugin} which outputs as quoted text.
 *
 * @public
 */

var QuotePlugin = function (_Plugin) {
  inherits(QuotePlugin, _Plugin);

  function QuotePlugin() {
    classCallCheck(this, QuotePlugin);
    return possibleConstructorReturn(this, (QuotePlugin.__proto__ || Object.getPrototypeOf(QuotePlugin)).apply(this, arguments));
  }

  createClass(QuotePlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.output('"');
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      conversion.output('"');

      conversion.atNoWhiteSpace = true;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['q'];
    }
  }]);
  return QuotePlugin;
}(Plugin_1);

Europa_1.register(new QuotePlugin());

/**
 * A {@link Plugin} which outputs as strong text.
 *
 * @public
 */

var StrongPlugin = function (_Plugin) {
  inherits(StrongPlugin, _Plugin);

  function StrongPlugin() {
    classCallCheck(this, StrongPlugin);
    return possibleConstructorReturn(this, (StrongPlugin.__proto__ || Object.getPrototypeOf(StrongPlugin)).apply(this, arguments));
  }

  createClass(StrongPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.output('**');
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      conversion.output('**');

      conversion.atNoWhiteSpace = true;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['b', 'strong'];
    }
  }]);
  return StrongPlugin;
}(Plugin_1);

Europa_1.register(new StrongPlugin());

/**
 * A {@link Plugin} which outputs an unordered list.
 *
 * @public
 */

var UnorderedListPlugin = function (_Plugin) {
  inherits(UnorderedListPlugin, _Plugin);

  function UnorderedListPlugin() {
    classCallCheck(this, UnorderedListPlugin);
    return possibleConstructorReturn(this, (UnorderedListPlugin.__proto__ || Object.getPrototypeOf(UnorderedListPlugin)).apply(this, arguments));
  }

  createClass(UnorderedListPlugin, [{
    key: 'after',


    /**
     * @override
     */
    value: function after(conversion, context) {
      conversion.inOrderedList = context.previousInOrderedList;
      conversion.listIndex = context.previousListIndex;
      conversion.listDepth--;
    }

    /**
     * @override
     */

  }, {
    key: 'before',
    value: function before(conversion, context) {
      context.previousInOrderedList = conversion.inOrderedList;
      context.previousListIndex = conversion.listIndex;
    }

    /**
     * @override
     */

  }, {
    key: 'convert',
    value: function convert(conversion, context) {
      if (conversion.listDepth === 0) {
        conversion.appendParagraph();
      }

      conversion.inOrderedList = false;
      conversion.listIndex = 1;
      conversion.listDepth++;

      return true;
    }

    /**
     * @override
     */

  }, {
    key: 'getTagNames',
    value: function getTagNames() {
      return ['ul'];
    }
  }]);
  return UnorderedListPlugin;
}(Plugin_1);

Europa_1.register(new UnorderedListPlugin());

var src = Europa_1;

/*
 * Copyright (C) 2018 Alasdair Mercer, !ninja
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Defines a service contract that must be met by all implementations.
 *
 * @public
 */

var Service = function () {
  function Service() {
    classCallCheck(this, Service);
  }

  createClass(Service, [{
    key: 'getName',


    /**
     * Returns the name of this {@link Service}.
     *
     * @return {string} The service name.
     * @public
     * @abstract
     */
    value: function getName() {}
  }]);
  return Service;
}();

var Service_1 = Service;

/**
 * A service used to retrieve the window object for converting HTML to Markdown and, optionally, to close it upon
 * destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an artificial
 * browser environment.
 *
 * @public
 */

var WindowService = function (_Service) {
  inherits(WindowService, _Service);

  function WindowService() {
    classCallCheck(this, WindowService);
    return possibleConstructorReturn(this, (WindowService.__proto__ || Object.getPrototypeOf(WindowService)).apply(this, arguments));
  }

  createClass(WindowService, [{
    key: 'closeWindow',


    /**
     * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
     *
     * @param {Window} window - the window to be closed
     * @return {void}
     * @public
     */
    value: function closeWindow(window) {
      if (this.isCloseable(window)) {
        window.close();
      }
    }

    /**
     * Returns the default base URI for windows provided by this {@link WindowService}.
     *
     * Implementations of {@link WindowService} <b>must</b> override this method with their own specific logic.
     *
     * @return {string} The default base URI.
     * @public
     * @abstract
     */

  }, {
    key: 'getDefaultBaseUri',
    value: function getDefaultBaseUri() {}

    /**
     * @override
     */

  }, {
    key: 'getName',
    value: function getName() {
      return 'window';
    }

    /**
     * Returns a window to be used for converting HTML to Markdown using the base URI provided.
     *
     * It's important to note that the base URI cannot be changed in some environments, in which case <code>baseUri</code>
     * will be ignored.
     *
     * Implementations of {@link WindowService} <b>must</b> override this method with their own specific logic.
     *
     * @param {string} baseUri - the base URI to be used
     * @return {Window} The window.
     * @public
     * @abstract
     */

  }, {
    key: 'getWindow',
    value: function getWindow(baseUri) {}

    /**
     * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
     *
     * The default implementation of this method will always return <code>false</code>.
     *
     * @param {Window} window - the window to be checked
     * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
     * @public
     */

  }, {
    key: 'isCloseable',
    value: function isCloseable(window) {
      return false;
    }
  }]);
  return WindowService;
}(Service_1);

var WindowService_1 = WindowService;

/**
 * An implementation of {@link WindowService} intended for use within a browser environment.
 *
 * @public
 */

var BrowserWindowService = function (_WindowService) {
  inherits(BrowserWindowService, _WindowService);

  function BrowserWindowService() {
    classCallCheck(this, BrowserWindowService);
    return possibleConstructorReturn(this, (BrowserWindowService.__proto__ || Object.getPrototypeOf(BrowserWindowService)).apply(this, arguments));
  }

  createClass(BrowserWindowService, [{
    key: 'getDefaultBaseUri',


    /**
     * @override
     */
    value: function getDefaultBaseUri() {
      return window.document.baseURI;
    }

    /**
     * @override
     */

  }, {
    key: 'getWindow',
    value: function getWindow(baseUri) {
      return window;
    }
  }]);
  return BrowserWindowService;
}(WindowService_1);

var BrowserWindowService_1 = BrowserWindowService;

src.use(new BrowserWindowService_1());

var Europa_1$1 = src;

return Europa_1$1;

})));
//# sourceMappingURL=europa.js.map
