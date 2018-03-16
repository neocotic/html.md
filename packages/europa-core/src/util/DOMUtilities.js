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
 * Contains utility methods that are useful when dealing with the DOM.
 *
 * @public
 */
class DOMUtilities {

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
  static isVisible(element, window) {
    const style = window.getComputedStyle(element);

    return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
  }

}

module.exports = DOMUtilities;
