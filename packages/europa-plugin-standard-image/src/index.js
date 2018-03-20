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

const contextKey = 'europaPluginStandardImage';

module.exports = function() {
  return {
    converter: {
      IMG: {
        startTag(conversion, context) {
          const { element, options } = conversion;
          const source = options.absolute ? element.src : element.getAttribute('src');
          if (!source) {
            return false;
          }

          const alternativeText = element.getAttribute('alt') || '';
          const { imageMap, images } = conversion.context[contextKey];
          const title = element.getAttribute('title');
          let value = title ? `${source} "${title}"` : source;
          let index;

          if (options.inline) {
            value = `(${value})`;
          } else {
            index = imageMap[value];
            if (index == null) {
              index = images.push(value) - 1;

              imageMap[value] = index;
            }

            value = `[image${index}]`;
          }

          conversion.output(`![${alternativeText}]${value}`);

          return false;
        }
      }
    },

    startConversion(conversion) {
      conversion.context[contextKey] = {
        imageMap: {},
        images: []
      };
    },

    endConversion(conversion) {
      const { images } = conversion.context[contextKey];
      if (!images.length) {
        return;
      }

      conversion.append('\n\n');

      for (let i = 0; i < images.length; i++) {
        conversion.append(`[image${i}]: ${images[i]}\n`);
      }
    }
  };
};
