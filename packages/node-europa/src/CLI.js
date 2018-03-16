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

const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const program = require('commander');
const readline = require('readline');

const Europa = require('../src/Europa');
const { version } = require('../package.json');

/**
 * A command-line interface for converting HTML into Markdown.
 *
 * @param {Readable} input - the <code>Readable</code> from which to read the HTML to be converted if no files or
 * evaluation string is provided
 * @param {Writable} output - the <code>Writable</code> to which the generated Markdown is to be written if no files
 * or output path is provided
 * @public
 */
class CLI {

  constructor(input, output) {
    this._input = input;
    this._output = output;
    this._program = program
      .version(version)
      .usage('[options] [file ...]')
      .option('-a, --absolute', 'use absolute URLs for anchors/images')
      .option('-b, --base-uri <uri>', 'base URI for anchors/images')
      .option('-e, --eval <html>', 'evaluate HTML string')
      .option('-i, --inline', 'insert anchor/image URLs inline')
      .option('-o, --output <path>', 'output directory (for files) or file (for eval/stdin)');
  }

  /**
   * Parses the specified <code>args</code> and determines what is to be converted into Markdown and where the generated
   * Markdown is to be output.
   *
   * @param {string[]} [args=[]] - the command-line arguments to be parsed
   * @return {void}
   * @public
   */
  parse(args) {
    if (args == null) {
      args = [];
    }

    this._program.parse(args);

    const europa = new Europa({
      absolute: this._program.absolute,
      baseUri: this._program.baseUri || null,
      inline: this._program.inline
    });

    if (this._program.eval) {
      this._readString(this._program.eval, europa);
    } else if (this._program.args.length) {
      this._readFiles(glob.sync(this._program.args, {
        nodir: true,
        nosort: true
      }), europa);
    } else {
      this._readInput(europa);
    }
  }

  _readFiles(files, europa) {
    if (!files.length) {
      return;
    }

    const output = this._program.output ? path.normalize(this._program.output) : null;

    files.forEach((file) => {
      const html = fs.readFileSync(file, 'utf8');
      const markdown = europa.convert(html);
      const targetDirectory = output || path.dirname(file);
      const targetFile = path.join(targetDirectory, `${path.basename(file, path.extname(file))}.md`);

      mkdirp.sync(targetDirectory);

      fs.writeFileSync(targetFile, markdown, 'utf8');
    });
  }

  _readInput(europa) {
    const buffer = [];
    const reader = readline.createInterface({
      input: this._input,
      output: this._output,
      terminal: false
    });

    reader.on('line', (line) => buffer.push(line));
    reader.on('close', () => {
      if (buffer.length) {
        this._readString(buffer.join('\n'), europa);
      }
    });
  }

  _readString(html, europa) {
    const markdown = europa.convert(html);

    if (this._program.output) {
      const target = path.normalize(this._program.output);
      const output = path.dirname(target);

      mkdirp.sync(output);

      fs.writeFileSync(target, markdown, 'utf8');
    } else {
      this._output.end(markdown, 'utf8');
    }
  }

}

module.exports = CLI;
