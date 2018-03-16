![Europa Core](https://cdn.rawgit.com/NotNinja/europa-branding/master/assets/banner/europa-core/europa-core-banner-742x200.png)

[Europa Core](https://github.com/NotNinja/europa/tree/master/packages/europa-core) is the core engine for
[Europa](https://github.com/NotNinja/europa/tree/master/packages/europa)'s HTML to Markdown conversion as well as
modules to support other environments (e.g.
[Europa Node](https://github.com/NotNinja/europa/tree/master/packages/node-europa)).

[![Build Status](https://img.shields.io/travis/NotNinja/europa/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/europa)
[![License](https://img.shields.io/github/license/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/release/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/tree/master/packages/europa-core)

* [Install](#install)
* [Implementation](#implementation)
* [Testing](#testing)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

If you are looking to install an out-of-the-box HTML to Markdown converter, check out our existing packages that support
multiple environments below:

https://github.com/NotNinja/europa

Alternative, if you know what you're doing, you can install using [npm](https://www.npmjs.com):

``` bash
$ npm install --save europa-core
```

If you're looking to create a package that supports a new environment, we'd urge you to consider contributing to this
framework so that it can be easily integrated and maintained. Read the [Contributors](#contributors) section for more
information on how you can contribute.

## Implementation

As this is the core of Europa, it contains all of the HTML to Markdown conversion logic and, since it's designed to use
the DOM as the model, all that consumers need to do is define and register an implementation of `WindowService`.

Most modules that use Europa Core will look something like the following:

``` javascript
const Europa = require('europa-core');
const WindowService = require('europa-core/src/service/window/WindowService');

class ExampleWindowService extends WindowService {
  getDefaultBaseUri() { /* ... */ }
  getWindow(baseUri) { /* ... */ }
  isCloseable(window) { /* ... */ }
}

Europa.use(new ExampleWindowService());

module.exports = Europa;
```

This allows the core to control the primary API and keep it consistent across all environments. With the above in place,
you are free to import Europa and use it as you would anywhere else.

When creating a package to support a new environment, you'll need to create a new sub-directory for it under the
[packages](https://github.com/NotNinja/europa/tree/master/packages) directory. Try to follow similar naming conventions.

Take a look at the other packages in this directory to setup the new package directory. They are all very similar, by
design, as you should just need to provide the minimal amount of information required to support your intended
environment.

## Testing

Testing your environment-specific implementation actually works is just as important as implementing it. Since
`europa-core` contains a lot of the conversion logic, a
[europa-test](https://github.com/NotNinja/europa/tree/master/packages/europa-test) package is available to make testing
implementations even easier. Again, take a look at the tests for existing environment support packages under the
[packages](https://github.com/NotNinja/europa/tree/master/packages) directory for examples.

## Bugs

If you have any problems with Europa Core or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/europa/issues).

## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/europa/blob/master/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa Core contributors can be found in
[AUTHORS.md](https://github.com/NotNinja/europa/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/europa/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
