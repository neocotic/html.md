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

/**
 * Contains utility methods that are useful throughout the library.
 *
 * @public
 */
class Utilities {

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
  static forOwn(object, callback, context) {
    if (!object) {
      return;
    }

    for (const key in object) {
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
  static hasOwn(object, name) {
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
  static leftPad(string, times, padding) {
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

    for (let i = 0; i < times; i++) {
      string = padding + string;
    }

    return string;
  }

}

module.exports = Utilities;

/**
 * Called for each own enumerable property on <code>object</code>.
 *
 * @callback Utilities~ForOwnCallback
 * @param {*} value - the value of the property
 * @param {string} key - the name of the property
 * @param {Object} object - the object to which the property belongs
 * @return {void}
 */
