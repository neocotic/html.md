(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chai')) :
	typeof define === 'function' && define.amd ? define(['chai'], factory) :
	(global.EuropaTest = factory(global.chai));
}(this, (function (chai) { 'use strict';

chai = chai && chai.hasOwnProperty('default') ? chai['default'] : chai;

const { assert } = chai;

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

var EuropaTest_1 = EuropaTest;

return EuropaTest_1;

})));
//# sourceMappingURL=europa-test.js.map
