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
 * Manages multiple {@link Option} instances that are intended to be used by multiple implementations/instances.
 *
 * @param {Option[]} options - the options to be used
 * @public
 */
class OptionParser {

  constructor(options) {
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
  exists(name) {
    return this.options.some((option) => option.name === name);
  }

  /**
   * Parses the specified <code>options</code>, extracting only properties that match valid options and applying default
   * values where required.
   *
   * @param {Object} [options] - the options to be parsed
   * @return {Object.<string, *>} The parsed options.
   * @public
   */
  parse(options) {
    if (!options) {
      options = {};
    }

    const result = {};

    this.options.forEach((option) => {
      const { name } = option;
      const value = options[name] != null ? options[name] : option.defaultValue;

      result[name] = value;
    });

    return result;
  }

}

module.exports = OptionParser;
