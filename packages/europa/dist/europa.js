(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Europa = factory());
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

function isVisible(element, window) {
  var style = window.getComputedStyle(element);

  return style.getPropertyValue('display') !== 'none' && style.getPropertyValue('visibility') !== 'hidden';
}

var dom = {
  isVisible: isVisible
};

/**
 * Iterates over own (not inherited) enumerable properties on the specified <code>object</code>.
 *
 * Nothing happens if <code>object</code> is <code>null</code>.
 *
 * @param {?Object} object - the object whose own properties are to be iterated over
 * @param {europa-utils~ForOwnCallback} callback - the function to be called with the value and key for each own
 * property on <code>object</code>
 * @return {void}
 * @public
 */
function forOwn(object, callback) {
  if (!object) {
    return;
  }

  for (var key in object) {
    if (hasOwn(object, key)) {
      callback(object[key], key, object);
    }
  }
}

/**
 * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
 * (not inherited) property.
 *
 * @param {Object} object - the object on which the property is to be checked
 * @param {string} name - the name of the property to be checked
 * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
 * @public
 */
function hasOwn(object, name) {
  return Object.prototype.hasOwnProperty.call(object, name);
}

/**
 * Returns the names of all own (not inherited) enumerable properties on the specified <code>object</code>.
 *
 * An empty array is returned if <code>object</code> is <code>null</code> or contains no such properties.
 *
 * @param {?Object} object - the object whose keys are to be returned
 * @return {Array.<string>} An array containing all own keys for <code>object</code>.
 * @public
 */
function ownKeys(object) {
  var keys = [];

  forOwn(object, function (value, key) {
    keys.push(key);
  });

  return keys;
}

