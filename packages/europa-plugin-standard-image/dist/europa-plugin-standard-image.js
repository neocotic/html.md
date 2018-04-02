(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.europaPluginStandardImage = factory());
}(this, (function () { 'use strict';

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

var contextKey = 'europaPluginStandardImage';

var src = function src() {
  return {
    converter: {
      IMG: {
        startTag: function startTag(conversion, context) {
          var element = conversion.element,
              options = conversion.options;

          var source = options.absolute ? element.src : element.getAttribute('src');
          if (!source) {
            return false;
          }

          var alternativeText = element.getAttribute('alt') || '';
          var _conversion$context$c = conversion.context[contextKey],
              imageMap = _conversion$context$c.imageMap,
              images = _conversion$context$c.images;

          var title = element.getAttribute('title');
          var value = title ? source + ' "' + title + '"' : source;
          var index = void 0;

          if (options.inline) {
            value = '(' + value + ')';
          } else {
            index = imageMap[value];
            if (index == null) {
              index = images.push(value) - 1;

              imageMap[value] = index;
            }

            value = '[image' + index + ']';
          }

          conversion.output('![' + alternativeText + ']' + value);

          return false;
        }
      }
    },

    startConversion: function startConversion(conversion) {
      conversion.context[contextKey] = {
        imageMap: {},
        images: []
      };
    },
    endConversion: function endConversion(conversion) {
      var images = conversion.context[contextKey].images;

      if (!images.length) {
        return;
      }

      conversion.append('\n\n');

      for (var i = 0; i < images.length; i++) {
        conversion.append('[image' + i + ']: ' + images[i] + '\n');
      }
    }
  };
};

return src;

})));
//# sourceMappingURL=europa-plugin-standard-image.js.map
