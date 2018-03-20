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

const Conversion = require('./Conversion');
const Option = require('./option/Option');
const OptionParser = require('./option/OptionParser');
const PluginManager = require('./plugin/PluginManager');
const ServiceManager = require('./service/ServiceManager');

const pluginManager = new PluginManager();
const serviceManager = new ServiceManager();

/**
 * Enables configuration of a HTML to Markdown converter that supports HTML strings and DOM elements.
 *
 * @param {Europa~Options} [options] - the options to be used
 * @public
 */
class Europa {

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
  static registerPlugin(provider) {
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
  static registerPreset(preset) {
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
  static use(service) {
    serviceManager.setService(service.getName(), service);
  }

  constructor(options) {
    this._options = new OptionParser([
      new Option('absolute', false),
      new Option('baseUri', () => serviceManager.getService('window').getDefaultBaseUri()),
      new Option('inline', false)
    ]).parse(options);
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
  convert(html) {
    if (!html) {
      return '';
    }

    const { document } = this;
    let root;

    if (typeof html === 'string') {
      root = document.createElement('div');
      root.innerHTML = html;
    } else {
      root = html;
    }

    const conversion = new Conversion(this, this._options, pluginManager);
    let wrapper;

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
  release() {
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
  get document() {
    return this.window.document;
  }

  /**
   * Returns the window to be used for HTML to Markdown conversion by this {@link Europa} instance.
   *
   * @return {Window} The window.
   * @public
   */
  get window() {
    if (!this._window) {
      this._window = serviceManager.getService('window').getWindow(this._options.baseUri);
    }

    return this._window;
  }

}

module.exports = Europa;

/**
 * The options used by {@link Europa}.
 *
 * @typedef {Object} Europa~Options
 * @property {boolean} [absolute=false] - Whether absolute URLS should be used for anchors/images.
 * @property {string} [baseUri] - The base URI for the window. This is ignored in environments where the base URI cannot
 * be changed.
 * @property {boolean} [inline=false] - Whether anchor/image URLs are to be inserted inline.
 */
