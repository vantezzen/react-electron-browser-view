# React Electron BrowserView

__A simple wrapper of the Electron BrowserView element to allow it's magical props in React__

⚠ This package uses `addBrowserView` to allow multiple Browser Views at once. This requires at least Electron >= 4.

## Installation

The easiest way to use react-electron-browser-view is to install it from NPM and `require` or `import` it in your Electron application.

```
npm install react-electron-browser-view --save
```

or

```
yarn add react-electron-browser-view
```

## Example
An example application has been provided in `example/`. To run it, use `yarn example` from the source directory.

## Usage

All events and methods on the BrowserView element are proxied through react. You
find the documentation on these events and methods [here](https://electronjs.org/docs/api/browser-view)

```JavaScript
const BrowserView = require('react-electron-browser-view');

<BrowserView src="https://www.google.com" />
```

All compatible props you initially give the BrowserView will also be proxied to the [BrowserView's webPreferences](https://electronjs.org/docs/api/browser-window) options
```JavaScript
<BrowserView preload={path.join('./preload.js')} />
```
Alternatively, webpreferences can be provided using the `webpreferences` props:
```JavaScript
<BrowserView webpreferences={{
  preload: path.join('./preload.js'),
}} />
```

It is highly recommended to remove all previous BrowserViews on page load by adding a code like
```JavaScript
import { remote } from 'electron';
const views = remote.BrowserView.getAllViews();
views.forEach(view => view.destroy());
```
This package will normally handle deleting views but sometimes - especially on reloads - `react-electron-browser-view` doesn't get unmounted correctly and leaves browser views behind.


### Properties

In addition to the documented Electron WebView properties we have a few extra
ones

* `className` String - Sets the className of the WebView element
* `style` Object - Sets the style of the **wrapping** div element.
* `muted` Boolean - Sets the muted state of the webContents
* `devtools` Boolean - Activates devtools for the view. This will open the devTools **inside** the view itself - not the container
* `update` Any - Force position updates (see Notes below)
* `trackposition` Boolean - Constantly track the position of the element (see [Notes](#trackposition) below)

### Notes

Behind the scenes this renders a div with the given size. It will then use use the position and size from this div to place the BrowserView right over it.

Please always keep in mind that the BrowserView is only overlayed over your actual page.
This package tries its best to keep the position and size of the view in sync but there may be certain limitations on this: Certain actions may not update the BrowserView element which thus cannot update the view correctly.

If you stumble upon such a case, please use the `update` props and pass any props that should trigger the view to relocate. The contents of this props are not actually used, but React will trigger the `componentDidUpdate` used for relocating the view nonetheless.

#### trackposition
If you are trying to animate the view, e.g. using CSS `transform` with `transition` enabled, you will notice that the view also doesn't update correctly. In this case the view only updates on the first frame of the animation and won't update after that.
If you have to animate the element, please use the `trackposition` props. This will start a constant interval that tracks the position of the element even when the React element's props don't update.

Please **avoid this prop** if you don't absolutely need it and please don't use it on more than one BrowserView at a time as the loop will create performance problems otherwise.

`trackposition` can also be dis- and enabled during the elements lifetime, so you can enable it during phases you use it and disable it otherwise.

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. 

## react-electron-web-view
This package is based on and highly influences by [react-electron-web-view](https://github.com/MarshallOfSound/react-electron-web-view).

## License

MIT

Copyright (c) 2019 vantezzen.
