# React Electron BrowserView

__A simple wrapper of the Electron BrowserView element to allow it's magical props in React__

This package is made to be a drop-in replacement for the [react-electron-web-view](https://github.com/MarshallOfSound/react-electron-web-view) package, allowing you to quickly replace web views with BrowserViews in your project.

ℹ️ This package uses Electron's `addBrowserView` to allow multiple Browser Views at once. This requires at least Electron >= 4.

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
The `BrowserView` element can be used in the same way you can use [react-electron-web-view](https://github.com/MarshallOfSound/react-electron-web-view)'s webview element.

All events and methods on the BrowserView element are proxied through react. You
find the documentation on these events and methods [here](https://electronjs.org/docs/api/browser-view)

```JavaScript
const BrowserView = require('react-electron-browser-view');

<BrowserView
  src="https://www.google.com"
  onDidAttach={() => {
    console.log("BrowserView attached");
  }}
  onUpdateTargetUrl={() => {
    console.log("Updated Target URL");
  }}
  style={{
    height: 200,
  }}
/>
```

All compatible props you initially give the BrowserView will also be proxied to the [BrowserView's webPreferences](https://electronjs.org/docs/api/browser-window) options
```JavaScript
<BrowserView preload={path.join('./preload.js')} />
```

Alternatively, an object of webpreferences can be provided using the `webpreferences` props. Please keep in mind that directly setting `webpreferences` props as seen above will overwrite the options given through this prop.
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

In addition to the documented Electron BrowserView properties we have a few extra
ones

* `className` String - Sets the className of the **wrapping** div element.
* `style` Object - Sets the style of the **wrapping** div element. (see [Notes](#style) below)
* `muted` Boolean - Sets the muted state of the webContents
* `devtools` Boolean - Activates devtools for the view. This will open the devTools **inside** the view itself - not the container
* `update` Any - Force position updates (see [Notes](#update) below)
* `trackposition` Boolean - Constantly track the position of the element (see [Notes](#animating-the-browserview) below)

### Notes

Behind the scenes this renders a div with the given size. It will then use use the position and size from this div to place the BrowserView right over it.

#### style
By default, the wrapping div element will have the following styles:
```JavaScript
width: '100%',
height: '100%',
minHeight: 10,
```
These styles can be overwritten via the `style` prop.

#### update
Please always keep in mind that the BrowserView is only overlayed over your actual page.
This package tries its best to keep the position and size of the view in sync but there may be certain limitations on this: Certain actions may not update the BrowserView element which thus cannot update the view correctly.

If you stumble upon such a case, please use the `update` props and pass any props that should trigger the view to relocate. The contents of this props are not actually used, but React will trigger the `componentDidUpdate` used for relocating the view nonetheless.

#### Animating the BrowserView
If you are trying to animate the view, e.g. using CSS `transform` with `transition` enabled, you will notice that the view doesn't update correctly. In this case the view only updates on the first frame of the animation and won't update after that.
If you have to animate the view, please use the `trackposition` props. This will start a JavaScript interval that tracks the position of the element even when the React element's props don't update.

Please **avoid this prop** if you don't absolutely need it and please don't use it on more than one BrowserView at a time as the loop will create performance problems otherwise.

`trackposition` can also be dis- and enabled during the elements lifetime, so you can enable it during phases you use it and disable it otherwise.

## Development (`src`, `lib` and the build process)
The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. 

This project uses webpack to build the library. To develop, please run `yarn watch` or `yarn build` from the root folder of the project.

## react-electron-web-view
This package is based on and highly influences by [react-electron-web-view](https://github.com/MarshallOfSound/react-electron-web-view).

## License

MIT

Copyright (c) 2019 vantezzen.
