(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.europaPluginStandardList = factory());
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

function leftPad(string, times, padding) {
  if (string == null) {
    string = '';
  }
  if (times == null) {
    times = 0;
  }

  for (var i = 0; i < times; i++) {
    string = ' ' + string;
  }

  return string;
}

var src = function src() {
  return {
    converter: {
      LI: {
        startTag: function startTag(conversion, context) {
          var value = conversion.inOrderedList ? conversion.listIndex++ + '. ' : '* ';

          if (!conversion.atLeft) {
            conversion.append(conversion.left.replace(/[ ]{2,4}$/, '\n'));

            conversion.atLeft = true;
            conversion.atNoWhiteSpace = true;
            conversion.atParagraph = true;
          } else if (conversion.last) {
            conversion.last = conversion.last.replace(/[ ]{2,4}$/, '\n');
          }

          conversion.append(leftPad(value, (conversion.listDepth - 1) * 2));

          return true;
        }
      },
      OL: {
        startTag: function startTag(conversion, context) {
          context.previousInOrderedList = conversion.inOrderedList;
          context.previousListIndex = conversion.listIndex;

          if (conversion.listDepth === 0) {
            conversion.appendParagraph();
          }

          conversion.inOrderedList = true;
          conversion.listIndex = 1;
          conversion.listDepth++;

          return true;
        },
        endTag: function endTag(conversion, context) {
          conversion.inOrderedList = context.previousInOrderedList;
          conversion.listIndex = context.previousListIndex;
          conversion.listDepth--;
        }
      },
      UL: {
        startTag: function startTag(conversion, context) {
          context.previousInOrderedList = conversion.inOrderedList;
          context.previousListIndex = conversion.listIndex;

          if (conversion.listDepth === 0) {
            conversion.appendParagraph();
          }

          conversion.inOrderedList = false;
          conversion.listIndex = 1;
          conversion.listDepth++;

          return true;
        },
        endTag: function endTag(conversion, context) {
          conversion.inOrderedList = context.previousInOrderedList;
          conversion.listIndex = context.previousListIndex;
          conversion.listDepth--;
        }
      }
    }
  };
};

return src;

})));
//# sourceMappingURL=europa-plugin-standard-list.js.map
