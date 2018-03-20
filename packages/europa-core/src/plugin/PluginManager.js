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

const utils = require('europa-utils');

const PluginAPI = require('./PluginAPI');

/**
 * A basic manager for plugins and presets (collections of plugins) that can be hooked into {@link Europa}.
 *
 * @public
 */
class PluginManager {

  constructor() {
    this._api = new PluginAPI();
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
  addPlugin(provider) {
    const plugin = provider(this._api);

    utils.forOwn(plugin.converter, (converter, tagName) => {
      if (converter) {
        this._converters[tagName] = converter;
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
  addPreset(preset) {
    const providers = preset.plugins || [];

    providers.forEach((provider) => {
      this.addPlugin(provider);
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
  hasConverter(tagName) {
    return utils.hasOwn(this._converters, tagName);
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
  invokeConverter(tagName, methodName, ...args) {
    const converter = this._converters[tagName];
    if (!(converter && typeof converter[methodName] === 'function')) {
      return null;
    }

    return converter[methodName](...args);
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
  invokePlugins(methodName, ...args) {
    this._plugins.forEach((plugin) => {
      if (typeof plugin[methodName] === 'function') {
        plugin[methodName](...args);
      }
    });
  }

}

module.exports = PluginManager;

/**
 * Responsible for converting an individual HTML element to Markdown as defined in a plugin.
 *
 * @public
 * @typedef {Object} PluginManager~Converter
 */

/**
 * Called at the end of the current element within the specified <code>conversion</code> and only once all children
 * elements have been converted as well, provided they weren't skipped.
 *
 * <code>context</code> can be used to receive any state that may been passed at the start of the single element
 * conversion by this converter.
 *
 * This method is optional.
 *
 * @param {Conversion} conversion - the current {@link Conversion}
 * @param {Object.<string, *>} context - the current context for this converter
 * @return {void}
 * @public
 * @abstract
 * @memberof PluginManager~Converter
 * @method endTag
 */

/**
 * Called at the start of the current element within the specified <code>conversion</code> which can be used to provide
 * control over the conversion and returns whether the children of the element should be converted.
 *
 * <code>context</code> can be used to pass any state for a single element conversion from start to end, limited to this
 * converter.
 *
 * This method is optional.
 *
 * @param {Conversion} conversion - the current {@link Conversion}
 * @param {Object.<string, *>} context - the current context for this converter
 * @return {?boolean} <code>true</code> if the children of the current element should be converted; otherwise
 * <code>false</code> or <code>null</code>.
 * @public
 * @abstract
 * @memberof PluginManager~Converter
 * @method startTag
 */

/**
 * A plugin that hooks into the {@link Europa} conversion process.
 *
 * Any declared converters will override any previously associated tag name to converter mappings when the plugin is
 * added to {@link Europa}.
 *
 * @public
 * @typedef {Object} PluginManager~Plugin
 * @property {Object.<string, PluginManager~Converter>} [converter] - A map containing tag name to converter pairs.
 */

/**
 * Called after all elements have been converted for a single input, allowing this plugin to perform any necessary clean
 * up or tear down steps.
 *
 * This method is optional.
 *
 * @param {Conversion} conversion - the current {@link Conversion}
 * @return {void}
 * @public
 * @abstract
 * @memberof PluginManager~Plugin
 * @method endConversion
 */

/**
 * Called before any elements are converted for a single input, allowing this plugin to perform any necessary setup
 * steps.
 *
 * This method is optional.
 *
 * @param {Conversion} conversion - the current {@link Conversion}
 * @return {void}
 * @public
 * @abstract
 * @memberof PluginManager~Plugin
 * @method startConversion
 */

/**
 * A function which returns a plugin compatible with {@link Europa}.
 *
 * The function is invoked internally by {@link PluginManager#addPlugin} in order to get the plugin and is passed an
 * <code>api</code>, which it can choose to use or not.
 *
 * Any error thrown by the function will bubble up and prevent the plugin from being added.
 *
 * @public
 * @callback PluginManager~PluginProvider
 * @param {PluginAPI} api - a {@link PluginAPI} that provides useful methods for plugin providers
 * @return {PluginManager~Plugin} The provided plugin.
 * @throws {Error} If a problem occurs while providing the plugin.
 */

/**
 * A collection of plugins that hook into the {@link Europa} conversion process.
 *
 * @public
 * @typedef {Object} PluginManager~Preset
 * @property {Array.<PluginManager~PluginProvider>} [plugins] - The plugins that belong to this preset.
 */