var src$17 = {
  dom: dom,
  forOwn: forOwn,
  hasOwn: hasOwn,
  ownKeys: ownKeys
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var replacements = {
  '\\\\': '\\\\',
  '\\[': '\\[',
  '\\]': '\\]',
  '>': '\\>',
  '_': '\\_',
  '\\*': '\\*',
  '`': '\\`',
  '#': '\\#',
  '([0-9])\\.(\\s|$)': '$1\\.$2',
  '\xA9': '(c)',
  '\xAE': '(r)',
  '\u2122': '(tm)',
  '\xA0': ' ',
  '\xB7': '\\*',
  '\u2002': ' ',
  '\u2003': ' ',
  '\u2009': ' ',
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201C': '"',
  '\u201D': '"',
  '\u2026': '...',
  '\u2013': '--',
  '\u2014': '---'
};
var replacementsRegExp = {};
var skipTagNames = ['APPLET', 'AREA', 'AUDIO', 'BUTTON', 'CANVAS', 'DATALIST', 'EMBED', 'HEAD', 'INPUT', 'MAP', 'MENU', 'METER', 'NOFRAMES', 'NOSCRIPT', 'OBJECT', 'OPTGROUP', 'OPTION', 'PARAM', 'PROGRESS', 'RP', 'RT', 'RUBY', 'SCRIPT', 'SELECT', 'STYLE', 'TEXTAREA', 'TITLE', 'VIDEO'].reduce(function (acc, value) {
  acc[value] = true;

  return acc;
}, {});

src$17.forOwn(replacements, function (value, key) {
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

var Conversion = function () {
  function Conversion(europa, options, pluginManager) {
    classCallCheck(this, Conversion);

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


  createClass(Conversion, [{
    key: 'append',
    value: function append(string) {
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

  }, {
    key: 'appendParagraph',
    value: function appendParagraph() {
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

  }, {
    key: 'convertElement',
    value: function convertElement(element) {
      if (!element) {
        return;
      }

      var pluginManager = this._pluginManager,
          window = this.window;


      if (element.nodeType === window.Node.ELEMENT_NODE) {
        if (!src$17.dom.isVisible(element, window)) {
          return;
        }

        this.element = element;

        var tagName = this.tagName;


        if (skipTagNames[tagName]) {
          return;
        }

        var context = {};
        var convertChildren = pluginManager.hasConverter(tagName) ? pluginManager.invokeConverter(tagName, 'startTag', this, context) : true;

        if (convertChildren) {
          for (var i = 0; i < element.childNodes.length; i++) {
            this.convertElement(element.childNodes[i]);
          }
        }

        pluginManager.invokeConverter(tagName, 'endTag', this, context);
      } else if (element.nodeType === window.Node.TEXT_NODE) {
        var value = element.nodeValue || '';

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

  }, {
    key: 'output',
    value: function output(string, clean) {
      if (!string) {
        return this;
      }

      string = string.replace(/\r\n/g, '\n');

      if (clean) {
        string = string.replace(/\n([ \t]*\n)+/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/[ \t]+/g, ' ');

        src$17.forOwn(replacements, function (value, key) {
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

  }, {
    key: 'replaceLeft',
    value: function replaceLeft(string) {
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

  }, {
    key: 'toString',
    value: function toString() {
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

  }, {
    key: 'document',
    get: function get$$1() {
      return this._document;
    }

    /**
     * Returns the current element for this {@link Conversion}.
     *
     * @return {?Element} The current element.
     * @public
     */

  }, {
    key: 'element',
    get: function get$$1() {
      return this._element;
    }

    /**
     * Sets the current element for this {@link Conversion} to <code>element</code>.
     *
     * @param {?Element} element - the current element to be set
     * @return {void}
     * @public
     */
    ,
    set: function set$$1(element) {
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

  }, {
    key: 'tagName',
    get: function get$$1() {
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

  }, {
    key: 'window',
    get: function get$$1() {
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
    ,
    set: function set$$1(window) {
      this._window = window;
      this._document = window ? window.document : null;
    }
  }]);
  return Conversion;
}();

var Conversion_1 = Conversion;

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

/**
 * Defines an available option.
 *
 * If <code>defaultValue</code> is a function, it will be called if/when needed and the return value will be used as the
 * default value. If the default value is to be a function itself, then <code>defaultValue</code> must return that
 * function.
 *
 * @param {string} name - the name to be used
 * @param {*} [defaultValue] - the default value to be used
 * @public
 */

var Option = function () {
  function Option(name, defaultValue) {
    classCallCheck(this, Option);

    /**
     * The name for this {@link Option}.
     *
     * @public
     * @type {string}
     */
    this.name = name;

    this._defaultValue = defaultValue;
  }

  /**
   * Returns the default value for this {@link Option}.
   *
   * @return {*} The default value.
   * @public
   */


  createClass(Option, [{
    key: 'defaultValue',
    get: function get$$1() {
      var defaultValue = this._defaultValue;

      return typeof defaultValue === 'function' ? defaultValue.call(this) : defaultValue;
    }
  }]);
  return Option;
}();

var Option_1 = Option;

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

/**
 * Manages multiple {@link Option} instances that are intended to be used by multiple implementations/instances.
 *
 * @param {Option[]} options - the options to be used
 * @public
 */

var OptionParser = function () {
  function OptionParser(options) {
    classCallCheck(this, OptionParser);

    /**
     * The available options for this {@link OptionParser}.
     *
     * @public
     * @type {Option[]}
     */
    this.options = options;
  }

  /**
   * Returns whether an option with the specified <code>name</code> is available.
   *
   * @param {string} name - the name of the {@link Option} whose existence is to be checked
   * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
   * <code>false</code>.
   * @public
   */


  createClass(OptionParser, [{
    key: 'exists',
    value: function exists(name) {
      return this.options.some(function (option) {
        return option.name === name;
      });
    }

    /**
     * Parses the specified <code>options</code>, extracting only properties that match valid options and applying default
     * values where required.
     *
     * @param {Object} [options] - the options to be parsed
     * @return {Object.<string, *>} The parsed options.
     * @public
     */

  }, {
    key: 'parse',
    value: function parse(options) {
      if (!options) {
        options = {};
      }

      var result = {};

      this.options.forEach(function (option) {
        var name = option.name;

        var value = options[name] != null ? options[name] : option.defaultValue;

        result[name] = value;
      });

      return result;
    }
  }]);
  return OptionParser;
}();

var OptionParser_1 = OptionParser;

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

var helpers = {
  blockQuote: function blockQuote() {
    return {
      startTag: function startTag(conversion, context) {
        var value = '> ';

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
        conversion.left = context.previousLeft;

        conversion.appendParagraph();
      }
    };
  },
  bold: function bold() {
    return {
      startTag: function startTag(conversion, context) {
        conversion.output('**');

        conversion.atNoWhiteSpace = true;

        return true;
      },
      endTag: function endTag(conversion, context) {
        conversion.output('**');
      }
    };
  },
  italic: function italic() {
    return {
      startTag: function startTag(conversion, context) {
        conversion.output('_');

        conversion.atNoWhiteSpace = true;

        return true;
      },
      endTag: function endTag(conversion, context) {
        conversion.output('_');
      }
    };
  }
};

var helpers_1 = helpers;

/**
 * Calls the helper with the specified <code>name</code> using the <code>options</code> provided.
 *
 * @param {string} name - the name of the helper to be called
 * @param {Object} [options] - the options to be used
 * @return {*} The result of calling the helper.
 * @throws {ReferenceError} If no helper was found for <code>name</code>.
 * @public
 */
function get$1(name, options) {
  var fn = helpers_1[name];
  if (!fn) {
    throw new ReferenceError('Unknown helper: ' + name);
  }

  return fn(options);
}

/**
 * Returns all of the available helper names.
 *
 * @return {Array.<string>} The helper names.
 * @public
 */
function list() {
  return src$17.ownKeys(helpers_1);
}

var src$18 = {
  get: get$1,
  list: list
};

/**
 * Contains API methods that passed to plugin providers upon initialization.
 *
 * @public
 */

var PluginAPI = function () {
  function PluginAPI() {
    classCallCheck(this, PluginAPI);
  }

  createClass(PluginAPI, [{
    key: 'getHelper',


    /**
    * Calls the helper with the specified <code>name</code> using the <code>options</code> provided.
    *
    * @param {string} name - the name of the helper to be called
    * @param {Object} [options] - the options to be used
    * @return {*} The result of calling the helper.
    * @throws {ReferenceError} If no helper was found for <code>name</code>.
    * @public
    */
    value: function getHelper(name, options) {
      return src$18.get(name, options);
    }
  }]);
  return PluginAPI;
}();

var PluginAPI_1 = PluginAPI;

/**
 * A basic manager for plugins and presets (collections of plugins) that can be hooked into {@link Europa}.
 *
 * @public
 */

var PluginManager = function () {
  function PluginManager() {
    classCallCheck(this, PluginManager);

    this._api = new PluginAPI_1();
    this._converters = {};
    this._plugins = [];
  }

  /**
   * Invokes the specified plugin <code>provider</code> with a {@link PluginAPI} instance and adds the resulting plugin
   * to this {@link PluginManager}.
   *
   * If the plugin contains any converters, they will associated with their corresponding tag names, overriding any
   * previously converters associated with those tag names.
   *
   * @param {PluginManager~PluginProvider} provider - the provider for the plugin to be added
   * @return {PluginManager} A reference to this {@link PluginManager} for chaining purposes.
   * @throws {Error} If a problem occurs while invoking <code>provider</code>.
   * @public
   */


  createClass(PluginManager, [{
    key: 'addPlugin',
    value: function addPlugin(provider) {
      var _this = this;

      var plugin = provider(this._api);

      src$17.forOwn(plugin.converter, function (converter, tagName) {
        if (converter) {
          _this._converters[tagName] = converter;
        }
      });

      this._plugins.push(plugin);

      return this;
    }

    /**
     * Adds the specified <code>preset</code> to this {@link PluginManager}.
     *
     * This method is effectively just a shortcut for calling {@link PluginManager#addPlugin} for multiple plugin
     * providers, however, the main benefit is that it supports the concept of presets, which are a useful mechanism for
     * bundling and distributing plugins.
     *
     * @param {PluginManager~Preset} preset - the preset whose plugins are to be added
     * @return {PluginManager} A reference to this {@link PluginManager} for chaining purposes.
     * @public
     */

  }, {
    key: 'addPreset',
    value: function addPreset(preset) {
      var _this2 = this;

      var providers = preset.plugins || [];

      providers.forEach(function (provider) {
        _this2.addPlugin(provider);
      });

      return this;
    }

    /**
     * Returns whether this {@link PluginManager} contains a converter for the specified <code>tagName</code>.
     *
     * @param {string} tagName - the name of the tag to be checked
     * @return {boolean} <code>true</code> if it has a converter for <code>tagName</code>; otherwise <code>false</code>.
     * @public
     */

  }, {
    key: 'hasConverter',
    value: function hasConverter(tagName) {
      return src$17.hasOwn(this._converters, tagName);
    }

    /**
     * Invokes the method with the specified name on with the <code>args</code> provided on the converter for the given
     * <code>tagName</code> within this {@link PluginManager}.
     *
     * This method will return <code>null</code> if there is no converter for <code>tagName</code> or that converter does
     * not have the method. Otherwise, it will return the result of invoking the method.
     *
     * @param {string} tagName - the name of the tag whose converter (if any) the method is to be invoked on
     * @param {string} methodName - the name of the method to be invoked
     * @param {...*} [args] - any arguments to be passed to the method
     * @return {*} The result of calling the method or <code>null</code> if there is no converter for <code>tagName</code>
     * or it did not have the method.
     * @public
     */

  }, {
    key: 'invokeConverter',
    value: function invokeConverter(tagName, methodName) {
      var converter = this._converters[tagName];
      if (!(converter && typeof converter[methodName] === 'function')) {
        return null;
      }

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return converter[methodName].apply(converter, args);
    }

    /**
     * Invokes the method with the specified name with the <code>args</code> provided on each of the plugins within this
     * {@link PluginManager}.
     *
     * Plugins that do not have the method are skipped and any return values are ignored by this method.
     *
     * @param {string} methodName - the name of the method to be invoked
     * @param {...*} [args] - any arguments to be passed to the method
     * @return {void}
     * @public
     */

  }, {
    key: 'invokePlugins',
    value: function invokePlugins(methodName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this._plugins.forEach(function (plugin) {
        if (typeof plugin[methodName] === 'function') {
          plugin[methodName].apply(plugin, args);
        }
      });
    }
  }]);
  return PluginManager;
}();

var PluginManager_1 = PluginManager;

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

/**
 * A basic manager for {@link Service} implementations that are mapped to simple names.
 *
 * @public
 */

var ServiceManager = function () {
  function ServiceManager() {
    classCallCheck(this, ServiceManager);

    this._services = {};
  }

  /**
   * Returns the {@link Service} being managed with the specified <code>name</code>.
   *
   * @param {string} name - the name of the {@link Service} to be returned
   * @return {Service} The {@link Service} is being managed with <code>name</code>.
   * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
   * @public
   */


  createClass(ServiceManager, [{
    key: 'getService',
    value: function getService(name) {
      var service = this._services[name];
      if (!service) {
        throw new Error('Service is not being managed with name: ' + name);
      }

      return service;
    }

    /**
     * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
     * <code>service</code> provided.
     *
     * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
     * @param {Service} service - the {@link Service} implementation to be managed
     * @return {void}
     * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
     * @public
     */

  }, {
    key: 'setService',
    value: function setService(name, service) {
      if (this._services[name]) {
        throw new Error('Service is already managed with name: ' + name);
      }

      if (service) {
        this._services[name] = service;
      }
    }
  }]);
  return ServiceManager;
}();

var ServiceManager_1 = ServiceManager;

var pluginManager = new PluginManager_1();
var serviceManager = new ServiceManager_1();

/**
 * Enables configuration of a HTML to Markdown converter that supports HTML strings and DOM elements.
 *
 * @param {Europa~Options} [options] - the options to be used
 * @public
 */

var Europa = function () {
  createClass(Europa, null, [{
    key: 'registerPlugin',


    /**
     * Invokes the specified plugin <code>provider</code> with a {@link PluginAPI} instance and registers the resulting
     * plugin.
     *
     * If the plugin contains any converters, they will associated with their corresponding tag names, overriding any
     * previously converters associated with those tag names.
     *
     * @param {PluginManager~PluginProvider} provider - the provider for the plugin to be registered
     * @return {void}
     * @throws {Error} If a problem occurs while invoking <code>provider</code>.
     * @public
     */
    value: function registerPlugin(provider) {
      pluginManager.addPlugin(provider);
    }

    /**
     * Registers the specified <code>preset</code>.
     *
     * This method is effectively just a shortcut for calling {@link Europa.registerPlugin} for multiple plugin providers,
     * however, the main benefit is that it supports the concept of presets, which are a useful mechanism for bundling and
     * distributing plugins.
     *
     * @param {PluginManager~Preset} preset - the preset whose plugins are to be registered
     * @return {void}
     * @public
     */

  }, {
    key: 'registerPreset',
    value: function registerPreset(preset) {
      pluginManager.addPreset(preset);
    }

    /**
     * Configures the <code>service</code> provided to be used by all {@link Europa} instances.
     *
     * @param {Service} service - the {@link Service} to be configured
     * @return {void}
     * @throws {Error} If a {@link Service} has already been configured with the same name.
     * @public
     */

  }, {
    key: 'use',
    value: function use(service) {
      serviceManager.setService(service.getName(), service);
    }
  }]);

  function Europa(options) {
    classCallCheck(this, Europa);

    this._options = new OptionParser_1([new Option_1('absolute', false), new Option_1('baseUri', function () {
      return serviceManager.getService('window').getDefaultBaseUri();
    }), new Option_1('inline', false)]).parse(options);
    this._window = null;
  }

  /**
   * Converts the specified <code>html</code> into Markdown based on the options configured for this {@link Europa}
   * instance.
   *
   * <code>html</code> can either be an HTML string or a DOM element whose HTML contents are to be converted into
   * Markdown.
   *
   * @param {?Element|?string} html - the HTML (or element whose inner HTML is) to be converted into Markdown
   * @return {string} The Markdown converted from <code>html</code>.
   * @public
   */


  createClass(Europa, [{
    key: 'convert',
    value: function convert(html) {
      if (!html) {
        return '';
      }

      var document = this.document;

      var root = void 0;

      if (typeof html === 'string') {
        root = document.createElement('div');
        root.innerHTML = html;
      } else {
        root = html;
      }

      var conversion = new Conversion_1(this, this._options, pluginManager);
      var wrapper = void 0;

      if (!document.contains(root)) {
        wrapper = document.createElement('div');
        wrapper.style.display = 'none';
        wrapper.appendChild(root);

        document.body.appendChild(wrapper);
      }

      try {
        pluginManager.invokePlugins('startConversion', conversion);

        conversion.convertElement(root);

        pluginManager.invokePlugins('endConversion', conversion);
      } finally {
        if (wrapper) {
          document.body.removeChild(wrapper);

          wrapper.removeChild(root);
        }
      }

      return conversion.toString();
    }

    /**
     * Releases the window used by this {@link Europa} instance.
     *
     * This allows closeable {@link WindowService} implementations to close the window and free up resources. However,
     * this instance can and will simply retrieve another window from the {@link WindowService} the next time it is
     * required (i.e. {@link Europa#convert} is called).
     *
     * @return {Europa} A reference to this {@link Europa} for chaining purposes.
     * @public
     */

  }, {
    key: 'release',
    value: function release() {
      if (this._window) {
        serviceManager.getService('window').closeWindow(this._window);

        this._window = null;
      }

      return this;
    }

    /**
     * Returns the document to be used for HTML to Markdown conversion by this {@link Europa} instance.
     *
     * @return {Document} The document.
     * @public
     */

  }, {
    key: 'document',
    get: function get$$1() {
      return this.window.document;
    }

    /**
     * Returns the window to be used for HTML to Markdown conversion by this {@link Europa} instance.
     *
     * @return {Window} The window.
     * @public
     */

  }, {
    key: 'window',
    get: function get$$1() {
      if (!this._window) {
        this._window = serviceManager.getService('window').getWindow(this._options.baseUri);
      }

      return this._window;
    }
  }]);
  return Europa;
}();

var Europa_1 = Europa;

Europa_1.registerPreset(src$16);

var src$19 = Europa_1;

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

/**
 * Defines a service contract that must be met by all implementations.
 *
 * @public
 */

var Service = function () {
  function Service() {
    classCallCheck(this, Service);
  }

  createClass(Service, [{
    key: 'getName',


    /**
     * Returns the name of this {@link Service}.
     *
     * @return {string} The service name.
     * @public
     * @abstract
     */
    value: function getName() {}
  }]);
  return Service;
}();

var Service_1 = Service;

/**
 * A service used to retrieve the window object for converting HTML to Markdown and, optionally, to close it upon
 * destruction of the {@link Europa} instance. This can be useful to free up resources as/when required in an artificial
 * browser environment.
 *
 * @public
 */

var WindowService = function (_Service) {
  inherits(WindowService, _Service);

  function WindowService() {
    classCallCheck(this, WindowService);
    return possibleConstructorReturn(this, (WindowService.__proto__ || Object.getPrototypeOf(WindowService)).apply(this, arguments));
  }

  createClass(WindowService, [{
    key: 'closeWindow',


    /**
     * Closes the specified <code>window</code> but only if this {@link WindowService} is closeable.
     *
     * @param {Window} window - the window to be closed
     * @return {void}
     * @public
     */
    value: function closeWindow(window) {
      if (this.isCloseable(window)) {
        window.close();
      }
    }

    /**
     * Returns the default base URI for windows provided by this {@link WindowService}.
     *
     * Implementations of {@link WindowService} <b>must</b> override this method with their own specific logic.
     *
     * @return {string} The default base URI.
     * @public
     * @abstract
     */

  }, {
    key: 'getDefaultBaseUri',
    value: function getDefaultBaseUri() {}

    /**
     * @override
     */

  }, {
    key: 'getName',
    value: function getName() {
      return 'window';
    }

    /**
     * Returns a window to be used for converting HTML to Markdown using the base URI provided.
     *
     * It's important to note that the base URI cannot be changed in some environments, in which case <code>baseUri</code>
     * will be ignored.
     *
     * Implementations of {@link WindowService} <b>must</b> override this method with their own specific logic.
     *
     * @param {string} baseUri - the base URI to be used
     * @return {Window} The window.
     * @public
     * @abstract
     */

  }, {
    key: 'getWindow',
    value: function getWindow(baseUri) {}

    /**
     * Returns whether the specified <code>window</code> which was retrieved by this {@link WindowService} is closeable.
     *
     * The default implementation of this method will always return <code>false</code>.
     *
     * @param {Window} window - the window to be checked
     * @return {boolean} <code>true</code> if <code>window</code> is closeable; otherwise <code>false</code>.
     * @public
     */

  }, {
    key: 'isCloseable',
    value: function isCloseable(window) {
      return false;
    }
  }]);
  return WindowService;
}(Service_1);

var WindowService_1 = WindowService;

/**
 * An implementation of {@link WindowService} intended for use within a browser environment.
 *
 * @public
 */

var BrowserWindowService = function (_WindowService) {
  inherits(BrowserWindowService, _WindowService);

  function BrowserWindowService() {
    classCallCheck(this, BrowserWindowService);
    return possibleConstructorReturn(this, (BrowserWindowService.__proto__ || Object.getPrototypeOf(BrowserWindowService)).apply(this, arguments));
  }

  createClass(BrowserWindowService, [{
    key: 'getDefaultBaseUri',


    /**
     * @override
     */
    value: function getDefaultBaseUri() {
      return window.document.baseURI;
    }

    /**
     * @override
     */

  }, {
    key: 'getWindow',
    value: function getWindow(baseUri) {
      return window;
    }
  }]);
  return BrowserWindowService;
}(WindowService_1);

var BrowserWindowService_1 = BrowserWindowService;

src$19.use(new BrowserWindowService_1());

var Europa_1$1 = src$19;

return Europa_1$1;

})));
//# sourceMappingURL=europa.js.map
