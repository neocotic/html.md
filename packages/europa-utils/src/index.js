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

'use strict';

const dom = require('./dom');

/**
 * Iterates over own (not inherited) enumerable properties on the specified <code>object</code>.
 *
 * Nothing happens if <code>object</code> is <code>null</code>.
 *
 * @param {?Object} object - the object whose own properties are to be iterated over
 * @param {europa-utils~ForOwnCallback} callback - the function to be called with the value and key for each own
 * property on <code>object</code>
 * @return {void}
 * @public
 */
function forOwn(object, callback) {
  if (!object) {
    return;
  }

  for (const key in object) {
    if (hasOwn(object, key)) {
      callback(object[key], key, object);
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
function hasOwn(object, name) {
  return Object.prototype.hasOwnProperty.call(object, name);
}

/**
 * Returns the names of all own (not inherited) enumerable properties on the specified <code>object</code>.
 *
 * An empty array is returned if <code>object</code> is <code>null</code> or contains no such properties.
 *
 * @param {?Object} object - the object whose keys are to be returned
 * @return {Array.<string>} An array containing all own keys for <code>object</code>.
 * @public
 */
function ownKeys(object) {
  const keys = [];

  forOwn(object, (value, key) => {
    keys.push(key);
  });

  return keys;
}

module.exports = {
  dom,
  forOwn,
  hasOwn,
  ownKeys
};

/**
 * Called for each own enumerable property on <code>object</code>.
 *
 * @callback europa-utils~ForOwnCallback
 * @param {*} value - the value of the property
 * @param {string} key - the name of the property
 * @param {Object} object - the object to which the property belongs
 * @return {void}
 */
