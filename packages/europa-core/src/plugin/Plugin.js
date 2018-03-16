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
 * A plugin that can tap into multiple parts in the conversion process while being specific to only a sub-set of tags.
 *
 * @public
 */
class Plugin {

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
  after(conversion, context) {}

  /**
   * Called before any elements are converted and intended to setup this {@link Plugin} initially.
   *
   * @param {Conversion} conversion - the current {@link Conversion}
   * @return {void}
   * @public
   */
  afterAll(conversion) {}

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
  before(conversion, context) {}

  /**
   * Called after all elements have been converted and intended to completing any steps for this {@link Plugin}.
   *
   * @param {Conversion} conversion - the current {@link Conversion}
   * @return {void}
   * @public
   */
  beforeAll(conversion) {}

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
  convert(conversion, context) {
    return true;
  }

  /**
   * Returns the names of tags with which this {@link Plugin} should be registered to handle.
   *
   * @return {string[]} The names of supported tags.
   * @public
   */
  getTagNames() {
    return [];
  }

}

module.exports = Plugin;
