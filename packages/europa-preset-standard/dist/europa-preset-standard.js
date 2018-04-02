(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.europaPresetStandard = {})));
}(this, (function (exports) { 'use strict';

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

var src$1 = function src(api) {
  return {
    converter: {
      BLOCKQUOTE: api.getHelper('blockQuote')
    }
  };
};

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

var src$2 = function src(api) {
  var boldConverter = api.getHelper('bold');

  return {
    converter: {
      B: boldConverter,
      STRONG: boldConverter
    }
  };
};

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

var codeConverter = {
  startTag: function startTag(conversion, context) {
    context.previousInCodeBlock = conversion.inCodeBlock;

    if (conversion.inPreformattedBlock) {
      context.skipped = true;
    } else {
      conversion.output('`');

      conversion.inCodeBlock = true;
    }

    return true;
  },
  endTag: function endTag(conversion, context) {
    if (!context.skipped) {
      conversion.inCodeBlock = context.previousInCodeBlock;

      conversion.output('`');
    }
  }
};

var src$3 = function src() {
  return {
    converter: {
      CODE: codeConverter,
      KBD: codeConverter,
      SAMP: codeConverter
    }
  };
};

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

var src$4 = function src(api) {
  return {
    converter: {
      DD: api.getHelper('blockQuote'),

      DT: {
        startTag: function startTag(conversion, context) {
          conversion.appendParagraph();

          conversion.output('**');

          conversion.atNoWhiteSpace = true;

          return true;
        },
        endTag: function endTag(conversion, context) {
          conversion.output('**');
        }
      }
    }
  };
};

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

var src$5 = function src() {
  return {
    converter: {
      DETAILS: {
        startTag: function startTag(conversion, context) {
          // TODO: Improve (summary should always be visible, when available, regardless of open state)
          // TODO: Possible just remove special handling of SUMMARY as well
          var element = conversion.element;


          conversion.appendParagraph();

          if (element.hasAttribute('open')) {
            return true;
          }

          var summary = element.querySelector('summary');
          conversion.convertElement(summary);
        }
      }
    }
  };
};

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

var frameConverter = {
  startTag: function startTag(conversion, context) {
    context.previousWindow = conversion.window;

    var window = conversion.element.contentWindow;

    if (window) {
      conversion.window = window;

      conversion.convertElement(window.document.body);
    }

    return false;
  },
  endTag: function endTag(conversion, context) {
    conversion.window = context.previousWindow;
  }
};

var src$6 = function src() {
  return {
    converter: {
      FRAME: frameConverter,
      IFRAME: frameConverter
    }
  };
};

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

var headingConverter = {
  startTag: function startTag(conversion, context) {
    var level = parseInt(conversion.tagName.match(/([1-6])$/)[1], 10);

    conversion.appendParagraph();

    var heading = '';
    for (var i = 0; i < level; i++) {
      heading += '#';
    }

    conversion.output(heading + ' ');

    return true;
  }
};

var src$7 = function src() {
  return {
    converter: {
      H1: headingConverter,
      H2: headingConverter,
      H3: headingConverter,
      H4: headingConverter,
      H5: headingConverter,
      H6: headingConverter
    }
  };
};

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

var src$8 = function src() {
  return {
    converter: {
      HR: {
        startTag: function startTag(conversion, context) {
          conversion.appendParagraph().output('---').appendParagraph();

          return false;
        }
      }
    }
  };
};

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

var contextKey$1 = 'europaPluginStandardImage';

var src$9 = function src() {
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
          var _conversion$context$c = conversion.context[contextKey$1],
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
      conversion.context[contextKey$1] = {
        imageMap: {},
        images: []
      };
    },
    endConversion: function endConversion(conversion) {
      var images = conversion.context[contextKey$1].images;

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

var src$10 = function src(api) {
  var italicConverter = api.getHelper('italic');

  return {
    converter: {
      CITE: italicConverter,
      DFN: italicConverter,
      EM: italicConverter,
      I: italicConverter,
      // TODO: Remove U tag
      U: italicConverter,
      VAR: italicConverter
    }
  };
};

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

var src$11 = function src() {
  return {
    converter: {
      BR: {
        startTag: function startTag(conversion, context) {
          conversion.append('  ' + conversion.left);

          conversion.atLeft = true;
          conversion.atNoWhiteSpace = true;

          return false;
        }
      }
    }
  };
};

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

var src$12 = function src() {
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

var paragraphConverter = {
  startTag: function startTag(conversion, context) {
    conversion.appendParagraph();

    return true;
  }
};

var src$13 = function src() {
  return {
    converter: {
      ADDRESS: paragraphConverter,
      ARTICLE: paragraphConverter,
      ASIDE: paragraphConverter,
      DIV: paragraphConverter,
      FIELDSET: paragraphConverter,
      FOOTER: paragraphConverter,
      HEADER: paragraphConverter,
      NAV: paragraphConverter,
      P: paragraphConverter,
      SECTION: paragraphConverter
    }
  };
};

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

var src$14 = function src() {
  return {
    converter: {
      PRE: {
        startTag: function startTag(conversion, context) {
          var value = '    ';

          context.previousInPreformattedBlock = conversion.inPreformattedBlock;
          context.previousLeft = conversion.left;
          conversion.left += value;

          if (conversion.atParagraph) {
            conversion.append(value);
          } else {
            conversion.appendParagraph();
          }

          return true;
        },
        endTag: function endTag(conversion, context) {
          conversion.atLeft = false;
          conversion.atParagraph = false;
          conversion.inPreformattedBlock = context.previousInPreformattedBlock;
          conversion.left = context.previousLeft;

          conversion.appendParagraph();
        }
      }
    }
  };
};

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

var src$15 = function src() {
  return {
    converter: {
      Q: {
        startTag: function startTag(conversion, context) {
          conversion.output('"');

          conversion.atNoWhiteSpace = true;

          return true;
        },
        endTag: function endTag(conversion, context) {
          conversion.output('"');
        }
      }
    }
  };
};

var src$16 = {
  plugins: [src, src$1, src$2, src$3, src$4, src$5, src$6, src$7, src$8, src$9, src$10, src$11, src$12, src$13, src$14, src$15]
};
var src_1 = src$16.plugins;

exports.default = src$16;
exports.plugins = src_1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=europa-preset-standard.js.map
