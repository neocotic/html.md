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
class Option {

  constructor(name, defaultValue) {
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
  get defaultValue() {
    const defaultValue = this._defaultValue;

    return typeof defaultValue === 'function' ? defaultValue.call(this) : defaultValue;
  }

}

module.exports = Option;
