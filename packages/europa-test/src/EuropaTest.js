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

const { assert } = require('chai');

const fixtures = [
  'content',
  'lists',
  'scaffolding',
  'tables',
  'unformatted-lists',
  'visibility'
];

/**
 * A test runner for Europa Core test case based on a specific implementation.
 *
 * Mocha <b>must</b> be available in the current context when using <code>EuropaTest</code>.
 *
 * @public
 */
class EuropaTest {

  /**
   * Runs the Europa Core test cases based on the <code>options</code> provided.
   *
   * @param {Object} options - the options to be used
   * @param {Function} options.Europa - the constructor for the {@link Europa} implementation to be tested
   * @param {Function} options.loadFixture - a function that is passed the path of fixtures (relative to
   * <code>europa-test</code>) to be loaded asynchronously
   * @return {void}
   * @public
   */
  static test(options) {
    const { Europa, loadFixture } = options;
    const europa = new Europa();

    describe('europa-test', () => {
      fixtures.forEach((fixture) => {
        describe(`fixture-${fixture}`, () => {
          let html;
          let markdown;

          before('load HTML fixture', (done) => {
            loadFixture(`/fixtures/${fixture}.html`, (error, contents) => {
              if (error) {
                done(error);
              } else {
                html = contents;
                done();
              }
            });
          });

          before('load Markdown fixture', (done) => {
            loadFixture(`/fixtures/${fixture}.md`, (error, contents) => {
              if (error) {
                done(error);
              } else {
                markdown = contents;
                done();
              }
            });
          });

          it('should correctly convert HTML into Markdown', () => {
            assert.equal(europa.convert(html), markdown);
          });
        });
      });
    });
  }

}

module.exports = EuropaTest;
