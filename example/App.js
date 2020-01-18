import './App.css';
import React, { Component } from 'react';
import WebView from '../src/main';
import { resolve } from 'path';

const preload = resolve('./preload.js');

const urls = [
  'https://vantezzen.io',
  'https://github.com',
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 0,
    }
  }

  switchURL() {
    this.setState((state) => {
      if (state.url + 1 >= urls.length) {
        return {
          url: 0,
        };
      } else {
        return {
          url: state.url + 1,
        };
      }
    })
  }

  render() {
    return (
      <div style={{ height: '150vh' }}>
        <h1>Hello, Electron!</h1>
        <p>Below is a BrowserView you can use.</p>
        <button onClick={() => this.switchURL()}>Switch URL</button>

        <div style={{ width: '80vw', marginLeft: 20, marginTop: 30 }}>
          <WebView src={urls[this.state.url]} preload={preload} />
        </div>
      </div>
    );
  }
}

export default App;