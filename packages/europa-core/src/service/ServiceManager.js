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

/**
 * A basic manager for {@link Service} implementations that are mapped to simple names.
 *
 * @public
 */
class ServiceManager {

  constructor() {
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
  getService(name) {
    const service = this._services[name];
    if (!service) {
      throw new Error(`Service is not being managed with name: ${name}`);
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
  setService(name, service) {
    if (this._services[name]) {
      throw new Error(`Service is already managed with name: ${name}`);
    }

    if (service) {
      this._services[name] = service;
    }
  }

}

module.exports = ServiceManager;
