(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.europaPluginStandardAnchor = factory());
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

var contextKey = 'europaPluginStandardAnchor';

var src = function src() {
  return {
    converter: {
      A: {
        startTag: function startTag(conversion, context) {
          var element = conversion.element,
              options = conversion.options;

          var href = options.absolute ? element.href : element.getAttribute('href');
          if (!href) {
            return true;
          }

          var _conversion$context$c = conversion.context[contextKey],
              anchorMap = _conversion$context$c.anchorMap,
              anchors = _conversion$context$c.anchors;

          var title = element.getAttribute('title');
          var value = title ? href + ' "' + title + '"' : href;
          var index = void 0;

          if (options.inline) {
            context.value = '(' + value + ')';
          } else {
            index = anchorMap[value];
            if (index == null) {
              index = anchors.push(value) - 1;

              anchorMap[value] = index;
            }

            context.value = '[anchor' + index + ']';
          }

          conversion.output('[');

          conversion.atNoWhiteSpace = true;

          return true;
        },
        endTag: function endTag(conversion, context) {
          if (context.value != null) {
            conversion.output(']' + context.value);
          }
        }
      }
    },

    startConversion: function startConversion(conversion) {
      conversion.context[contextKey] = {
        anchorMap: {},
        anchors: []
      };
    },
    endConversion: function endConversion(conversion) {
      var anchors = conversion.context[contextKey].anchors;

      if (!anchors.length) {
        return;
      }

      conversion.append('\n\n');

      for (var i = 0; i < anchors.length; i++) {
        conversion.append('[anchor' + i + ']: ' + anchors[i] + '\n');
      }
    }
  };
};

return src;

})));
//# sourceMappingURL=europa-plugin-standard-anchor.js.map
