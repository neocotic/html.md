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
class AnchorPlugin extends Plugin {

  /**
   * @override
   */
  after(conversion, context) {
    if (context.value != null) {
      conversion.output(`]${context.value}`);
    }
  }

  /**
   * @override
   */
  afterAll(conversion) {
    const { anchors } = conversion.context;
    if (!anchors.length) {
      return;
    }

    conversion.append('\n\n');

    for (let i = 0; i < anchors.length; i++) {
      conversion.append(`[anchor${i}]: ${anchors[i]}\n`);
    }
  }

  /**
   * @override
   */
  beforeAll(conversion) {
    conversion.context.anchorMap = {};
    conversion.context.anchors = [];
  }

  /**
   * @override
   */
  convert(conversion, context) {
    const { element, options } = conversion;
    const href = options.absolute ? element.href : element.getAttribute('href');
    if (!href) {
      return true;
    }

    const { anchorMap, anchors } = conversion.context;
    const title = element.getAttribute('title');
    const value = title ? `${href} "${title}"` : href;
    let index;

    if (options.inline) {
      context.value = `(${value})`;
    } else {
      index = anchorMap[value];
      if (index == null) {
        index = anchors.push(value) - 1;

        anchorMap[value] = index;
      }

      context.value = `[anchor${index}]`;
    }

    conversion.output('[');

    conversion.atNoWhiteSpace = true;

    return true;
  }

  /**
   * @override
   */
  getTagNames() {
    return [ 'a' ];
  }

}

Europa.register(new AnchorPlugin());

module.exports = AnchorPlugin;
