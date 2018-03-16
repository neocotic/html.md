![Europa](https://cdn.rawgit.com/NotNinja/europa-branding/master/assets/banner/europa/europa-banner-500x200.png)

[Europa](https://github.com/NotNinja/europa/tree/master/packages/europa) is a pure JavaScript library for converting
HTML into valid Markdown in the browser using the
[Europa Core](https://github.com/NotNinja/europa/tree/master/packages/europa-core) engine.

[![Demo](https://img.shields.io/badge/demo-live-brightgreen.svg?style=flat-square)](https://codepen.io/NotNinja/full/BZjRMK)
[![Build Status](https://img.shields.io/travis/NotNinja/europa/develop.svg?style=flat-square)](https://travis-ci.org/NotNinja/europa)
[![License](https://img.shields.io/github/license/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/release/NotNinja/europa.svg?style=flat-square)](https://github.com/NotNinja/europa/tree/master/packages/europa)

* [Install](#install)
* [Examples](#examples)
* [API](#api)
* [Plugins](#plugins)
* [Migrating from older versions](#migrating-from-older-versions)
* [Bugs](#bugs)
* [Contributors](#contributors)
* [License](#license)

## Install

Install using [npm](https://www.npmjs.com):

``` bash
$ npm install --save europa
```

If you want to simply download the file to be used in the browser you can find them below:

* [Development Version](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.js) (58kb - [Source Map](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.js.map))
* [Production Version](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.min.js) (13kb - [Source Map](https://cdnjs.cloudflare.com/ajax/libs/europa/4.0.0/europa.min.js.map))

Check out [Europa Node](https://github.com/NotNinja/europa/tree/master/packages/node-europa) if you want to install it
for use within [Node.js](https://nodejs.org).

## Examples

``` html
<!DOCTYPE html>
<html>
  <body>
    <p class="lead">We &hearts; <b>Europa</b>!</p>

    <textarea id="html"></textarea>
    <textarea id="markdown"></textarea>

    <script src="/path/to/europa.js"></script>
    <script>
      (function() {
        const europa = new Europa();
        const html = document.getElementById('html');
        const markdown = document.getElementById('markdown');

        html.addEventListener('input', () => {
          markdown.value = europa.convert(html.value);
        });
      }());
    </script>
  </body>
</html>
```

If you have cloned the source code, you can open up `demo.html` in your browser to play around a bit.

## API

Simply create an instance of `Europa` and you've done most of the work. You can control many aspects of the HTML to
Markdown conversion by passing the following options to the constructor:

| Option   | Type    | Description                                             | Default |
| -------- | ------- | ------------------------------------------------------- | ------- |
| absolute | Boolean | Whether absolute URLS should be used for anchors/images | `false` |
| inline   | Boolean | Whether anchor/image URLs are to be inserted inline     | `false` |

### `convert(html)`

Converts the specified `html` into Markdown.

`html` can either be an HTML string or a DOM element whose HTML contents are to be converted into Markdown.

``` javascript
const europa = new Europa();

europa.convert('<blockquote>This <i>is</i> great!</blockquote>');
//=> "> This *is* great!"
europa.convert(document.querySelector('.lead'));
//=> "We ♥ **Europa**!"

const div = document.createElement('div');
div.innerHTML = 'Please keep my <span style="display: none">treasure</span> secret safe...';

europa.convert(div);
//=> "Please keep my secret safe..."
```

## Plugins

Europa is fully pluggable and is packed with built-in plugins in order to get full support for basic Markdown. It
enables the creation of external plugins to further extend Europa's capabilities to support extended Markdown syntax or
even new HTML elements should they not be added to Europa quick enough for you.

The predefined plugins are included in
[Europa Core](https://github.com/NotNinja/europa/tree/master/packages/europa-core) for now, however, the plan is to
externalize all of these as well, while keeping them as defaults. The hope is that this will continue to make them
easier to maintain and make Europa more modular.

The API for plugins is simple on a high level, but you'll need to get to grips with the internal API to understand what
you can really do:

``` javascript
class ExamplePlugin extends Europa.Plugin {
  after(conversion, context) { /* ... */ }
  afterAll(conversion) { /* ... */ }
  before(conversion, context) { /* ... */ }
  beforeAll(conversion) { /* ... */ }
  convert(conversion, context) { /* ... */ }
  getTagNames() { /* ... */ }
}

Europa.register(new ExamplePlugin());
```

Your best bet is to look at how other plugins work.

All plugins should be responsible for registering themselves when loaded as to minimize the work required by you, in
order to use them. Since multiple plugins could support the same tag(s), the load order is important as the last plugin
loaded that declares support for a tag, will be the one that's used. Be wary of overriding tags supported by built-in
plugins and consider whether its something that should be part of the original plugin. If so,
[open a pull request](#contributing)!

A good practice for naming plugin packages is `europa-plugin-FRIENDLY_TAG_NAME`. For example; `europa-plugin-anchor` and
not `europa-plugin-a` or `europa-plugin-link` (which could be confused with the `<link>` element). Each plugin should
have a shared goal.

The plugin implementation class -- not registered instance -- should always be exported by each plugin. This is to allow
others to extend and take advantage of the OOP design.

### Presets

Europa also has the concept of a "preset", which is essentially a bundle of plugins. In fact, all of the built-in
plugins are provided by a default preset internally.

A preset simply imports a collection of plugins, all of which register themselves with Europa automatically.

A good practice for naming preset packages is `europa-preset-FRIENDLY_GOAL_NAME`. For example; `europa-preset-atlassian`
could be used to register plugins that converts HTML to Atlassian Wiki Markup. Each plugin should have a shared goal.

In theory, a preset could be made up of multiple presets.

## Migrating from older versions

If you've been using an older major version and would like details on what's changed and information on how to migrate
to the latest major release below:

https://github.com/NotNinja/europa/wiki/Migrating-from-older-versions

## Bugs

If you have any problems with Europa or would like to see changes currently in development you can do so
[here](https://github.com/NotNinja/europa/issues).


## Contributors

If you want to contribute, you're a legend! Information on how you can do so can be found in
[CONTRIBUTING.md](https://github.com/NotNinja/europa/blob/master/CONTRIBUTING.md). We want your suggestions and pull
requests!

A list of Europa contributors can be found in [AUTHORS.md](https://github.com/NotNinja/europa/blob/master/AUTHORS.md).

## License

See [LICENSE.md](https://github.com/NotNinja/europa/raw/master/LICENSE.md) for more information on our MIT license.

[![Copyright !ninja](https://cdn.rawgit.com/NotNinja/branding/master/assets/copyright/base/not-ninja-copyright-186x25.png)](https://not.ninja)
