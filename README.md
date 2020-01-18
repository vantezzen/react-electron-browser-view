# React Electron BrowserView

__A simple wrapper of the Electron BrowserView element to allow it's magical props in React__

⚠ This 

## Installation

The easiest way to use react-electron-browser-view is to install it from NPM and `require` or `import` it in your Electron application.

You can also use the standalone build by including `dist/react-electron-browser-view.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-electron-browser-view --save
```

or

```
yarn add react-electron-browser-view
```


## Usage

All events and methods on the BrowserView element are proxied through react. You
find the documentation on these events and methods [here](https://electronjs.org/docs/api/browser-view)

```
const BrowserView = require('react-electron-browser-view');

<BrowserView src="https://www.google.com" />
```

All compatible props you initially give the BrowserView will also be proxied to the [BrowserView's webPreferences](https://electronjs.org/docs/api/browser-window) options
```
<BrowserView preload={path.join('./preload.js')} />
```
Alternatively, webpreferences can be provided using the `webpreferences` props:
```
<BrowserView webpreferences={{
  preload: path.join('./preload.js'),
}} />
```

### Properties

In addition to the documented Electron WebView properties we have a few extra
ones

* `className` String - Sets the className of the WebView element
* `style` Object - Sets the style of the **wrapping** div element.
* `muted` Boolean - Sets the muted state of the webContents

### Notes

Behind the scenes this renders a div with the given size. It will then use use the position and size from this div to place the BrowserView right over it.

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. 

An example application has been provided in `example/`. To run it, use `yarn example`.

## react-electron-web-view
This package is based on and highly influences by [react-electron-web-view](https://github.com/MarshallOfSound/react-electron-web-view).

## License

MIT

Copyright (c) 2019 vantezzen.
