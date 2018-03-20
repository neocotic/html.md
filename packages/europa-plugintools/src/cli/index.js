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

const program = require('commander');
const { EOL } = require('os');
const path = require('path');

const { build } = require('.');
const { version } = require('../package.json');

/**
 * Parses the specified <code>args</code> and determines what action is to be taken.
 *
 * @param {?Array.<string>} args - the command-line arguments to be parsed (may be <code>null</code>)
 * @param {Object} [options] - the options to be used
 * @param {string} [options.cwd=process.cwd()] - the current working directory
 * @param {Writable} [options.stderr=process.stderr] - the writable stream to which errors are to be written
 * @param {Writable} [options.stdout=process.stdout] - the writable stream to which output are to be written
 * @return {void}
 * @public
 */
function parse(args, options) {
  if (args == null) {
    args = [];
  }

  options = Object.assign({
    cwd: process.cwd(),
    stderr: process.stderr,
    stdout: process.stdout
  }, options);

  program.version(version);

  program
    .command('build <dir>')
    .description('TODO')
    .action((dir) => {
      build(path.resolve(options.cwd, dir))
        .then(() => options.stdout.write(`Done!${EOL}`))
        .catch((error) => options.stderr.write(`${error.message}${EOL}`));
    });

  program.parse(args);
}

module.exports = {
  parse
};
