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

const utils = require('europa-utils');

const helpers = require('./helpers');

/**
 * Calls the helper with the specified <code>name</code> using the <code>options</code> provided.
 *
 * @param {string} name - the name of the helper to be called
 * @param {Object} [options] - the options to be used
 * @return {*} The result of calling the helper.
 * @throws {ReferenceError} If no helper was found for <code>name</code>.
 * @public
 */
function get(name, options) {
  const fn = helpers[name];
  if (!fn) {
    throw new ReferenceError(`Unknown helper: ${name}`);
  }

  return fn(options);
}

/**
 * Returns all of the available helper names.
 *
 * @return {Array.<string>} The helper names.
 * @public
 */
function list() {
  return utils.ownKeys(helpers);
}

module.exports = {
  get,
  list
};
