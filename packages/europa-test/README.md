![Europa Test](https://cdn.rawgit.com/NotNinja/europa-branding/master/assets/banner/europa-test/europa-test-banner-710x200.png)

[Europa Test](https://github.com/NotNinja/europa/tree/master/packages/europa-test) is a framework for testing
[Europa Core](https://github.com/NotNinja/europa/tree/master/packages/europa-core) implementations.

[![Build Status](https://img.shields.io/travis/NotNinja/europa/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/europa)
[![License](https://img.shields.io/github/license/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/release/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/tree/master/packages/europa-test)

* [Install](#install)
* [API](#api)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using [npm](https://www.npmjs.com):

``` bash
$ npm install --save-dev europa-test
```

You will most likely never need to depend on `europa-test` as it's only intended to be used to provide some general test
coverage for [Europa Core](https://github.com/NotNinja/europa/tree/master/packages/europa-core) implementations. For
example:

* [europa](https://github.com/NotNinja/europa/tree/master/packages/europa)
* [node-europa](https://github.com/NotNinja/europa/tree/master/packages/node-europa)

Your implementation will also need to have `mocha` and `chai` installed as dependencies as these are used by this
framework. These too can be installed using [npm](https://www.npmjs.com):

``` bash
$ npm install --save-dev chai mocha
```

## API

As this framework has to work in various environments, it only provides a high level test coverage of the core engine
using a selection of fixtures. In order to use this framework, you only have to provide `Europa`, loaded with your
implementation's `WindowService`, and a function which can be used to asynchronously load the test fixtures within this
framework on demand.

Most modules that use Europa Test will look something like the following:

``` javascript
const EuropaTest = require('europa-test');

const Europa = require('../path/to/ExampleEuropa');

EuropaTest.test({
  Europa,
  loadFixture(fixturePath, callback) {
    someAsyncFileLoader(`../path/to/node_modules/europa-test${fixturePath}`, callback);
  }
});
```

## Bugs

If you have any problems with Europa Test or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/europa/blob/master/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa Test contributors can be found in
[AUTHORS.md](https://github.com/NotNinja/europa/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/europa/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
