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

const Europa = require('../../Europa');
const Plugin = require('../Plugin');

/**
 * A {@link Plugin} which outputs a details section.
 *
 * If the details has an <code>open</code> attribute then all of its children are converted. Otherwise, only the nested
 * <code>summary</code>, if any, will be converted.
 *
 * @public
 */
class DetailsPlugin extends Plugin {

  /**
   * @override
   */
  convert(conversion, context) {
    const { element } = conversion;

    conversion.appendParagraph();

    if (element.hasAttribute('open')) {
      return true;
    }

    const summary = element.querySelector('summary');
    conversion.europa.convertElement(summary, conversion);

    return false;
  }

  /**
   * @override
   */
  getTagNames() {
    return [ 'details' ];
  }

}

Europa.register(new DetailsPlugin());

module.exports = DetailsPlugin;
