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

const europaPluginStandardAnchor = require('europa-plugin-standard-anchor');
const europaPluginStandardBlockQuote = require('europa-plugin-standard-block-quote');
const europaPluginStandardBold = require('europa-plugin-standard-bold');
const europaPluginStandardCode = require('europa-plugin-standard-code');
const europaPluginStandardDescription = require('europa-plugin-standard-description');
const europaPluginStandardDetails = require('europa-plugin-standard-details');
const europaPluginStandardFrame = require('europa-plugin-standard-frame');
const europaPluginStandardHeading = require('europa-plugin-standard-heading');
const europaPluginStandardHorizontalRule = require('europa-plugin-standard-horizontal-rule');
const europaPluginStandardImage = require('europa-plugin-standard-image');
const europaPluginStandardItalic = require('europa-plugin-standard-italic');
const europaPluginStandardLineBreak = require('europa-plugin-standard-line-break');
const europaPluginStandardList = require('europa-plugin-standard-list');
const europaPluginStandardParagraph = require('europa-plugin-standard-paragraph');
const europaPluginStandardPreformatted = require('europa-plugin-standard-preformatted');
const europaPluginStandardQuote = require('europa-plugin-standard-quote');

module.exports = {
  plugins: [
    europaPluginStandardAnchor,
    europaPluginStandardBlockQuote,
    europaPluginStandardBold,
    europaPluginStandardCode,
    europaPluginStandardDescription,
    europaPluginStandardDetails,
    europaPluginStandardFrame,
    europaPluginStandardHeading,
    europaPluginStandardHorizontalRule,
    europaPluginStandardImage,
    europaPluginStandardItalic,
    europaPluginStandardLineBreak,
    europaPluginStandardList,
    europaPluginStandardParagraph,
    europaPluginStandardPreformatted,
    europaPluginStandardQuote
  ]
};
