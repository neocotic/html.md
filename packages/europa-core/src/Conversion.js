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

const replacements = {
  '\\\\': '\\\\',
  '\\[': '\\[',
  '\\]': '\\]',
  '>': '\\>',
  '_': '\\_',
  '\\*': '\\*',
  '`': '\\`',
  '#': '\\#',
  '([0-9])\\.(\\s|$)': '$1\\.$2',
  '\u00a9': '(c)',
  '\u00ae': '(r)',
  '\u2122': '(tm)',
  '\u00a0': ' ',
  '\u00b7': '\\*',
  '\u2002': ' ',
  '\u2003': ' ',
  '\u2009': ' ',
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201c': '"',
  '\u201d': '"',
  '\u2026': '...',
  '\u2013': '--',
  '\u2014': '---'
};
const replacementsRegExp = {};
const skipTagNames = [
  'APPLET',
  'AREA',
  'AUDIO',
  'BUTTON',
  'CANVAS',
  'DATALIST',
  'EMBED',
  'HEAD',
  'INPUT',
  'MAP',
  'MENU',
  'METER',
  'NOFRAMES',
  'NOSCRIPT',
  'OBJECT',
  'OPTGROUP',
  'OPTION',
  'PARAM',
  'PROGRESS',
  'RP',
  'RT',
  'RUBY',
  'SCRIPT',
  'SELECT',
  'STYLE',
  'TEXTAREA',
  'TITLE',
  'VIDEO'
].reduce((acc, value) => {
  acc[value] = true;

  return acc;
}, {});

utils.forOwn(replacements, (value, key) => {
  replacementsRegExp[key] = new RegExp(key, 'g');
});

/**
 * Contains contextual information for a single conversion process.
 *
 * @param {Europa} europa - the {@link Europa} instance responsible for this conversion
 * @param {Europa~Options} options - the options to be used
 * @param {PluginManager} pluginManager - the {@link PluginManager} to be used
 * @public
 */
class Conversion {

  constructor(europa, options, pluginManager) {
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
    this._pluginManager = pluginManager;
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
  append(string) {
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
  appendParagraph() {
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
   * Converts the specified <code>element</code> and it's children into Markdown using this {@link Conversion}.
   *
   * Nothing happens if <code>element</code> is <code>null</code> or is invisible (simplified detection used).
   *
   * @param {?Element} element - the element (along well as it's children) to be converted into Markdown
   * @return {void}
   * @public
   */
  convertElement(element) {
    if (!element) {
      return;
    }

    const { _pluginManager: pluginManager, window } = this;

    if (element.nodeType === window.Node.ELEMENT_NODE) {
      if (!utils.dom.isVisible(element, window)) {
        return;
      }

      this.element = element;

      const { tagName } = this;

      if (skipTagNames[tagName]) {
        return;
      }

      const context = {};
      const convertChildren = pluginManager.hasConverter(tagName)
        ? pluginManager.invokeConverter(tagName, 'startTag', this, context)
        : true;

      if (convertChildren) {
        for (let i = 0; i < element.childNodes.length; i++) {
          this.convertElement(element.childNodes[i]);
        }
      }

      pluginManager.invokeConverter(tagName, 'endTag', this, context);
    } else if (element.nodeType === window.Node.TEXT_NODE) {
      const value = element.nodeValue || '';

      if (this.inPreformattedBlock) {
        this.output(value);
      } else if (this.inCodeBlock) {
        this.output(value.replace(/`/g, '\\`'));
      } else {
        this.output(value, true);
      }
    }
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
  output(string, clean) {
    if (!string) {
      return this;
    }

    string = string.replace(/\r\n/g, '\n');

    if (clean) {
      string = string.replace(/\n([ \t]*\n)+/g, '\n')
        .replace(/\n[ \t]+/g, '\n')
        .replace(/[ \t]+/g, ' ');

      utils.forOwn(replacements, (value, key) => {
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
  replaceLeft(string) {
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
   * @override
   */
  toString() {
    return this.append('').buffer.trim();
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
  get document() {
    return this._document;
  }

  /**
   * Returns the current element for this {@link Conversion}.
   *
   * @return {?Element} The current element.
   * @public
   */
  get element() {
    return this._element;
  }

  /**
   * Sets the current element for this {@link Conversion} to <code>element</code>.
   *
   * @param {?Element} element - the current element to be set
   * @return {void}
   * @public
   */
  set element(element) {
    this._element = element;
    this._tagName = element && element.tagName ? element.tagName.toUpperCase() : null;
  }

  /**
   * Returns the name of the tag for the current element for this {@link Conversion}.
   *
   * The tag name will always be in upper case, when available.
   *
   * @return {?string} The current element's tag name.
   * @public
   */
  get tagName() {
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
  get window() {
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
  set window(window) {
    this._window = window;
    this._document = window ? window.document : null;
  }

}

module.exports = Conversion;
