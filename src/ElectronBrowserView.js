/**
 * react-electron-browser-view: A simple wrapper of the Electron BrowserView element to allow it's magical props in React
 *
 * @license MIT
 * @author vantezzen (https://vantezzen.io)
 * @repo https://github.com/vantezzen/react-electron-browser-view
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import camelCase from 'lodash.camelcase'
import { remote } from 'electron'
import { changableProps, events, methods, props, webPreferences, resizeEvents, elementResizeEvents } from './constants'

const win = remote.getCurrentWindow()

export default class ElectronBrowserView extends Component {
  view = null;
  track = false;

  componentDidMount () {
    const options = {
      webPreferences: this.props.webpreferences || {}
    }

    // Add props to webpreferences
    Object.keys(props).forEach((propName) => {
      if (typeof this.props[propName] !== 'undefined') {
        if (webPreferences.includes(propName)) {
          options.webPreferences[propName] = this.props[propName]
        }
      }
    })

    this.view = new remote.BrowserView(options)
    win.addBrowserView(this.view)
    this.updateViewBounds()
    this.view.setAutoResize({
      horizontal: true,
      vertical: true
    })

    // Add event listener alias to keep compatability
    this.view.addEventListener = this.view.webContents.on;
    this.view.webContents.loadURL(this.props.src || '')
    this.setDevTools(this.props.devtools || false)

    if (this.props.onDidAttach) {
      this.props.onDidAttach();
    }

    methods.forEach((method) => {
      this[method] = (...args) => {
        return this.view.webContents[method](...args)
      }
    })

    // Pass Props to view
    Object.keys(props).forEach((propName) => {
      if (typeof this.props[propName] !== 'undefined') {
        if (this[propName]) {
          this[propName](this.props[propName])
        }
      }
    })

    // Connect events to resize view automatically
    resizeEvents.forEach((event) => {
      window.addEventListener(event, () => this.updateViewBounds())
    })

    // Connect our event listeners to update the browser view
    events.forEach((event) => {
      if (!this.view.isDestroyed()) {
        this.view.webContents.on(event, (...eventArgs) => {
          const propName = camelCase(`on-${event}`)
  
          // Proxy events to listeners we got as props
          if (this.props[propName]) this.props[propName](...eventArgs)
        })
      }
    })

    // Get our container Element from the page
    const container = ReactDOM.findDOMNode(this.c)
    elementResizeEvents.forEach((event => {
      container.addEventListener(event, () => this.updateViewBounds())
    }))

    this.setPositionTracking(this.props.trackposition);
  }

  componentWillUnmount () {
    resizeEvents.forEach((event) => {
      window.removeEventListener(event, () => this.updateViewBounds())
    })

    if (this.track) {
      clearInterval(this.track);
    }

    win.removeBrowserView(this.view)
    this.view.destroy()
  }

  componentDidUpdate (prevProps) {
    Object.keys(changableProps).forEach((propName) => {
      if (this.props[propName] !== prevProps[propName]) {
        if (changableProps[propName] === '__USE_ATTR__') {
          this.view.webContents.setAttribute(propName, this.props[propName])
        } else {
          this.view.webContents[changableProps[propName]](this.props[propName])
        }
      }
    })
    this.setDevTools(this.props.devtools || false)
    this.updateViewBounds()
    this.setPositionTracking(this.props.trackposition);
  }

  setPositionTracking(on) {
    if (on && !this.track) {
      this.track = true;
      this.updateViewBounds();
    }
  }

  setDevTools (open) {
    if (open && !this.view.webContents.isDevToolsOpened()) {
      this.view.webContents.openDevTools()
    } else if (!open && this.view.webContents.isDevToolsOpened()) {
      this.view.webContents.closeDevTools()
    }
  }

  updateViewBounds () {
    // We can only update our view if there is a container element
    if (this.c) {
      // Get our container Element from the page
      const container = ReactDOM.findDOMNode(this.c)

      if (container) {
        const rect = container.getBoundingClientRect()

        // setBounds is only compatible with Integers
        const bounds = {
          x: Math.round(rect.left),
          y: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }

        this.view.setBounds(bounds)
      }
    }

    if (this.props.trackposition) {
      window.requestAnimationFrame(() => this.updateViewBounds());
    } else {
      // We are not tracking the position anymore
      this.track = false;
    }
  }

  render () {
    return (
      <div
        ref={(c) => { this.c = c }}
        className={this.props.className || ''}
        style={Object.assign({}, {
          width: '100%',
          height: '100%',
          minHeight: 10,
        }, this.props.style || {})}
      />
    )
  }
}

ElectronBrowserView.propTypes = Object.assign({
  className: PropTypes.string,
  style: PropTypes.object,
}, props)

events.forEach((event) => {
  ElectronBrowserView.propTypes[camelCase(`on-${event}`)] = PropTypes.func
})
