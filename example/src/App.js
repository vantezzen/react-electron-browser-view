import React, { Component } from 'react'
import WebView from '../../src/ElectronBrowserView'
import { resolve } from 'path'

const preload = resolve('./example/src/preload.js')

// URL we want to toggle between
const urls = [
  'https://vantezzen.io',
  'https://github.com'
]

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      url: 0,
      view: true,
      viewHide: false,
      devTools: true
    }
  }

  toggleDevTools () {
    this.setState(state => ({ devTools: !state.devTools }))
  }

  switchURL () {
    this.setState((state) => {
      if (state.url + 1 >= urls.length) {
        return {
          url: 0
        }
      } else {
        return {
          url: state.url + 1
        }
      }
    })
  }

  toggleView () {
    this.setState(state => ({ view: !state.view }))
  }

  toggleViewHide () {
    this.setState(state => ({ viewHide: !state.viewHide }))
  }

  render () {
    return (
      <div style={{ height: '150vh', margin: 25 }}>
        <h1>Hello, Electron!</h1>
        <p>Below is a BrowserView you can use.</p>
        <p>Un- and remounting a view will cause it to unload. Hide it using CSS to keep the view alive in the background</p>
        <button onClick={() => this.toggleDevTools()}>Toggle DevTools</button>
        <button onClick={() => this.switchURL()}>Switch URL</button>
        <button onClick={() => this.toggleView()}>Toggle View Mount</button>
        <button onClick={() => this.toggleViewHide()}>Toggle View Hide</button>

        <div
          style={{
            width: '80vw',
            marginLeft: 20,
            marginTop: 30,
            ...this.state.viewHide ? { display: 'none' } : {}
          }}
        >
          {
            this.state.view && (
              <WebView
                src={urls[this.state.url]}
                preload={preload}
                devtools={this.state.devTools}
                // update={this.state.viewHide}
              />
            )
          }
        </div>

        <p>You can use multiple BrowserViews and place them however you want - even overlapping</p>

        <div
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            width: '50vw',
            marginLeft: '40vw',
            marginTop: 60
          }}
        >
          <WebView src='https://example.com' preload={preload} />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 200,
            width: '50vw',
            marginLeft: '40vw',
            marginTop: 60
          }}
        >
          <WebView src='https://github.com' preload={preload} />
        </div>
      </div>
    )
  }
}

export default App
