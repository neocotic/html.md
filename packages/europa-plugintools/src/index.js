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

// TODO: Complete

const babel = require('rollup-plugin-babel');
const camelCase = require('lodash.camelcase');
const commonjs = require('rollup-plugin-commonjs');
const fs = require('fs');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * TODO: Document
 *
 * @param {string} dir -
 * @return {Promise.<void, Error>}
 * @public
 */
async function build(dir) {
  const pkg = await readFile(path.join(dir, 'package.json'), 'utf8');
  const { author, license, name, version } = JSON.parse(pkg);
  const safeName = camelCase(name);
  const sourceFile = path.join(dir, 'src/index.js');
  const targetFileDev = path.join(dir, `dist/${name}.js`);
  const targetFileProd = path.join(dir, `dist/${name}.min.js`);
  const year = new Date().getFullYear();
  const banner = `/*! ${name} v${version} | (C) ${year} ${author.name}, !ninja | ${license} License */`;
  const tasks = [];

  tasks.push(buildConfig({
    input: sourceFile,
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: [
          [ 'env', { modules: false } ]
        ],
        plugins: [ 'external-helpers' ]
      })
    ]
  }, {
    file: targetFileDev,
    format: 'umd',
    name: safeName,
    sourcemap: true,
    sourcemapFile: `${targetFileDev}.map`
  }));

  tasks.push(buildConfig({
    input: sourceFile,
    plugins: [
      nodeResolve(),
      commonjs(),
      babel({
        babelrc: false,
        presets: [
          [ 'env', { modules: false } ]
        ],
        plugins: [ 'external-helpers' ]
      }),
      uglify({
        output: {
          comments: (node, comment) => comment.type === 'comment2' && /^!/.test(comment.value)
        }
      })
    ]
  }, {
    banner,
    file: targetFileProd,
    format: 'umd',
    name: safeName,
    sourcemap: true,
    sourcemapFile: `${targetFileProd}.map`
  }));

  await Promise.all(tasks);
}

/**
 * TODO: Document
 *
 * @param {Object} inputOptions -
 * @param {Object} outputOptions -
 * @return {Promise.<void, Error>}
 * @public
 */
async function buildConfig(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

module.exports = {
  build
};
